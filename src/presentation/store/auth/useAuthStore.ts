import { create } from "zustand";
import { AuthStatus } from "../../../infraestructure/interfaces/auth.status";
import { authCheckStatus, AuthLogin } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../../config/adapters/storage-adapter";

export interface AuthState {
    status: AuthStatus,
    token?: string;

    login: (email: string, password: string) => Promise<Boolean>;
    checkStatus: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore =  create<AuthState>()( (set, get) => ({
    status: 'loading',
    token: undefined,

    login: async (email: string, password: string) => {
        const resp = await AuthLogin(email, password);
        if (!resp) {
            set({ status: 'unauthenticated', token: undefined });
            return false;
        }

        await StorageAdapter.setItem('token', resp.token);
        
        //console.log({ resp });
        set({ status: 'authenticated', token: resp.token });
        return true;
    },

    checkStatus: async () => {
        const resp = await authCheckStatus();
        if (!resp) {
            set({ status: 'unauthenticated', token: undefined });
            return;
        }

        await StorageAdapter.setItem('token', resp.token);
        set({ status: 'authenticated', token: resp.token });
        return;
    },
    logout: async () => {
        await StorageAdapter.removeItem('token');
        set({ status: 'unauthenticated', token: undefined })
    }
}));