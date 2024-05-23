import React from "react";
import { Text, View } from "react-native";
import { titleStyle } from "./TitleStyle";

const TitleComp = ({ text }) => {
    return (
        <View style={titleStyle.container}>
            <Text style={titleStyle.title}>{text}</Text>
        </View>
    );
};

export default TitleComp;
