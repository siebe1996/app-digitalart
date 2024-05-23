import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import TabNavigator from "./TabNavigator";
import LoginStackNavigator from "./LoginStackNavigator";
import WelcomeScreen from "../screens/welcomescreen/WelcomeScreen";

export default function NavigationWrapper({ navigation }) {
    const { state } = useAuth();
    console.log("user token in navigator:", state.userToken); // Add this line to check the state
    console.log("user priorLogin in navigator:", state.priorLogin);
    console.log("user in navigator:", state.user);

    return (
        <NavigationContainer>
            {!state.priorLogin ? (
                <WelcomeScreen />
            ) : state.userToken ? (
                <TabNavigator />
            ) : (
                <LoginStackNavigator />
            )}
        </NavigationContainer>
    );
}
