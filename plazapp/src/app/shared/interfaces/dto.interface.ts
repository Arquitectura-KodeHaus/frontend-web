import { CatalogProduct } from './catalogProduct.interface';
import { MerchantProduct } from './merchantProduct.interface';

export interface CatalogProductDto {
    catalogProducts: CatalogProduct[];
}

export interface MerchantProductDto {
    merchantProducts: MerchantProduct[];
}