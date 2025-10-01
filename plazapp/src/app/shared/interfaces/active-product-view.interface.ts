import { FirestoreTimestamp } from "./firestoreTimestamp.interface";

export interface ActiveProductView {
    id: string; // ID del MerchantProduct, usado para acciones (editar/eliminar)
    idCatalogProduct: string;
    merchantPrice: number;
    publishedAt: FirestoreTimestamp;
    status: boolean; // Usado para el switch

    // Campos AÑADIDOS del CatalogProduct (join necesario)
    name: string; // Nombre del producto (Tomates, Plátanos)
    type: string; // Tipo (Verduras, Frutas)
    bulletinPrice: number; // Precio de referencia

    // Campos CALCULADOS (para facilitar la UI)
    publishedDateFormatted: string;
    stock: number; // Campo simulado/asumido para el ejemplo, ajústalo si tu API lo devuelve
}
