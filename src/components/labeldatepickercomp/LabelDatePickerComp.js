import React from "react";
import { View } from "react-native";
import LabelComp from "../labelcomp/LabelComp";
import DatePickerComp from "../datepickercomp/DatePickerComp";
import { labelDatePickerStyle } from "./LabelDatePickerStyle";

const LabelDatePickerComp = ({ label, value, onChange }) => {
    return (
        <View style={labelDatePickerStyle.container}>
            <LabelComp text={label} />
            <DatePickerComp value={value} onChange={onChange} />
        </View>
    );
};

export default LabelDatePickerComp;
