import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { CatalogProduct } from '../../shared/interfaces/catalogProduct.interface';
import { MerchantProduct } from '../../shared/interfaces/merchantProduct.interface';
import { ActiveProductView } from '../../shared/interfaces/active-product-view.interface';
import { FirestoreTimestamp } from '../../shared/interfaces/firestoreTimestamp.interface';
import { CatalogProductDto, MerchantProductDto } from '../../shared/interfaces/dto.interface';
import { environment } from '../../../environments/environment.development';
import { MerchantProductUpdate } from '../../shared/interfaces/edit-product-form.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.API_URL;

  // Función auxiliar para formatear el Timestamp
    private formatFirestoreDate(timestamp: FirestoreTimestamp): string {
        if (!timestamp || !timestamp.seconds) return 'N/A';
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleDateString('es-ES');
    }

    getActiveProducts(merchantId: string): Observable<ActiveProductView[]> {
        // 1. Obtener la lista cruda de MerchantProduct[] (asumiendo que viene dentro del DTO)
        return this.http.get<MerchantProductDto>(`${this.apiUrl}/MerchantProducts/merchant/${merchantId}`).pipe(
        
        // 2. Extraer el array del DTO
        map(dto => dto.merchantProducts), 
        
        switchMap(merchantProducts => {
            if (!merchantProducts || merchantProducts.length === 0) {
                
                // ✨ CORRECCIÓN DE TIPO: Devolvemos un Observable vacío y TIPADO
                // Esto resuelve el error que estabas viendo.
                return new Observable<ActiveProductView[]>(observer => { 
                    observer.next([]); 
                    observer.complete(); 
                });
            }

            // 3. Crear solicitudes para obtener los detalles del catálogo
            const catalogRequests = merchantProducts.map(mp => 
                this.http.get<CatalogProduct>(`${this.apiUrl}/CatalogProducts/${mp.idCatalogProduct}`)
            );

            // 4. Esperar y combinar los datos
            return forkJoin(catalogRequests).pipe(
                map(catalogResponses => {
                    return merchantProducts.map((mp, index) => {
                        const catalogProduct = catalogResponses[index];
                        
                        // Mapeo final a ActiveProductView
                        return {
                            ...mp, 
                            name: catalogProduct.name,
                            type: catalogProduct.type,
                            bulletinPrice: catalogProduct.bulletinPrice,
                            // Asumiendo que stock es un campo necesario, y si no viene del API, lo inicializamos
                            stock: 0, 
                            publishedDateFormatted: this.formatFirestoreDate(mp.publishedAt)
                        } as ActiveProductView; // Confirmamos el tipo de salida
                    });
                })
            );
        })
        );
    }

    // Repite este ajuste para getCatalog()
    getCatalog(): Observable<CatalogProduct[]> {
        return this.http.get<CatalogProductDto>(`${this.apiUrl}/CatalogProducts`).pipe(
            map(dto => dto.catalogProducts)
        );
    }

    // 3. ACTUALIZAR ESTADO (Se mantiene igual)
    updateProductStatus(productId: string, newStatus: boolean): Observable<any> {
      return this.http.put(`${this.apiUrl}/MerchantProducts`, { 
          id: productId, 
          status: newStatus 
      });
    }

    updateProduct(updateData: MerchantProductUpdate): Observable<string> {
      return this.http.put(`${this.apiUrl}/MerchantProducts`, updateData, {responseType: 'text'});
    }

    // 4. AGREGAR PRODUCTO (Se mantiene igual)
    addProductToPuesto(merchantId: string, catalogProductId: string, initialPrice: number): Observable<any> {
        const payload = { 
            idMerchant: merchantId, 
            idCatalogProduct: catalogProductId, 
            merchantPrice: initialPrice,
            status: true 
        };
        return this.http.post(`${this.apiUrl}/MerchantProducts`, payload);
    }

    deleteProduct(productId: string): Observable<any> {
        const url = `${this.apiUrl}/MerchantProducts/${productId}`; 
        return this.http.delete(url, { responseType: 'text' });
    }
}
