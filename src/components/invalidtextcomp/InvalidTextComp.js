import React from "react";
import { View, Text } from "react-native";
import { invalidTextStyle } from "./InvalidTextStyle";

const InvalidTextComp = ({ text }) => {
    return (
        <View>
            <Text style={invalidTextStyle.text}>{text}</Text>
        </View>
    );
};

export default InvalidTextComp;
