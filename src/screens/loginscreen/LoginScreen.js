import React, { useState, useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Image,
} from "react-native";
import { loginStyle } from "./LoginStyle";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import ButtonComp from "../../components/buttoncomp/ButtonComp";
import LabelTextInputComp from "../../components/labeltextinputcomp/LabelTextInputComp";
import TitleBoxComp from "../../components/titleboxcomp/TitleBoxComp";
import ContentViewComp from "../../components/contentviewcomp/ContentViewComp";
import InvalidTextComp from "../../components/invalidtextcomp/InvalidTextComp";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { signIn } = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const navigation = useNavigation();

    const validateForm = () => {
        const newErrors = {};
        if (!email.trim()) {
            newErrors.email = "email is required";
        }
        if (!password.trim()) {
            newErrors.password = "password is required";
        }
        return newErrors;
    };

    const handleLogin = async () => {
        console.log("Logging in with email:", email, "and password:", password);
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);
            let loginSuccess = true;
            try {
                loginSuccess = await signIn(email, password);
            } catch (e) {
                console.log("Something went wrong logging in:", e);
            }
            if (loginSuccess) {
                setLoading(false);
                console.log("Login successful");
            } else {
                const newErrors = {};
                newErrors.login = "Wrong Credentials";
                setErrors(newErrors);
                setLoading(false);
                console.error("Login failed");
            }
        } else {
            setErrors(validationErrors);
            console.log("errors", validationErrors);
        }
    };

    const handleRegisterPress = () => {
        navigation.navigate("Register");
    };

    return (
        <View style={loginStyle.container}>
            <TitleBoxComp text="Welcome To ArtSy(nc)" />
            <ContentViewComp>
                <LabelTextInputComp
                    label="Email: *"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="example@example.com"
                />
                {errors.email && <InvalidTextComp text={errors.email} />}
                <LabelTextInputComp
                    style={loginStyle.labelTextInput}
                    label="Password: *"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                />
                {errors.password && <InvalidTextComp text={errors.password} />}
                {errors.login && <InvalidTextComp text={errors.login} />}
                <ButtonComp
                    style={loginStyle.button}
                    text="Login"
                    onPress={handleLogin}
                    disabled={loading}
                />

                <View style={loginStyle.registerContainer}>
                    <Text>
                        No Account? Register{" "}
                        <Text
                            style={loginStyle.register}
                            onPress={handleRegisterPress}
                        >
                            here
                        </Text>
                    </Text>
                </View>
                {loading && <ActivityIndicator size="large" color="#0000ff" />}
            </ContentViewComp>
        </View>
    );
};

export default LoginScreen;
