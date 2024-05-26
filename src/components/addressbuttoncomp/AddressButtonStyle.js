import { StyleSheet } from "react-native";

export const addressButtonStyle = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        minWidth: 200,
    },
    button: {
        padding: 15,
        backgroundColor: "#FFB375",
        borderColor: "#5B84C4",
        borderWidth: 2,
        alignItems: "center",
        borderRadius: 10,
        width: "100%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
