import { StyleSheet } from "react-native";

export const profileStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBD8C5",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    imageContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: "hidden",
    },
    center: {
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 50,
    },
});
