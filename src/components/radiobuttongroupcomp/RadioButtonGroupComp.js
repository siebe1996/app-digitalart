import React, { useState } from "react";
import { View } from "react-native";
import RadioButtonComp from "../radiobuttoncomp/RadioButtonComp";

const RadioButtonGroupComp = ({
    options,
    selectedValue,
    onSelectionChange,
}) => {
    const [intialSelectedValue, setIntialSelectedValue] =
        useState(selectedValue);

    return (
        <View>
            {options.map((option) => (
                <RadioButtonComp
                    key={option.value}
                    labelTitle={option.labelTitle}
                    labelText={option.labelText}
                    selected={option.value === intialSelectedValue}
                    onPress={() => {
                        setIntialSelectedValue(option.value);
                        onSelectionChange(option.value);
                    }}
                />
            ))}
        </View>
    );
};

export default RadioButtonGroupComp;
