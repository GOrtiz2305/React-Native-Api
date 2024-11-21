import axios from "axios";
import { API_URL } from "@env";
import { StorageAdapter } from "./adapters/storage-adapter";

const backApi = axios.create({
    baseURL: "http://10.0.2.2:3000/api/",
    headers: { "Content-Type": "application/json" },
});

backApi.interceptors.request.use(
    async (config) => {
        const token = await StorageAdapter.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export {
    backApi
}