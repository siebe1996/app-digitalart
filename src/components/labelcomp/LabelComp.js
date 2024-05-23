import React from "react";
import { View, Text } from "react-native";
import { labelStyle } from "./LabelStyle";

const LabelComp = ({ text }) => {
    return (
        <View>
            <Text style={labelStyle.label}>{text}</Text>
        </View>
    );
};

export default LabelComp;
