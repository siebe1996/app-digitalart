import { StyleSheet } from "react-native";

export const welcomeStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "#EBD8C5",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    stepIndicatorContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    stepIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#FFB375",
        marginHorizontal: 5,
    },
    currentStep: {
        backgroundColor: "#193A6F",
    },
    buttonContainer: {
        marginBottom: 20,
    },
});
