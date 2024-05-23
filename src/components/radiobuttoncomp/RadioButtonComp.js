import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { radioButtonStyle } from "./RadioButtonStyle";

const RadioButtonComp = ({
    labelTitle,
    labelText,
    onPress,
    selected = false,
}) => {
    return (
        <TouchableOpacity
            style={radioButtonStyle.radioButtonContainer}
            onPress={onPress}
        >
            <View
                style={[
                    radioButtonStyle.radioButton,
                    selected && radioButtonStyle.radioButtonSelected,
                ]}
            >
                {selected ? (
                    <View style={radioButtonStyle.radioButtonIcon} />
                ) : null}
            </View>
            <View>
                <Text style={radioButtonStyle.labelTitle}>{labelTitle}</Text>
                {labelText && (
                    <Text style={radioButtonStyle.labelText}>{labelText}</Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default RadioButtonComp;
