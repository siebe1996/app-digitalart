import React from "react";
import { View } from "react-native";
import { labelTextStyle } from "./LabelTextStyle";
import LabelComp from "../labelcomp/LabelComp";
import TextComp from "../textcomp/TextComp";

const LabelTextComp = ({ label, text, keyProp }) => {
    return (
        <View style={labelTextStyle.container}>
            <LabelComp text={label} />
            <TextComp text={text} key={keyProp} />
        </View>
    );
};

export default LabelTextComp;
