import { API_URL } from "@env";
import { Product } from "../../domain/entities/product";
import { backProduct } from "../interfaces/back-products.response";

export class ProductMapper {
    static backProductToEntity(backProduct: backProduct): Product {
        return {
            id: backProduct.id,
            product_name: backProduct.product_name,
            price: backProduct.price,
            discount_price: backProduct.discount_price,
            discount: backProduct.discount,
            product_description: backProduct.product_description,
            image: backProduct.image,
            stock: backProduct.stock,
            brand_id: backProduct.brand_id,
            presentation_id: backProduct.presentation_id,
            status: backProduct.status,
            createdAt: new Date(backProduct.createdAt),
            updatedAt: new Date(backProduct.updatedAt),
            presentation: {
                id: backProduct.presentation.id,
                presentation_name: backProduct.presentation.presentation_name,
                createdAt: new Date(backProduct.presentation.createdAt),
                updatedAt: new Date(backProduct.presentation.updatedAt),
            },
            brand: {
                id: backProduct.brand.id,
                brand_name: backProduct.brand.brand_name,
                createdAt: new Date(backProduct.brand.createdAt),
                updatedAt: new Date(backProduct.brand.updatedAt),
            },
        };
    }
}