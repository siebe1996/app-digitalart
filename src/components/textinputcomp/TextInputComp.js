import React from "react";
import { View, TextInput } from "react-native";
import { textInputStyle } from "./TextInputStyle";

const TextInputComp = ({
    value,
    onChangeText,
    placeholder,
    keyboardType = "default",
    secureTextEntry = false,
    keyProp,
    multiline = false,
    numberOfLines = 1,
}) => {
    return (
        <View>
            <TextInput
                key={keyProp}
                style={textInputStyle.textInput}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                multiline={multiline}
                numberOfLines={numberOfLines}
                placeholderTextColor="#FFFFFF"
            />
        </View>
    );
};

export default TextInputComp;
