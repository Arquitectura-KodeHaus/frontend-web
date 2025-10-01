export interface EditProductForm {
    merchantPrice: number;
}

export interface MerchantProductUpdate {
    id: string; // ID del Producto_Vendedor a actualizar
    merchantPrice: number;
}