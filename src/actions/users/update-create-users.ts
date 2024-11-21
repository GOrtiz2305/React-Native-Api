import { isAxiosError } from "axios";
import { backApi } from "../../config/backendApi";
import { User } from "../../domain/entities/user";

export const updateCreateUser = (user: Partial<User>) => {

    user.names = user.names;
    user.last_names = user.last_names;
    user.email = user.email;
    user.password = user.password;
    user.address = user.address;
    user.phone = user.phone;
    user.nit = user.nit;

    return createUser(user);
}

const createUser = async (user: Partial<User>) => {

    const { id, ...rest} = user;

    try {
        const { data } = await backApi.post('clients', {
            ...rest
        });

        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.message);
        }

        throw new Error('Error al crear el usuario');
    }
}