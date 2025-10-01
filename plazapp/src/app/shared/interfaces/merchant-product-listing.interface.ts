export interface MerchantProductListing {
    merchantProductId: string; // ID específico del producto que vende el comerciante (MerchantProduct.id)
    merchantName: string;      // Nombre del comerciante (ej. María González)
    puestoName: string;        // Nombre del puesto (ej. Puesto 6 - Plaza Central)
    price: number;             // Precio del comerciante para este producto
    bulletinPrice: number;     // Precio de boletín para referencia
    stock: number;             // Stock disponible del comerciante
}