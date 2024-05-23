import React from "react";
import { contentViewStyle } from "./ContentViewStyle";
import { View } from "react-native";

const ContentViewComp = ({ children }) => {
    return <View style={contentViewStyle.container}>{children}</View>;
};

export default ContentViewComp;
