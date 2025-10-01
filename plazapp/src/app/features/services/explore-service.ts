import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { CatalogProductWithMerchants } from '../../shared/interfaces/catalog-product-with-merchants.interface';

@Injectable({
  providedIn: 'root'
})
export class ExploreService {
  private http = inject(HttpClient);
  private apiUrl = environment.API_URL;

  constructor() { }

  getExploreProducts(): Observable<CatalogProductWithMerchants[]> {
    // La URL debe coincidir con tu nuevo endpoint en Spring Boot
    return this.http.get<CatalogProductWithMerchants[]>(`${this.apiUrl}/api/explore/products`);
  }
}
