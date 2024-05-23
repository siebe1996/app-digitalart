import React, { useContext, useState } from "react";
import { View, Text, Image } from "react-native";
import { profileStyle } from "./ProfileStyle";
import { AuthContext, useAuth } from "../../contexts/AuthContext";
import ButtonComp from "../../components/buttoncomp/ButtonComp";
import { SafeAreaView } from "react-native-safe-area-context";
import ContentViewComp from "../../components/contentviewcomp/ContentViewComp";

const ProfileScreen = () => {
    const { signOut } = useContext(AuthContext);
    const { state } = useAuth();
    const [user, setUser] = useState(state.user);

    const handleSignOut = async () => {
        signOut();
    };
    return (
        <View style={profileStyle.container}>
            <ContentViewComp>
                <ButtonComp onPress={handleSignOut} text="logout" />
                {user && (
                    <View>
                        <View style={profileStyle.center}>
                            <View style={profileStyle.imageContainer}>
                                <Image
                                    source={
                                        user.imageData
                                            ? {
                                                  uri:
                                                      "data:" +
                                                      user.mimeTypeImageData +
                                                      ";base64," +
                                                      user.imageData,
                                              }
                                            : require("../../data/images/anonymous-person.jpg")
                                    }
                                    style={profileStyle.image}
                                />
                            </View>
                        </View>
                        <Text>
                            Name: {user.firstName} {user.lastName}
                        </Text>
                        <Text>Email: {user.email}</Text>
                        {user.description && (
                            <Text>Description: {user.description}</Text>
                        )}
                        {/* Display other user data as needed */}
                    </View>
                )}
            </ContentViewComp>
        </View>
    );
};

export default ProfileScreen;
