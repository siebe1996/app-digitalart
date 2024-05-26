import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { addressButtonStyle } from "./AddressButtonStyle";

const AddressButtonComp = ({ onPress, text, disabled }) => {
    return (
        <View style={addressButtonStyle.container}>
            <TouchableOpacity
                onPress={onPress}
                style={addressButtonStyle.button}
                disabled={disabled}
            >
                <Text style={addressButtonStyle.buttonText}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddressButtonComp;
