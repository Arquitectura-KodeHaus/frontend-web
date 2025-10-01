import { MerchantProductListing } from "./merchant-product-listing.interface";

export interface CatalogProductWithMerchants {
    id: string;             // ID del producto del catálogo (ej. ID de Tomates)
    name: string;           // Nombre del producto (ej. Tomates)
    type: string;           // Tipo (ej. Verduras, Frutas)
    merchantCount: number;  // Nuevo: Número de comerciantes que lo ofrecen
    merchants: MerchantProductListing[]; // La lista de ofertas de cada vendedor
}