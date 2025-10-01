import { Component, OnInit } from '@angular/core'; // Agregamos OnInit
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

import { ActiveProductView } from '../../../shared/interfaces/active-product-view.interface';
import { ProductService } from '../../services/product-service';

// 1. Importar la modal y las interfaces de datos
import { EditProductForm, MerchantProductUpdate } from '../../../shared/interfaces/edit-product-form.interface'; 
import { EditProductModal } from '../edit-product-modal/edit-product-modal';

@Component({
  selector: 'app-active-products',
  // 1. Añadir el componente modal a los imports para que pueda ser usado en el HTML
  imports: [CommonModule, EditProductModal],
  templateUrl: './active-products.html',
  styleUrl: './active-products.css'
})
export class ActiveProducts implements OnInit { // Usamos 'implements OnInit' para ngOnInit
  products$: Observable<ActiveProductView[]> | undefined; 
  
  // ID del vendedor: Debe ser dinámico en una app real
  vendedorId: string = '1'; 

  // 2. Variables para controlar la modal de edición
  isModalOpen: boolean = false;
  productToEdit: ActiveProductView | null = null; 

  // Inyectamos el servicio en el constructor
  constructor(private productService: ProductService) { }

  loadProducts(): void {
      this.products$ = this.productService.getActiveProducts(this.vendedorId);
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  // --- Lógica de la Modal ---
  
  // 3a. Abre la modal
  onEdit(product: ActiveProductView): void {
    this.productToEdit = product; // Carga el producto a editar
    this.isModalOpen = true;      // Muestra la modal
  }

  // 3b. Cierra la modal y limpia el estado
  onCloseModal(): void {
    this.isModalOpen = false;
    this.productToEdit = null;
  }
  
  // 3c. Guarda los cambios recibidos de la modal (solo merchantPrice)
  onSaveChanges(formData: EditProductForm): void {
    if (!this.productToEdit) return;

    // 1. Guardar la referencia al producto y su nombre ANTES de entrar al subscribe
    const product = this.productToEdit; // Alias para simplificar
    const productName = product.name; // Almacena el nombre mientras es válido

    // Prepara el payload para el API (solo ID y merchantPrice)
    const updatePayload: MerchantProductUpdate = {
        id: product.id,
        merchantPrice: formData.merchantPrice
    };
    
    // Llama al servicio para actualizar los detalles
    this.productService.updateProduct(updatePayload).subscribe({
        next: () => {
            // 2. Actualiza el precio en la UI del producto
            product.merchantPrice = formData.merchantPrice;
            
            // 3. Usa el nombre almacenado localmente para el log
            console.log(`Precio de ${productName} actualizado a ${formData.merchantPrice}.`);
            
            // 4. ¡AQUÍ ES DONDE DEBE IR! Llama a onCloseModal (que setea productToEdit = null) al final.
            this.onCloseModal(); 
        },
        error: (err) => {
            console.error('Error al guardar precio del producto:', err);
            // Si hay un error, el modal también debe cerrarse
            this.onCloseModal();
        }
    });
  }

  onDelete(product: ActiveProductView): void {
      // 1. Pedir confirmación al usuario
      const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar el producto ${product.name}?`);

      if (confirmDelete) {
          // 2. Llamar al servicio para eliminar el producto
          this.productService.deleteProduct(product.id).subscribe({
              next: () => {
                  console.log(`Producto ${product.name} (ID: ${product.id}) eliminado con éxito.`);
                  
                  // 3. Recargar la lista de productos para actualizar la UI
                  this.loadProducts(); 
              },
              error: (err) => {
                  console.error('Error al eliminar producto:', err);
                  alert('Error al eliminar el producto. Inténtalo de nuevo.');
              }
          });
      }
  }
  
  // --- Lógica de Activación/Desactivación ---

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