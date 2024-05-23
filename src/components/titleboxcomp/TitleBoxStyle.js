import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get("window");
export const titleBoxStyle = StyleSheet.create({
    container: {
        height: height / 3,
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
    },
});
