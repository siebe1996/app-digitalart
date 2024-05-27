import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Keyboard,
    Platform,
} from "react-native";
import { registerStyle } from "./RegisterStyle";
import TitleComp from "../../components/titlecomp/TitleComp";
import LabelTextInputComp from "../../components/labeltextinputcomp/LabelTextInputComp";
import InvalidTextComp from "../../components/invalidtextcomp/InvalidTextComp";
import RadioButtonGroupComp from "../../components/radiobuttongroupcomp/RadioButtonGroupComp";
import ButtonComp from "../../components/buttoncomp/ButtonComp";
import LabelComp from "../../components/labelcomp/LabelComp";
import {
    fetchPredictions,
    fetchAddressInfo,
    fetchRoles,
} from "../../services/ApiService";
import { returnResultImagePicker } from "../../services/HelperFunctions";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import TitleBoxComp from "../../components/titleboxcomp/TitleBoxComp";
import ContentViewComp from "../../components/contentviewcomp/ContentViewComp";
import LabelDatePickerComp from "../../components/labeldatepickercomp/LabelDatePickerComp";
import AddressButtonComp from "../../components/addressbuttoncomp/AddressButtonComp";

const RegisterScreen = () => {
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [date, setDate] = useState(new Date());
    const [address, setAddress] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [province, setProvince] = useState("");
    const [country, setCountry] = useState("");
    const [selectedPrediction, setSelectedPrediction] = useState([]);
    const [predictions, setPredictions] = useState([]);
    const [description, setDescription] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const radioButtonOptions = [
        {
            labelTitle: "Artist",
            labelText: "I want to show my work",
            value: "Artist",
        },
        {
            labelTitle: "Art Lover",
            labelText: "I like to see art",
            value: "User",
        },
    ];
    const [radioButtonValue, setRadioButtonValue] = useState(
        radioButtonOptions[0]?.value
    );

    const navigation = useNavigation();
    const { signUp } = useContext(AuthContext);

    useEffect(() => {
        fetchPredictionsAsync();
    }, [address]);

    const fetchPredictionsAsync = async () => {
        console.log("fetch predictions word opgeroepen");
        try {
            if (address.length > 0) {
                const result = await fetchPredictions(address);
                console.log("Predictions result fetch", result);
                const addressInPredictions = result.predictions.some(
                    (prediction) => prediction.description === address
                );
                if (!addressInPredictions) {
                    setPredictions(result.predictions);
                }
                console.log("Predictions", predictions);
            } else {
                setPredictions([]);
            }
        } catch (error) {
            console.error("Error fetching predictions:", error.message);
        }
    };

    const handleSearch = async (selectedPrediction) => {
        setAddress(selectedPrediction.description);
        const resultFetch = await fetchAddressInfo(
            selectedPrediction.description
        );
        const result = resultFetch.results[0];
        const city =
            result.address_components.find((component) =>
                component.types.includes("locality")
            )?.long_name || "";
        const province =
            result.address_components.find((component) =>
                component.types.includes("administrative_area_level_1")
            )?.short_name || "";
        const postalCode =
            result.address_components.find((component) =>
                component.types.includes("postal_code")
            )?.long_name || "";
        const countryComponent = result.address_components.find((component) =>
            component.types.includes("country")
        );
        const country = countryComponent ? countryComponent.short_name : "";
        const streetNumberComponent = result.address_components.find(
            (component) => component.types.includes("street_number")
        );
        const routeComponent = result.address_components.find((component) =>
            component.types.includes("route")
        );
        const street =
            (routeComponent ? routeComponent.long_name : "") +
            " " +
            (streetNumberComponent ? streetNumberComponent.long_name : "");

        setCountry(country);
        setCity(city);
        setPostalCode(postalCode);
        setProvince(province);
        setStreet(street);
        setSelectedPrediction(selectedPrediction);
        setPredictions([]);
        Keyboard.dismiss();
    };

    const openImagePicker = async () => {
        try {
            const result = await returnResultImagePicker();
            setSelectedImage(result);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDateChange = (event, selectedDate) => {
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateForm1 = () => {
        const newErrors = {};
        if (!email.trim()) {
            newErrors.email = "Email is required";
        }
        if (!validateEmail(email)) {
            newErrors.email = "Give valid email";
        }
        if (!password1.trim() || password1 !== password2) {
            setPassword1("");
            setPassword2("");
            newErrors.password = "Password is wrong";
        }
        return newErrors;
    };

    const validateForm2 = () => {
        const newErrors = {};
        if (!radioButtonValue.trim()) {
            newErrors.accountOptions = "Please select a valid option";
        }
        return newErrors;
    };

    const validateForm3 = () => {
        const newErrors = {};
        if (!firstName.trim()) {
            newErrors.firstName = "First name is required";
        }
        if (!lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }
        if (!address.trim() && !selectedPrediction) {
            newErrors.address = "Please choose an address from the options";
        }
        if (!address.trim() && !selectedPrediction) {
            newErrors.address = "Address is required";
        }
        if (!street.trim()) {
            newErrors.address = "Street is required";
        }
        if (radioButtonValue === "Artist" && !description.trim()) {
            newErrors.description = "Description is required";
        }
        if (new Date(date) > new Date()) {
            newErrors.date = "The date must be your real birthday";
        }
        return newErrors;
    };

    const validateForm = () => {
        let validationErrors = {};
        if (currentStep === 1) {
            validationErrors = validateForm1();
        } else if (currentStep === 2) {
            validationErrors = validateForm2();
        } else {
            validationErrors = validateForm3();
        }
        return validationErrors;
    };

    const handleNextStep = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            if (currentStep < totalSteps) {
                setCurrentStep(currentStep + 1);
            } else {
                handleRegister();
            }
        } else {
            setErrors(validationErrors);
            console.log("errors", validationErrors);
        }
    };

    const handleRegister = async () => {
        console.log("register gets pressed");
        setLoading(true);

        const userData = {
            firstName,
            lastName,
            imageData: selectedImage.base64,
            mimeTypeImageData: selectedImage.mimeType,
            dateOfBirth: date,
            email,
            country,
            city,
            postalCode,
            province,
            street,
            address,
            description,
            password: password1,
            role: radioButtonValue,
        };
        const jsonUserData = JSON.stringify(userData);
        let registerSuccess = true;
        try {
            console.log("jsonUserData", jsonUserData);
            registerSuccess = await signUp(jsonUserData);
        } catch (error) {
            console.error("Error posting user:", error);
        }
        if (registerSuccess) {
            setLoading(false);
            console.log("register successful");
        } else {
            const newErrors = {};
            newErrors.wrong = "Something went wrong";
            setErrors(newErrors);
            setLoading(false);
            console.error("Login failed");
        }
    };

    const handleLoginPress = () => {
        navigation.navigate("Login");
    };

    return (
        <View style={registerStyle.container}>
            {currentStep === 1 && (
                <View style={registerStyle.stepWrapper}>
                    <TitleBoxComp text="Welcome to ArtSy(nc)" />
                    <ContentViewComp>
                        <View>
                            <LabelTextInputComp
                                label="Email"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                placeholder="johndoe@example.com"
                            />
                            {errors.email && (
                                <InvalidTextComp text={errors.email} />
                            )}
                        </View>
                        <View>
                            <LabelTextInputComp
                                label="Password"
                                value={password1}
                                onChangeText={(text) => setPassword1(text)}
                                placeholder="Password"
                                secureTextEntry={true}
                            />
                            <LabelTextInputComp
                                label="Confirm Password"
                                value={password2}
                                onChangeText={(text) => setPassword2(text)}
                                placeholder="Password"
                                secureTextEntry={true}
                            />
                            {errors.password && (
                                <InvalidTextComp text={errors.password} />
                            )}
                        </View>
                        <ButtonComp
                            text={
                                currentStep < totalSteps ? "Next" : "Register"
                            }
                            disabled={loading}
                            onPress={handleNextStep}
                        />
                        <View style={registerStyle.loginContainer}>
                            <Text>
                                Already have an account? Login{" "}
                                <Text
                                    style={registerStyle.login}
                                    onPress={handleLoginPress}
                                >
                                    here
                                </Text>
                            </Text>
                        </View>
                        {loading && (
                            <ActivityIndicator size="large" color="#0000ff" />
                        )}
                    </ContentViewComp>
                </View>
            )}
            {currentStep === 2 && (
                <View style={registerStyle.stepWrapper}>
                    <TitleBoxComp text="Your Account" />
                    <ContentViewComp>
                        <View style={registerStyle.radioButtonContainer}>
                            <RadioButtonGroupComp
                                options={radioButtonOptions}
                                selectedValue={radioButtonValue}
                                onSelectionChange={setRadioButtonValue}
                            />
                            {errors.accountOptions && (
                                <InvalidTextComp text={errors.accountOptions} />
                            )}
                        </View>
                    </ContentViewComp>
                    <ContentViewComp>
                        <View>
                            <ButtonComp
                                text={
                                    currentStep < totalSteps
                                        ? "Next"
                                        : "Register"
                                }
                                disabled={loading}
                                onPress={handleNextStep}
                            />
                            <View style={registerStyle.loginContainer}>
                                <Text>
                                    Already have an account? Login{" "}
                                    <Text
                                        style={registerStyle.login}
                                        onPress={handleLoginPress}
                                    >
                                        here
                                    </Text>
                                </Text>
                            </View>
                            {loading && (
                                <ActivityIndicator
                                    size="large"
                                    color="#0000ff"
                                />
                            )}
                        </View>
                    </ContentViewComp>
                </View>
            )}
            {currentStep === 3 && (
                <View style={registerStyle.stepWrapper}>
                    <View style={registerStyle.touchableOpacityContainer}>
                        <TouchableOpacity onPress={() => openImagePicker()}>
                            <View style={registerStyle.imageContainer}>
                                <Image
                                    source={
                                        selectedImage
                                            ? { uri: selectedImage.uri }
                                            : require("../../data/images/anonymous-person.jpg")
                                    }
                                    style={registerStyle.image}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <ContentViewComp>
                        <View>
                            <LabelTextInputComp
                                label="First Name"
                                value={firstName}
                                onChangeText={(text) => setFirstName(text)}
                                placeholder="John"
                            />
                            {errors.firstName && (
                                <InvalidTextComp text={errors.firstName} />
                            )}
                        </View>
                        <View>
                            <LabelTextInputComp
                                label="Last Name"
                                value={lastName}
                                onChangeText={(text) => setLastName(text)}
                                placeholder="Doe"
                            />
                            {errors.lastName && (
                                <InvalidTextComp text={errors.lastName} />
                            )}
                        </View>
                        <View>
                            <LabelTextInputComp
                                label="Address:"
                                value={address}
                                onChangeText={(text) => setAddress(text)}
                                placeholder="homestreet 1 homecity"
                            />
                            {errors.address && (
                                <InvalidTextComp text={errors.address} />
                            )}
                        </View>
                        {predictions.length > 0 && (
                            <View>
                                {predictions.map((item, index) => (
                                    <AddressButtonComp
                                        key={index}
                                        text={item.description}
                                        onPress={() => handleSearch(item)}
                                    />
                                ))}
                            </View>
                        )}
                        {radioButtonValue === "Artist" && (
                            <View>
                                <LabelTextInputComp
                                    label="Description"
                                    value={description}
                                    onChangeText={(text) =>
                                        setDescription(text)
                                    }
                                    placeholder="Describe yourself"
                                    multiline
                                    numberOfLines={4}
                                />
                                {errors.description && (
                                    <InvalidTextComp
                                        text={errors.description}
                                    />
                                )}
                            </View>
                        )}
                        <View>
                            <LabelDatePickerComp
                                label={"Birthday: *"}
                                value={date}
                                onChange={handleDateChange}
                            />

                            {errors.date && (
                                <InvalidTextComp text={errors.date} />
                            )}
                        </View>
                        <ButtonComp
                            text={
                                currentStep < totalSteps ? "Next" : "Register"
                            }
                            disabled={loading}
                            onPress={handleNextStep}
                        />
                        <View style={registerStyle.loginContainer}>
                            <Text>
                                Already have an account? Login{" "}
                                <Text
                                    style={registerStyle.login}
                                    onPress={handleLoginPress}
                                >
                                    here
                                </Text>
                            </Text>
                        </View>
                        {loading && (
                            <ActivityIndicator size="large" color="#0000ff" />
                        )}
                        {errors.wrong && (
                            <InvalidTextComp text={errors.wrong} />
                        )}
                    </ContentViewComp>
                </View>
            )}
        </View>
    );
};

export default RegisterScreen;
