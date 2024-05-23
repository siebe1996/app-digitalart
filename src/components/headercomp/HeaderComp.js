import React from "react";
import { View, Text } from "react-native";
import { headerStyle } from "./HeaderStyle";

const HeaderComp = ({ title, subtitle }) => {
    return (
        <View style={{ alignItems: "center" }}>
            <Text style={headerStyle.title}>{title}</Text>
            {subtitle && <Text style={headerStyle.subtitle}>{subtitle}</Text>}
        </View>
    );
};

export default HeaderComp;
