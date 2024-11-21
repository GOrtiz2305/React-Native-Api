import axios from "axios";
import { backApi } from "../../config/backendApi";
import type { LoginResponse } from "../../infraestructure/interfaces/auth.responses";

const returnToken = (data: LoginResponse) => {
    return {
        token: data.token,
    }
}


export const AuthLogin = async (email: string, password: string) => {
    try {
        const response = await backApi.post<LoginResponse>("users/login", {
            email,
            password,
        });

        console.log(response.data);
        return returnToken(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.message);
            console.error("Error details:", error.toJSON());
        } else {
            console.error("Unexpected error:", error);
        }
        return null;
    }
}

export const authCheckStatus = async () => {
    try {
        const {data} = await backApi.get<LoginResponse>("isUserAuth");
        return returnToken(data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.message);
            console.error("Error details:", error.toJSON());
        } else {
            console.error("Unexpected error:", error);
        }
        return null;
    }
}