import React, { useState, useCallback } from "react";
import { View, Text, Dimensions, Animated } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { homeStyle } from "./HomeStyle";
import { PanGestureHandler } from "react-native-gesture-handler";
import { fetchArtpiecesUnrated, postLike } from "../../services/ApiService";
import ArtCardComp from "../../components/artcardcomp/ArtCardComp";
import { useAuth } from "../../contexts/AuthContext";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import ScreenWrapperComp from "../../components/screenwrappercomp/ScreenWrapperComp";
import ContentViewComp from "../../components/contentviewcomp/ContentViewComp";

const HomeScreen = () => {
    const { state } = useAuth();
    const insets = useSafeAreaInsets();
    const [artpieces, setArtpieces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const translateX = new Animated.Value(0);
    const translateY = new Animated.Value(0);
    const windowHeight = Dimensions.get("window").height;
    const y = new Animated.Value(0);

    useFocusEffect(
        useCallback(() => {
            getArtpiecesUnrated();
        }, [])
    );

    const getArtpiecesUnrated = async () => {
        try {
            const artpiecesFetched = await fetchArtpiecesUnrated(
                state.userToken
            );
            setArtpieces(artpiecesFetched);
            setLoading(false);
        } catch (error) {
            console.error("Error: " + error.message);
            setLoading(false);
        }
    };

    const reset = Animated.parallel([
        Animated.timing(translateX, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }),
        Animated.timing(translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }),
    ]);

    const TopOrBottom = y.interpolate({
        inputRange: [0, windowHeight / 2 - 1, windowHeight / 2],
        outputRange: [1, 1, -1],
        extrapolate: "clamp",
    });
    const rotate = Animated.multiply(translateX, TopOrBottom).interpolate({
        inputRange: [-500, 500],
        outputRange: [`-30deg`, `30deg`],
        extrapolate: "clamp",
    });

    const handlePan = Animated.event(
        [
            {
                nativeEvent: {
                    translationX: translateX,
                    translationY: translateY,
                    y,
                },
            },
        ],
        { useNativeDriver: true }
    );

    const handlePanStateChange = ({ nativeEvent }) => {
        const { state, translationX } = nativeEvent;
        if (state === 5) {
            //When the user takes their finger off the screen
            if (translationX > 185) {
                console.log("Swiped Right");
                rate(true, artpieces[currentIndex]);
                if (currentIndex < artpieces.length) {
                    setCurrentIndex(currentIndex + 1);
                }
            } else if (translationX < -185) {
                console.log("Swiped Left");
                rate(false, artpieces[currentIndex]);
                if (currentIndex < artpieces.length) {
                    setCurrentIndex(currentIndex + 1);
                }
            } else reset.start();
        }
    };

    const rate = async (liked, artpiece) => {
        const likeData = {
            artpieceId: artpiece.id,
            liked: liked,
        };
        const jsonData = JSON.stringify(likeData);
        let success = true;
        try {
            success = await postLike(state.userToken, jsonData);
        } catch (error) {
            console.error("Error posting like:", error);
        }
        if (success) {
            setLoading(false);
            console.log("like successful");
        } else {
            console.error("like failed");
        }
    };

    if (loading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={homeStyle.container}>
            {artpieces &&
            artpieces.length > 0 &&
            currentIndex < artpieces.length ? (
                <View style={homeStyle.cardContainer}>
                    {currentIndex < artpieces.length - 1 ? (
                        <View style={homeStyle.card}>
                            <ArtCardComp item={artpieces[currentIndex + 1]} />
                        </View>
                    ) : (
                        <Text style={{ color: "white" }}>
                            No data available
                        </Text>
                    )}
                    <PanGestureHandler
                        onHandlerStateChange={handlePanStateChange}
                        onGestureEvent={handlePan}
                    >
                        <Animated.View
                            style={[
                                {
                                    transform: [
                                        { translateX },
                                        { translateY },
                                        { rotate },
                                    ],
                                },
                            ]}
                        >
                            <ArtCardComp item={artpieces[currentIndex]} />
                        </Animated.View>
                    </PanGestureHandler>
                </View>
            ) : (
                <Text style={{ color: "white" }}>No data available</Text>
            )}
        </View>
    );
};

export default HomeScreen;
