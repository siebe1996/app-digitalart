import React from "react";
import { View, Text } from "react-native";
import { textStyle } from "./TextStyle";

const TextComp = ({ text, keyProp, style }) => {
    return (
        <View>
            {text ? (
                <Text style={textStyle.text} key={keyProp}>
                    {text}
                </Text>
            ) : (
                <Text style={textStyle.text}>No data</Text>
            )}
        </View>
    );
};

export default TextComp;
