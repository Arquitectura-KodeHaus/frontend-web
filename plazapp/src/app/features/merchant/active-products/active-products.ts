import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ActiveProductView } from '../../../shared/interfaces/active-product-view.interface';
import { ProductService } from '../../services/product-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-active-products',
  imports: [CommonModule],
  templateUrl: './active-products.html',
  styleUrl: './active-products.css'
})
export class ActiveProducts {
  products$: Observable<ActiveProductView[]> | undefined; 
  
  // ID del vendedor: Debe ser dinámico en una app real
  vendedorId: string = '1'; 

  // Inyectamos el servicio en el constructor
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Inicializamos el Observable haciendo la llamada al servicio
    this.products$ = this.productService.getActiveProducts(this.vendedorId);
  }

  // Las funciones de acción ahora trabajan con la ActiveProductView
  onEdit(product: ActiveProductView): void {
    console.log('Editando producto:', product.name, 'ID:', product.id);
    // ... lógica para abrir modal o navegar
  }

  // Modificar la lógica de alternar para usar el servicio
  toggleActive(product: ActiveProductView): void {
    const newStatus = !product.status; 
    
    this.productService.updateProductStatus(product.id, newStatus).subscribe({
      next: () => {
        // Actualiza el estado en la UI si la llamada es exitosa
        product.status = newStatus; 
        console.log(`${product.name} cambiado a estado: ${newStatus ? 'Activo' : 'Inactivo'}`);
      },
      error: (err) => {
        console.error('Error al actualizar estado:', err);
        // Mostrar mensaje de error al usuario (p.ej., con un Snackbar)
      }
    });
  }
}
