import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/profilescreen/ProfileScreen";
import { APP_TITLE } from "../constants";
import HeaderComp from "../components/headercomp/HeaderComp";
import defaultScreenOptions from "./config/screenOptions";

const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Profile"
            screenOptions={defaultScreenOptions}
        >
            <Stack.Screen
                options={{
                    headerTitle: "Profile",
                }}
                name="Profile"
                component={ProfileScreen}
            />
            {/*<Stack.Screen
                options={{
                    headerTitle: () => (
                        <CostumHeaderComponent
                            title={APP_TITLE}
                            subtitle={"Edit"}
                        />
                    ),
                }}
                name="Edit Account"
                component={EditAccountScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle: () => (
                        <CostumHeaderComponent
                            title={APP_TITLE}
                            subtitle={"Test"}
                        />
                    ),
                }}
                name="Test"
                component={TestStripeScreen}
            />*/}
        </Stack.Navigator>
    );
};

export default ProfileStackNavigator;
