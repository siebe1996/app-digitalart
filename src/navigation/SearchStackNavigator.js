import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../screens/searchscreen/SearchScreen";
import { APP_TITLE } from "../constants";
import HeaderComp from "../components/headercomp/HeaderComp";
import defaultScreenOptions from "./config/screenOptions";

const Stack = createStackNavigator();

const SearchStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Search"
            screenOptions={defaultScreenOptions}
        >
            <Stack.Screen
                options={{
                    headerTitle: "Search",
                }}
                name="Search"
                component={SearchScreen}
            />
            {/*<Stack.Screen
                options={{
                    headerTitle: () => (
                        <HeaderComp
                            title={APP_TITLE}
                            subtitle={"Claim For Review"}
                        />
                    ),
                }}
                name="Claim Review"
                component={ClaimReviewScreen}
            />*/}
        </Stack.Navigator>
    );
};

export default SearchStackNavigator;
