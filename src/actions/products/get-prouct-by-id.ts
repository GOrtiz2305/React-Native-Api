import { backApi } from "../../config/backendApi";
import { Product } from "../../domain/entities/product";
import { backProduct } from "../../infraestructure/interfaces/back-products.response";
import { ProductMapper } from "../../infraestructure/mappers/product.mapper";
import { Brand } from "../../domain/entities/product";
import { Presentation } from "../../domain/entities/product";

const emptyProduct: Product = {
    id: 0,
    price: 0,
    product_name: '',
    product_description: '',
    brand_id: 0,
    presentation_id: 0,
    stock: 0
}

export const getProductById = async (id: string): Promise<Product> => {

    if (id === 'new') {
        return emptyProduct;
    }

    try {
        const { data } = await backApi.get<backProduct>(`products/${id}`);
        return ProductMapper.backProductToEntity(data);
    }catch (error) {
        console.log(error);
        throw new Error('Error al obtener el producto');
    }
}

export const getBrands = async (): Promise<Brand[]> => {
    try {
        const { data } = await backApi.get<Brand[]>('brands');
        return data;
    }catch (error) {
        console.log(error);
        throw new Error('Error al obtener las marcas');
    }
}

export const getPresentations = async (): Promise<Presentation[]> => {
    try {
        const { data } = await backApi.get<Presentation[]>('presentations');
        return data;
    }catch (error) {
        console.log(error);
        throw new Error('Error al obtener las presentaciones');
    }
}
