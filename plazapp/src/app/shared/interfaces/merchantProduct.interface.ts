import { FirestoreTimestamp } from "./firestoreTimestamp.interface";

export interface MerchantProduct {
    id: string;
    idMerchant: string;
    idCatalogProduct: string;
    merchantPrice: number;
    publishedAt: FirestoreTimestamp;
    status: boolean;
}