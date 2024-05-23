import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

/*export const showAlertOffline = () => {
    Alert.alert(
        "You are offline",
        "If you are offline you're not able to edit and data present might not be accurate"
    );
};*/

/*export const convertImageToBase64 = async (imageUrl) => {
    try {
        const imageContent = await FileSystem.readAsStringAsync(imageUrl, {
            encoding: FileSystem.EncodingType.Base64,
        });

        return imageContent;
    } catch (error) {
        console.error(`Error fetching image ${imageUrl}: ${error.message}`);
        return null;
    }
};*/

/*export const convertBase64ToImageUri = async (base64String) => {
    const fileName = generateRandomFileName();
    const filePath = `${FileSystem.cacheDirectory}${fileName}`;

    try {
        await FileSystem.writeAsStringAsync(filePath, base64String, {
            encoding: FileSystem.EncodingType.Base64,
        });
        console.log("filePath", filePath);
        return filePath;
    } catch (error) {
        console.error("Error writing file:", error);
        return null;
    }
};*/

/*export const convertBase64ArrayToImageUris = async (base64Array) => {
    const imagePromises = base64Array.map((base64String) =>
        convertBase64ToImage(base64String.imageData)
    );
    return Promise.all(imagePromises);
};*/

export const returnResultImagePicker = () => {
    return new Promise(async (resolve, reject) => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
            console.log("Permission to access media library was denied");
            reject("Permission denied");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 5], // You can adjust the aspect ratio as needed.
            base64: true,
        });

        if (!result.canceled) {
            resolve(result.assets[0]);
        } else {
            reject("Image selection cancelled");
        }
    });
};
