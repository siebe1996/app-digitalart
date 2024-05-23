import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { artCardStyle } from "./ArtCardStyle";
import { Ionicons } from "@expo/vector-icons";

const ArtCardComp = ({ item }) => {
    const [infoVisible, setInfoVisible] = useState(false);

    return (
        <View style={artCardStyle.card}>
            <View>
                <Image
                    source={{
                        uri:
                            "data:" +
                            item.mimeTypeImageData +
                            ";base64," +
                            item.imageData,
                    }}
                    style={artCardStyle.image}
                />
            </View>
            <TouchableOpacity
                style={artCardStyle.infoIcon}
                onPress={() => setInfoVisible(!infoVisible)}
            >
                {infoVisible ? (
                    <Ionicons
                        name="close-circle-outline"
                        size={30}
                        color="white"
                    />
                ) : (
                    <Ionicons
                        name="information-circle-outline"
                        size={30}
                        color="white"
                    />
                )}
            </TouchableOpacity>

            {infoVisible && (
                <View style={artCardStyle.infoContainer}>
                    <Text style={artCardStyle.title}>{item.title}</Text>
                    <Text style={artCardStyle.artist}>
                        {item.artist.firstName} {item.artist.lastName}
                    </Text>
                    <Text style={artCardStyle.description}>
                        {item.description}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default ArtCardComp;
