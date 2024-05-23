import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/homescreen/HomeScreen";
import SearchScreen from "../screens/searchscreen/SearchScreen";
import SearchStackNavigator from "./SearchStackNavigator";
import MapScreen from "../screens/mapscreen/MapScreen";
import UploadArtScreenScreen from "../screens/uploadartscreen/UploadArtScreen";
import ProfileStackNavigator from "./ProfileStackNavigator";
import { APP_TITLE } from "../constants";
import HeaderComp from "../components/headercomp/HeaderComp";
import { useAuth } from "../contexts/AuthContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const { state } = useAuth();
    const [user, setUser] = useState(state.user);
    const userRole = user?.roles?.includes("Artist") ? "Artist" : "User";
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "#FB9B50",
                tabBarInactiveTintColor: "#FFB375",
                tabBarLabelStyle: {
                    fontSize: 11,
                },
                tabBarStyle: {
                    backgroundColor: "#5B84C4",
                    paddingBottom: insets.bottom,
                    paddingTop: 10,
                    height: 50 + insets.bottom,
                    borderColor: "#5B84C4",
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={({ route }) => ({
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                    headerTitle: () => (
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../data/images/logo.png")}
                        />
                    ),
                    headerStyle: {
                        height: 70,
                        backgroundColor: "#5B84C4",
                        borderColor: "#5B84C4",
                    },
                    headerTitleAlign: "center",
                    headerLeft: null,
                })}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarLabel: "Search",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" color={color} size={size} />
                    ),
                    headerTitle: () => (
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../data/images/logo.png")}
                        />
                    ),
                    headerStyle: {
                        height: 70,
                        backgroundColor: "#5B84C4",
                        borderColor: "#5B84C4",
                    },
                    headerTitleAlign: "center",
                    headerLeft: null,
                }}
            />
            {userRole === "Artist" && (
                <Tab.Screen
                    name="Upload Art"
                    component={UploadArtScreenScreen}
                    options={({ route }) => ({
                        tabBarLabel: "Upload",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="add-circle-outline"
                                color={color}
                                size={size}
                            />
                        ),
                        headerTitle: () => (
                            <Image
                                style={{ width: 50, height: 50 }}
                                source={require("../data/images/logo.png")}
                            />
                        ),
                        headerStyle: {
                            height: 70,
                            backgroundColor: "#5B84C4",
                            borderColor: "#5B84C4",
                        },
                        headerTitleAlign: "center",
                        headerLeft: null,
                    })}
                />
            )}
            <Tab.Screen
                name="Map"
                component={MapScreen}
                options={({ route }) => ({
                    tabBarLabel: "Map",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="map-outline"
                            color={color}
                            size={size}
                        />
                    ),
                    headerTitle: () => (
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../data/images/logo.png")}
                        />
                    ),
                    headerStyle: {
                        height: 70,
                        backgroundColor: "#5B84C4",
                        borderColor: "#5B84C4",
                    },
                    headerTitleAlign: "center",
                    headerLeft: null,
                })}
            />
            <Tab.Screen
                name="Profile Stack"
                component={ProfileStackNavigator}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" color={color} size={size} />
                    ),
                    headerTitle: () => (
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require("../data/images/logo.png")}
                        />
                    ),
                    headerStyle: {
                        height: 70,
                        backgroundColor: "#5B84C4",
                        borderColor: "#5B84C4",
                    },
                    headerTitleAlign: "center",
                    headerLeft: null,
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
