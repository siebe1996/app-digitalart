import * as SecureStore from "expo-secure-store";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

export async function setSecureItemAsync(key, value) {
    if (Platform.OS === "web") {
        try {
            if (value === null) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, value);
            }
        } catch (e) {
            console.error("Local storage is unavailable:", e);
        }
    } else {
        if (value === null) {
            await SecureStore.deleteItemAsync(key);
        } else {
            await SecureStore.setItemAsync(key, value);
        }
    }
}

export async function getSecureItemAsync(key) {
    if (Platform.OS === "web") {
        try {
            const value = localStorage.getItem(key);
            return value;
        } catch (e) {
            console.error("Local storage is unavailable:", e);
            return null;
        }
    } else {
        try {
            const value = await SecureStore.getItemAsync(key);
            return value;
        } catch (error) {
            console.error("SecureStore is unavailable:", error);
            return null;
        }
    }
}

export async function removeSecureItemAsync(key) {
    if (Platform.OS === "web") {
        try {
            const value = localStorage.getItem(key);
            if (value !== null) {
                localStorage.removeItem(key);
            }
            return value;
        } catch (e) {
            console.error("Local storage is unavailable:", e);
            return null;
        }
    } else {
        try {
            const value = await SecureStore.getItemAsync(key);
            if (value !== null) {
                await SecureStore.deleteItemAsync(key);
            }
            return value;
        } catch (error) {
            console.error("SecureStore is unavailable:", error);
            return null;
        }
    }
}

export async function setCacheItemAsync(key, value) {
    const cachePath = FileSystem.cacheDirectory + key;
    try {
        await FileSystem.writeAsStringAsync(cachePath, value);
        return cachePath;
    } catch (error) {
        console.error("Error writing to cache:", error);
        return null;
    }
}

export async function getCacheItemAsync(key) {
    const cachePath = FileSystem.cacheDirectory + key;
    try {
        const value = await FileSystem.readAsStringAsync(cachePath);
        return value;
    } catch (error) {
        console.error("Error reading from cache:", error);
        return null;
    }
}

export async function removeCacheItemAsync(key) {
    const cachePath = FileSystem.cacheDirectory + key;
    try {
        await FileSystem.deleteAsync(cachePath);
        return true;
    } catch (error) {
        console.error("Error deleting from cache:", error);
        return false;
    }
}

export async function setDocumentItemAsync(key, value) {
    const documentPath = FileSystem.documentDirectory + key;
    try {
        await FileSystem.writeAsStringAsync(documentPath, value);
        return documentPath;
    } catch (error) {
        console.error("Error writing to document directory:", error);
        return null;
    }
}

export async function getDocumentItemAsync(key) {
    const documentPath = `${FileSystem.documentDirectory}${key}`;
    try {
        const fileInfo = await FileSystem.getInfoAsync(documentPath);
        if (!fileInfo.exists) {
            console.log(`File ${documentPath} does not exist. Creating file.`);
            await FileSystem.writeAsStringAsync(documentPath, "{}");
        }
        const value = await FileSystem.readAsStringAsync(documentPath);
        return value;
    } catch (error) {
        console.error("Error reading from document directory:", error);
        return null;
    }
}

export async function removeDocumentItemAsync(key) {
    const documentPath = FileSystem.documentDirectory + key;
    try {
        await FileSystem.deleteAsync(documentPath);
        return true;
    } catch (error) {
        console.error("Error deleting from document directory:", error);
        return false;
    }
}
