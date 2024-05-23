import axios from "axios";
//import api from "./ApiInterceptor";
import { BACKEND_API } from "../constants";

const api = axios.create({
    baseURL: BACKEND_API,
});

//USER

export const postUser = async (data) => {
    try {
        const response = await api.post("users", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/users/authenticate", {
            email: email,
            password: password,
        });
        console.log("response.data", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//ARTIST

export const postArtist = async (data) => {
    try {
        const response = await api.post("artists", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//ARTPIECES

export const postArtpiece = async (userToken, data) => {
    try {
        const response = await api.post("/artpieces", data, {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//ARTPIECES/UNRATED

export const fetchArtpiecesUnrated = async (userToken) => {
    try {
        const response = await api.get(`/artpieces/unrated`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchArtpiecesUnratedByCategories = async (
    userToken,
    categoryIds
) => {
    try {
        const params = new URLSearchParams();
        categoryIds.forEach((id) => params.append("categoryIds", id));
        const response = await api.get(
            `/artpieces/unrated/search?${params.toString()}`,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

//ARTPIECES/RATED

export const fetchArtpiecesRatedLiked = async (userToken) => {
    try {
        const response = await api.get(`/artpieces/rated/liked`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchArtpiecesRatedLikedBySearch = async (
    userToken,
    artistNames
) => {
    try {
        const response = await api.get(
            `/artpieces/rated/liked/search?artistNames=${encodeURIComponent(
                artistNames
            )}`,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

//ROLES

export const fetchRoles = async () => {
    try {
        const response = await api.get("/roles");
        return response.data;
    } catch (error) {
        throw error;
    }
};

//CATEGORIES

export const fetchCategories = async (userToken) => {
    try {
        const response = await api.get("/categories", {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//PLACES

export const fetchPlaces = async (userToken) => {
    try {
        const response = await api.get("/places", {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//PLACES/EXPOSITIONS/ACTIVE

export const fetchPlacesActiveExpositions = async (userToken) => {
    try {
        const response = await api.get("/places/expositions/active", {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//LIKES

export const postLike = async (userToken, data) => {
    try {
        const response = await api.post("/likes", data, {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//GOOGLE API

export const fetchPredictions = async (address) => {
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&key=${process.env.EXPO_PUBLIC_MAPS_API_KEY}`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchAddressInfo = async (address) => {
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.EXPO_PUBLIC_MAPS_API_KEY}`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
