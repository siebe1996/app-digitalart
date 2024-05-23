import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { uploadArtStyle } from "./UploadArtStyle";
import InvalidTextComp from "../../components/invalidtextcomp/InvalidTextComp";
import { returnResultImagePicker } from "../../services/HelperFunctions";
import { useAuth } from "../../contexts/AuthContext";
import { postArtpiece } from "../../services/ApiService";
import ButtonComp from "../../components/buttoncomp/ButtonComp";
import LabelTextInputComp from "../../components/labeltextinputcomp/LabelTextInputComp";
import { fetchCategories } from "../../services/ApiService";
import CheckableListComp from "../../components/checkablelistcomp/CheckableListComp";
import { SafeAreaView } from "react-native-safe-area-context";
import ContentViewComp from "../../components/contentviewcomp/ContentViewComp";
import SelectComp from "../../components/selectcomp/SelectComp";
import { ScrollView } from "react-native-gesture-handler";

const UploadArtScreen = () => {
    const { state } = useAuth();
    const navigation = useNavigation();
    const [errors, setErrors] = useState({});
    const [selectedImage, setSelectedImage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    useFocusEffect(
        useCallback(() => {
            const resetState = () => {
                setSelectedImage("");
                setTitle("");
                setDescription("");
                setErrors({});
                setSelectedCategoryIds([]);
                setSelectedCategories([]);
            };

            resetState();
        }, [])
    );

    const getCategories = async () => {
        try {
            const response = await fetchCategories(state.userToken);
            console.log("categories:", response);
            const formattedOptions = response.map((item) => ({
                value: item.id,
                label: item.name,
            }));
            setCategories(formattedOptions);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    /*const handleSelectItem = (id) => {
        const newSet = new Set(selectedCategoryIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedCategoryIds(newSet);
        console.log("selectedCategoryIds", selectedCategoryIds);
    };*/

    const handleSelectItem = (items) => {
        const selectedValues = items ? items.map((item) => item.value) : [];
        setSelectedCategoryIds(selectedValues);
        console.log("selectedCategoryIds", selectedValues);
        setSelectedCategories(items);
        console.log("selectedCategories", items);
    };

    const openImagePicker = async () => {
        try {
            const result = await returnResultImagePicker();
            console.log(result);
            setSelectedImage(result);
        } catch (error) {
            console.error(error);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!selectedImage) {
            newErrors.selectedImage = "An artpiece is required";
        }

        if (!title.trim()) {
            newErrors.title = "A title is required";
        }

        if (!description.trim()) {
            newErrors.description = "A Description is required";
        }

        if (selectedCategoryIds.size < 1) {
            newErrors.categories = "At least one category must be selected";
        }

        return newErrors;
    };

    const save = async () => {
        setLoading(true);
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            const artpieceData = {
                imageData: selectedImage.base64,
                mimeTypeImageData: selectedImage.mimeType,
                title: title,
                description: description,
                categoryIds: selectedCategoryIds,
                //toDo fix error where categories r empty in json
            };
            const jsonArtpieceData = JSON.stringify(artpieceData);
            let saveSuccess = true;
            try {
                console.log("jsonArtpieceData", jsonArtpieceData);
                saveSuccess = await postArtpiece(
                    state.userToken,
                    jsonArtpieceData
                );
            } catch (error) {
                console.error("Error posting artpiece:", error);
            }
            if (saveSuccess) {
                setLoading(false);
                console.log("save successful");
                navigation.navigate("Home");
            } else {
                console.error("save failed");
            }
        } else {
            setErrors(validationErrors);
        }
        setLoading(false);
    };

    return (
        <ScrollView style={uploadArtStyle.container}>
            <ContentViewComp>
                <View>
                    {selectedImage ? (
                        <View style={uploadArtStyle.touchableOpacityContainer}>
                            <TouchableOpacity onPress={() => openImagePicker()}>
                                <View style={uploadArtStyle.imageContainer}>
                                    <Image
                                        source={{
                                            uri: selectedImage.uri,
                                        }}
                                        style={uploadArtStyle.image}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <ButtonComp
                            onPress={() => openImagePicker()}
                            text="upload artpiece"
                        />
                    )}
                    {errors.imageData && (
                        <InvalidTextComp text={errors.imageData} />
                    )}
                </View>
                <View>
                    <LabelTextInputComp
                        label="Title: *"
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                        placeholder="Title"
                    />
                    {errors.title && <InvalidTextComp text={errors.title} />}
                </View>
                <View>
                    <LabelTextInputComp
                        label="Description: *"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        placeholder="write something about the artpiece"
                    />
                    {errors.description && (
                        <InvalidTextComp text={errors.description} />
                    )}
                </View>
                <SelectComp
                    label={"Select Categories: *"}
                    options={categories}
                    selectedValues={selectedCategories}
                    onChange={handleSelectItem}
                />
                {/*<View style={uploadArtStyle.checkableList}>
                    <CheckableListComp
                        items={categories}
                        selectedIds={selectedCategoryIds}
                        onSelectItem={handleSelectItem}
                    />
                    {errors.categories && (
                        <InvalidTextComp text={errors.categories} />
                    )}
                </View>*/}
                <ButtonComp onPress={save} text="Save" disabled={loading} />
                {loading && <ActivityIndicator size="large" color="#0000ff" />}
            </ContentViewComp>
        </ScrollView>
    );
};

export default UploadArtScreen;
