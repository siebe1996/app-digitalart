import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { buttonStyle } from "./ButtonStyle";

const ButtonComp = ({ onPress, text, disabled }) => {
    return (
        <View style={buttonStyle.container}>
            <TouchableOpacity
                onPress={onPress}
                style={buttonStyle.button}
                disabled={disabled}
            >
                <Text style={buttonStyle.buttonText}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ButtonComp;
