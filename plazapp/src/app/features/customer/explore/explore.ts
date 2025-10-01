import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { CatalogProductWithMerchants } from '../../../shared/interfaces/catalog-product-with-merchants.interface';
import { MerchantProductListing } from '../../../shared/interfaces/merchant-product-listing.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreService } from '../../services/explore-service';

@Component({
  selector: 'app-explore',
  imports: [CommonModule, FormsModule],
  templateUrl: './explore.html',
  styleUrl: './explore.css'
})
export class Explore implements OnInit {

  // Observable para todos los productos agrupados (sin filtrar)
  allProducts$: Observable<CatalogProductWithMerchants[]> = new Observable();
  
  // Observable para la lista filtrada que se muestra en la UI
  filteredProducts$: Observable<CatalogProductWithMerchants[]> = new Observable();

  // BehaviorSubjects para el filtro de búsqueda y tipo
  searchTerm = new BehaviorSubject<string>('');
  activeFilter = new BehaviorSubject<string>('Todos'); // 'Todos', 'Verduras', 'Frutas'

  constructor(private exploreService: ExploreService ) { }

  ngOnInit(): void {
    this.allProducts$ = this.exploreService.getExploreProducts();
    
    // Combina los observables para aplicar filtros en tiempo real
    this.filteredProducts$ = combineLatest([
      this.allProducts$,
      this.searchTerm,
      this.activeFilter
    ]).pipe(
      map(([products, term, filter]) => {
        let tempProducts = products;

        // Filtrar por término de búsqueda
        if (term) {
          term = term.toLowerCase();
          tempProducts = tempProducts.filter(productGroup => 
            productGroup.name.toLowerCase().includes(term) ||
            productGroup.merchants.some(merchant => 
              merchant.merchantName.toLowerCase().includes(term) || 
              merchant.puestoName.toLowerCase().includes(term)
            )
          );
        }

        // Filtrar por tipo (Verduras, Frutas)
        if (filter !== 'Todos') {
          tempProducts = tempProducts.filter(productGroup => 
            productGroup.type === filter
          );
        }

        return tempProducts;
      })
    );
  }

  onSearchTermChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm.next(inputElement.value);
  }

  setActiveFilter(filter: string): void {
    this.activeFilter.next(filter);
  }

  onReserve(merchantProduct: MerchantProductListing): void {
    console.log('Reservar:', merchantProduct);
    // Lógica para iniciar el proceso de reserva
    // Podría abrir un modal de cantidad, etc.
    alert(`Iniciando reserva para ${merchantProduct.merchantName} (${merchantProduct.puestoName}) - ${merchantProduct.price}/kg`);
  }

}
