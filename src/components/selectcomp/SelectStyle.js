import { StyleSheet } from "react-native";

export const selectStyle = StyleSheet.create({
    container: {
        padding: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    dropdown: {
        height: 50,
        backgroundColor: "#FFB375",
        borderColor: "#11224D",
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    dropdownContainer: {
        maxHeight: 200, // Set a maximum height for the dropdown container
        backgroundColor: "#FFB375",
    },
    placeholderStyle: {
        fontSize: 16,
        color: "white",
    },
    selectedTextStyle: {
        fontSize: 16,
        color: "#193A6F",
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    selectedItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFB375",
        borderRadius: 8,
        padding: 8,
        marginVertical: 4,
        marginHorizontal: 2,
    },
    selectedText: {
        fontSize: 16,
        color: "#FFB375",
    },
    unSelectText: {
        fontSize: 16,
        marginLeft: 8,
        color: "#FFB375",
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#FFB375",
    },
    itemText: {
        fontSize: 16,
        color: "white",
    },
});
