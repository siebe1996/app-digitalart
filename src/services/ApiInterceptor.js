import axios from "axios";
import CookieManager from "react-native-cookies";
import {
    getSecureItemAsync,
    setSecureItemAsync,
    removeSecureItemAsync,
} from "./LocalStorageService";
import { BACKEND_API } from "../constants";

const api = axios.create({
    baseURL: BACKEND_API, // Replace with your API base URL
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers["Authorization"] =
                            "Bearer " + token;
                        return api(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            return new Promise((resolve, reject) => {
                CookieManager.get(BACKEND_API)
                    .then((cookies) => {
                        const refreshToken =
                            cookies["Backend_DigitalArt.RefreshToken"].value;
                        return api.post(
                            "/users/renew-token",
                            {},
                            {
                                headers: {
                                    RefreshToken: refreshToken,
                                },
                                withCredentials: true,
                            }
                        );
                    })
                    .then(({ data }) => {
                        setSecureItemAsync("userToken", data.jwtToken);
                        api.defaults.headers.common["Authorization"] =
                            "Bearer " + data.jwtToken;
                        originalRequest.headers["Authorization"] =
                            "Bearer " + data.jwtToken;
                        processQueue(null, data.jwtToken);
                        resolve(api(originalRequest));
                    })
                    .catch((err) => {
                        processQueue(err, null);
                        reject(err);
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            });
        }

        return Promise.reject(error);
    }
);

export default api;
