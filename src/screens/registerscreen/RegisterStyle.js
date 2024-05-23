import { StyleSheet } from "react-native";

export const registerStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBD8C5",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
    },
    stepWrapper: {
        flex: 1,
        justifyContent: "space-between",
    },
    login: {
        textDecorationLine: "underline",
    },
    loginContainer: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    touchableOpacityContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    imageContainer: {
        width: 100, // Set a fixed width for the circular image container
        height: 100, // Set a fixed height for the circular image container
        borderRadius: 50, // Make it a circle by setting borderRadius to half of the width and height
        overflow: "hidden", // Clip the image to the circular shape
    },
    image: {
        width: "100%",
        height: "100%",
    },
});
