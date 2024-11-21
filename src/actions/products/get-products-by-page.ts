import { backApi } from "../../config/backendApi";
import type { ProductsResponse } from "../../infraestructure/interfaces/back-products.response";
import type { Product } from "../../domain/entities/product";
import { ProductMapper } from "../../infraestructure/mappers/product.mapper";

export const getProductsByPage = async (page: number, limit: number = 9): Promise<Product[]> => {
    console.log({ page, limit })

    try {
        const { data } = await backApi.get<ProductsResponse>(`pagination/products?page=${page}&limit=${limit}`);
        
        // Access the 'products' array from the response data
        const products = data.products.map(ProductMapper.backProductToEntity);

        console.log(products[0]);
        return products;
    } catch (error) {
        console.error("Unexpected error:", error);
        throw new Error("Unexpected error");
    }
}