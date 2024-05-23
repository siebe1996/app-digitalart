import React from "react";
import { Text, View } from "react-native";
import { titleBoxStyle } from "./TitleBoxStyle";
import TitleComp from "../titlecomp/TitleComp";

const TitleBoxComp = ({ text }) => {
    return (
        <View style={titleBoxStyle.container}>
            <TitleComp text={text} />
        </View>
    );
};

export default TitleBoxComp;
