import React, { Children } from "react";
import { View, Text } from "react-native";
import { screenWrapperStyle } from "./ScreenWrapperStyle";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ScreenWrapperComp = ({ children, style }) => {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                screenWrapperStyle.container,
                style,
                { paddingBottom: insets.bottom },
            ]}
        >
            {children}
        </View>
    );
};

export default ScreenWrapperComp;
