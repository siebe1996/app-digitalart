import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext"; // Import useAuth to get the state
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NavigationWrapper from "./src/navigation/NavigationWrapper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
    return (
        <GestureHandlerRootView style={styles.container}>
            <AuthProvider>
                <SafeAreaProvider>
                    <NavigationWrapper />
                </SafeAreaProvider>
            </AuthProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBD8C5",
        color: "#11224D",
    },
    safeAreaContainer: {
        flex: 1,
    },
});
