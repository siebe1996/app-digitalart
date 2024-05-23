import { StyleSheet } from "react-native";

export const radioButtonStyle = StyleSheet.create({
    radioButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#11224D",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    radioButtonSelected: {
        borderColor: "#11224D",
    },
    radioButtonIcon: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: "#11224D",
    },
    labelTitle: {
        fontSize: 16,
        color: "#11224D",
    },
    labelText: {
        fontSize: 13,
        color: "#11224D",
    },
});
