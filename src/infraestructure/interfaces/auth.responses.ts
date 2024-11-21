export interface LoginResponse {
    auth: boolean;
    token: string;
    id: string;
    role: string;
}