// AuthContext.js
import React, {
    createContext,
    useContext,
    useReducer,
    useEffect,
    useMemo,
} from "react";
import {
    setSecureItemAsync,
    getSecureItemAsync,
    removeSecureItemAsync,
    setDocumentItemAsync,
    getDocumentItemAsync,
    removeDocumentItemAsync,
    setCacheItemAsync,
    getCacheItemAsync,
    removeCacheItemAsync,
} from "../services/LocalStorageService";
import { loginUser, postUser, postArtist } from "../services/ApiService";
import { convertBase64ToImageUri } from "../services/HelperFunctions";
import axios from "axios";
import { BACKEND_API } from "../constants";
//import { convertBase64ToImage } from "../services/HelperFunctions";

export const AuthContext = createContext();

const api = axios.create({
    baseURL: BACKEND_API,
});

function authReducer(state, action) {
    switch (action.type) {
        case "RESTORE_TOKEN":
            return {
                ...state,
                userToken: action.token,
                //refreshToken: action.refreshToken,
                priorLogin: action.priorLogin,
                //priorLogin: false,
                isLoading: false,
                user: action.user,
            };
        case "SIGN_IN":
            return {
                ...state,
                isSignout: false,
                userToken: action.token,
                //refreshToken: action.refreshToken,
                user: action.user,
            };
        case "SIGN_OUT":
            return {
                ...state,
                isSignout: true,
                userToken: null,
                //refreshToken: null,
                user: null,
            };
        case "FIRST_LOGIN_COMPLETE":
            return {
                ...state,
                priorLogin: true,
            };
        case "FIRST_LOGIN_INCOMPLETE":
            return {
                ...state,
                priorLogin: false,
            };
        default:
            return state;
    }
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        isLoading: true,
        isSignout: false,
        userToken: null,
        //refreshToken: null,
        priorLogin: false,
        user: null,
    });

    useEffect(() => {
        // Retrieve the userToken from local storage when the component mounts
        const bootstrapAsync = async () => {
            let userToken = null;
            //let refreshToken = null;
            let priorLogin = false;
            let user = null;
            try {
                userToken = await getSecureItemAsync("userToken");
                //refreshToken = await getSecureItemAsync("refreshToken");
                priorLogin =
                    (await getSecureItemAsync("priorLogin")) === "true";
                user = JSON.parse((await getDocumentItemAsync("user")) || "{}");
            } catch (e) {
                // Restoring token failed
                console.log(
                    "restoring token failed, something went wrong in context"
                );
            }

            // Dispatch the token to restore the state
            dispatch({
                type: "RESTORE_TOKEN",
                token: userToken,
                //refreshToken: refreshToken,
                priorLogin: priorLogin,
                user: user,
            });
        };

        bootstrapAsync();
    }, []); // The empty dependency array ensures this effect runs once on component mount

    const authContext = {
        signIn: async (email, password) => {
            try {
                let user = await loginUser(email, password);
                const token = user.jwtToken;
                /*const refreshToken = Cookies.get(
                    "Backend_DigitalArt.RefreshToken"
                );*/
                delete user.jwtToken;
                /*if (!refreshToken) {
                    console.error("Refresh token not found in cookies");
                    return false;
                }*/
                await setSecureItemAsync("userToken", token);
                //await setSecureItemAsync("refreshToken", refreshToken);
                await setDocumentItemAsync("user", JSON.stringify(user));
                dispatch({
                    type: "SIGN_IN",
                    token: token,
                    //refreshToken: refreshToken,
                    user: user,
                });
                return true;
            } catch (error) {
                // Handle authentication errors
                console.error("Authentication failed:", error);
                return false;
                // You can show an error message to the user if needed.
            }
        },
        signOut: async () => {
            await removeDocumentItemAsync("user");
            await removeSecureItemAsync("userToken");
            //await removeSecureItemAsync("refreshToken");
            dispatch({ type: "SIGN_OUT" });
        },
        signUp: async (data) => {
            try {
                let regUser = undefined;
                let dataObj = JSON.parse(data);
                if (dataObj.role == "Artist") {
                    regUser = await postArtist(data);
                } else {
                    regUser = await postUser(data);
                }
                const objUserData = JSON.parse(data);
                console.log(
                    "Logging in with email:",
                    objUserData.email,
                    "and password:",
                    objUserData.password
                );
                console.log("reguser.email", regUser.email);
                if (regUser && regUser.email) {
                    const user = await loginUser(
                        objUserData.email,
                        objUserData.password
                    );
                    /*const refreshToken = Cookies.get(
                        "Backend_DigitalArt.RefreshToken"
                    );*/
                    const token = user.jwtToken;
                    delete user.jwtToken;
                    await setDocumentItemAsync("user", JSON.stringify(user));
                    await setSecureItemAsync("userToken", token);
                    //await setSecureItemAsync("refreshToken", refreshToken);
                    dispatch({
                        type: "SIGN_IN",
                        token: token,
                        //refreshToken: refreshToken,
                        user: user,
                    });
                    return true;
                } else {
                    // If user data is not present in the response, handle the error
                    console.error(
                        "Authentication failed: User data not received in response"
                    );
                    // Return false to indicate login failure
                    return false;
                }
            } catch (error) {
                // Handle authentication errors
                console.error("Authentication failed:", error);
                return false;
                // You can show an error message to the user if needed.
            }
        },
        priorLogin: async () => {
            try {
                await setSecureItemAsync("priorLogin", "true");
                dispatch({ type: "FIRST_LOGIN_COMPLETE" });
                return true;
            } catch (error) {
                console.error("priorLogin failed:", error);
                return false;
            }
        },
    };

    const providerValue = useMemo(() => ({ state, ...authContext }), [state]);

    return (
        <AuthContext.Provider value={providerValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
