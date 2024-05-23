import React from "react";
import { View, Text } from "react-native";
import { defaultStyle } from "./DefaultStyle";

const DefaultScreen = () => {
    return (
        <View style={defaultStyle.container}>
            <Text>Default Screen</Text>
        </View>
    );
};

export default DefaultScreen;
