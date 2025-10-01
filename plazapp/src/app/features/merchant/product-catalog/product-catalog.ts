import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { CatalogProduct } from '../../../shared/interfaces/catalogProduct.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-catalog',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-catalog.html',
  styleUrl: './product-catalog.css'
})
export class ProductCatalog {
  catalogProducts$: Observable<CatalogProduct[]> | undefined;
  
  // Sujetos reactivos para los filtros
  private filterSubject = new BehaviorSubject<'Todos' | 'Verduras' | 'Frutas'>('Todos');
  private searchSubject = new BehaviorSubject<string>('');
  
  // Observable filtrado que se usa en el HTML
  filteredProducts$: Observable<CatalogProduct[]> | undefined;
  
  // Getter/Setter simple para el ngModel de la búsqueda
  get searchTerm(): string { return this.searchSubject.value; }
  set searchTerm(value: string) { this.searchSubject.next(value); }

  // Getter simple para el estado actual del filtro
  get activeFilter(): string { return this.filterSubject.value; }

  merchantId: string = '1';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
      this.catalogProducts$ = this.productService.getCatalog();
      
      this.filteredProducts$ = combineLatest([
        this.catalogProducts$,
        this.filterSubject,
        this.searchSubject
      ]).pipe(
        map(([products, filter, searchTerm]) => {
          // ✨ CORRECCIÓN CLAVE: Aseguramos que 'list' sea un array (o un array vacío)
          let list: CatalogProduct[] = Array.isArray(products) ? products : []; 
          
          // 1. Filtro por tipo
          if (filter !== 'Todos') {
            list = list.filter(p => p.type === filter);
          }
          
          // 2. Filtro por búsqueda
          if (searchTerm) {
            const term = searchTerm.toLowerCase();
            list = list.filter(p => p.name.toLowerCase().includes(term));
          }
          return list;
        })
      );
  }
  
  // Cambia el filtro de tipo usando el BehaviorSubject
  setActiveFilter(filter: 'Todos' | 'Verduras' | 'Frutas'): void {
    this.filterSubject.next(filter);
  }

  // Acción de agregar producto, llama al servicio
  onAddToPuesto(product: CatalogProduct): void {
    // Usamos el precio del boletín como precio inicial del vendedor
    this.productService.addProductToPuesto(this.merchantId, product.id, product.bulletinPrice).subscribe({
      next: () => {
        alert(`¡${product.name} agregado a tu puesto con éxito!`);
        // Opcional: Notificar al componente ActiveProductsComponent para recargar
      },
      error: (err) => {
        console.error('Error al agregar producto:', err);
      }
    });
  }

}
