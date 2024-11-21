import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageAdapter {
    static async getItem(key: string): Promise<string | null> {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            console.error("Unexpected error:", error);
            return null;
        }
    }

    static async setItem(key: string, value: string): Promise<void> {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            throw new Error("Unexpected error:" + error);
        }
    }

    static async removeItem(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            throw new Error("Unexpected error:" + error);
        }
    }
}