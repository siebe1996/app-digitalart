import { StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

export const searchStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBD8C5",
    },
    columnWrapper: {
        justifyContent: "space-between",
    },
    item: {
        height: (screenWidth - 40) / 2,
        width: (screenWidth - 30) / 2, // Calculates the width for two columns, considering 10 padding and 5*2 spacing between items
        justifyContent: "center", // Centers content inside the square
        alignItems: "center", // Centers content inside the square
        backgroundColor: "#f0f0f0", // Background color for visibility
        margin: 5, // Margin around each square
        overflow: "hidden",
    },
    cardContainer: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    searchBar: {
        fontSize: 18,
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        backgroundColor: "#f9f9f9",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    noData: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
});
