import { StyleSheet } from "react-native";

export const artCardStyle = StyleSheet.create({
    card: {
        width: "100%", // Card takes full width of its parent
        aspectRatio: 1,
        position: "relative",
        backgroundColor: "#EBD8C5",
        elevation: 5,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    infoIcon: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1,
    },
    infoContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    artist: {
        fontSize: 14,
        color: "white",
    },
    description: {
        fontSize: 12,
        color: "white",
        marginTop: 5,
    },
});
