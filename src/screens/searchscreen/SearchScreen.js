import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ArtCardComp from "../../components/artcardcomp/ArtCardComp";
import { useAuth } from "../../contexts/AuthContext";
import {
    fetchArtpiecesRatedLiked,
    fetchArtpiecesRatedLikedBySearch,
} from "../../services/ApiService";
import { searchStyle } from "./SearchStyle";
import ContentViewComp from "../../components/contentviewcomp/ContentViewComp";

const SearchScreen = () => {
    const { state } = useAuth();
    const [artpieces, setArtpieces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const artpiecesFetched = await fetchArtpiecesRatedLiked(
                        state.userToken
                    );
                    setArtpieces(artpiecesFetched);
                } catch (error) {
                    console.error("Error: " + error.message);
                }
                setLoading(false);
            };
            fetchData();
        }, [state.userToken])
    );

    const handleSearch = async () => {
        setLoading(true);
        try {
            let results = [];
            if (!searchQuery.trim()) {
                results = await fetchArtpiecesRatedLiked(state.userToken);
            } else {
                results = await fetchArtpiecesRatedLikedBySearch(
                    state.userToken,
                    searchQuery
                );
            }
            setArtpieces(results);
        } catch (error) {
            console.error("Search error: " + error.message);
        }
        setLoading(false);
    };

    const onSearchInputChange = (text) => {
        setSearchQuery(text);
    };

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={searchStyle.container}>
            <ContentViewComp>
                <TextInput
                    style={searchStyle.searchBar}
                    placeholder="Search Artist..."
                    value={searchQuery}
                    onChangeText={onSearchInputChange}
                    onSubmitEditing={handleSearch}
                    returnKeyType="search"
                />
                <Text style={searchStyle.title}>Your Favorites</Text>
                {artpieces && artpieces.length > 0 ? (
                    <FlatList
                        data={artpieces}
                        renderItem={({ item }) => (
                            <View style={searchStyle.item}>
                                <View style={searchStyle.cardContainer}>
                                    <ArtCardComp item={item} />
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        columnWrapperStyle={searchStyle.columnWrapper}
                    />
                ) : (
                    <Text style={searchStyle.noData}>No data available</Text>
                )}
            </ContentViewComp>
        </View>
    );
};

export default SearchScreen;
