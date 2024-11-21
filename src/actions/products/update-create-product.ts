import { isAxiosError } from "axios";
import { backApi } from "../../config/backendApi";
import { Product } from "../../domain/entities/product";

export const updateCreateProduct = (product: Partial<Product>) => {

    product.stock = Number(product.stock);
    product.price = Number(product.price);
    product.product_name = product.product_name;
    product.product_description = product.product_description;

    if (product.id && String(product.id) !== 'new') {
        return updateProduct(product);
    }

    return createProduct(product);
}

const updateProduct = async (product: Partial<Product>) => {
    console.log({ product });

    const { id, ...rest} = product;

    try {
        const { data } = await backApi.put(`products/${id}`, {
            ...rest
        });

        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.message);
        }
        throw new Error('Error al actualizar el producto');
    }
}

const createProduct = async (product: Partial<Product>) => {

    const { id, ...rest} = product;

    try {
        const { data } = await backApi.post('products', {
            ...rest
        });

        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.message);
        }

        throw new Error('Error al crear el producto');
    }
}