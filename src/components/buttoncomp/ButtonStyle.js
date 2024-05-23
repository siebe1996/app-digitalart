import { StyleSheet } from "react-native";

export const buttonStyle = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        minWidth: 200,
    },
    button: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        marginBottom: 15,
        padding: 15,
        backgroundColor: "#11224D",
        alignItems: "center",
        borderRadius: 10,
        width: "80%",
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
