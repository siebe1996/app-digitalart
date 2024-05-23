import React from "react";
import { View } from "react-native";
import TitleComp from "../titlecomp/TitleComp";
import TextComp from "../textcomp/TextComp";
import { titleTextStyle } from "./TitleTextStyle";

const TitleTextComp = ({ title, text, titleStyle, textStyle }) => {
    return (
        <View style={titleTextStyle.container}>
            <TitleComp text={title} style={titleStyle} />
            <TextComp text={text} style={[titleTextStyle.text, textStyle]} />
        </View>
    );
};

export default TitleTextComp;
