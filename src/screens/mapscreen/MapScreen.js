import React, { useState, useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { mapStyle } from "./MapStyle";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import {
    fetchPlaces,
    fetchPlacesActiveExpositions,
} from "../../services/ApiService";
import { useAuth } from "../../contexts/AuthContext";

const MapScreen = () => {
    const { state } = useAuth();
    const [region, setRegion] = useState({
        latitude: 51.0543,
        longitude: 3.7174,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLocationAndCity();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getPlaces();
        }, [region])
    );

    useFocusEffect(
        useCallback(() => {
            getPlaces();
        }, [])
    );

    const fetchLocationAndCity = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                throw new Error("Permission to access location was denied");
            }

            const location = await Location.getCurrentPositionAsync({});
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 51.2093,
                longitudeDelta: 3.2247,
            });

            setLoading(false);
        } catch (error) {
            console.error("Error: " + error.message);
            setLoading(false);
        }
    };

    const getPlaces = async () => {
        setPlaces([]);
        try {
            const places = await fetchPlacesActiveExpositions(state.userToken);
            setPlaces(places);
        } catch (error) {
            console.error("Error fetching places: " + error.message);
        }
    };

    if (loading) {
        return (
            <View style={mapStyle.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={mapStyle.container}>
            <MapView
                style={mapStyle.map}
                initialRegion={region}
                showsUserLocation={true}
            >
                {places &&
                    places.map((place) => (
                        <Marker
                            key={place.id}
                            coordinate={{
                                latitude: place.latitude,
                                longitude: place.longitude,
                            }}
                            title={place.address}
                        />
                    ))}
            </MapView>
        </View>
    );
};

export default MapScreen;
