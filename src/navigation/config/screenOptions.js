import { StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const defaultScreenOptions = {
    headerStyle: {
        height: 40,
        backgroundColor: "#EBD8C5",
        elevation: 0,
        shadowOpacity: 0,
        borderColor: "#EBD8C5",
        borderBottomWidth: 0,
    },
    headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#11224D",
        marginTop: 10,
    },
    headerTitleAlign: "center",
    headerTintColor: "#11224D",
    headerBackImage: ({ tintColor }) => (
        <Ionicons
            name="arrow-back"
            size={24}
            color={tintColor}
            style={{ marginLeft: 10 }}
        />
    ),
};

export default defaultScreenOptions;
