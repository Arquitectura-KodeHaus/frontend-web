import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActiveProductView } from '../../../shared/interfaces/active-product-view.interface';
import { EditProductForm } from '../../../shared/interfaces/edit-product-form.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product-modal.html',
  styleUrl: './edit-product-modal.css'
})
export class EditProductModal {
    @Input() product: ActiveProductView | null = null;
    @Output() closeModal = new EventEmitter<void>();
    @Output() saveChanges = new EventEmitter<EditProductForm>();

    // Modelo de datos para el formulario, solo con el precio
    formModel: EditProductForm = {
        merchantPrice: 0
    };

    ngOnInit(): void {
        if (this.product) {
            this.formModel.merchantPrice = this.product.merchantPrice;
        }
    }

    onSave(): void {
        this.saveChanges.emit(this.formModel);
    }

    onCancel(): void {
        this.closeModal.emit();
    }
}
