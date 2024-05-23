import React, { useState } from "react";
import { View, Text } from "react-native";
import { welcomeStyle } from "./WelcomeStyle";
import ButtonComp from "../../components/buttoncomp/ButtonComp";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import TitleTextComp from "../../components/titletextcomp/TitleTextComp";
import TitleComp from "../../components/titlecomp/TitleComp";
import { SafeAreaView } from "react-native-safe-area-context";
import ContentViewComp from "../../components/contentviewcomp/ContentViewComp";

const WelcomeScreen = () => {
    const { priorLogin } = React.useContext(AuthContext);
    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = 5; // Total number of steps in the welcome process
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const handleNextStep = async () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setLoading(true);
            let welcomeSuccess = true;
            try {
                // If it's the last step, navigate to the main screen
                welcomeSuccess = await priorLogin();
            } catch (e) {
                console.log("Something went wrong in welcome:", e);
            }

            if (welcomeSuccess) {
                setLoading(false);
                console.log("Welcome successful");
            } else {
                console.error("Welcome failed");
            }
        }
    };

    return (
        <View style={welcomeStyle.container}>
            <ContentViewComp>
                <View style={welcomeStyle.content}>
                    {currentStep === 0 && (
                        <TitleTextComp
                            title="Welcome to ArtSy(nc)"
                            text="ArtSy(nc) is your gateway to the vibrant world of local art and creativity. 
                        Discover, share, and connect with nearby exhibitions, galleries, and talented artists. 
                        Whether you're an art enthusiast, an aspiring creator, or a museum curator, 
                        ArtSy(nc) provides the platform to explore and engage with your city's cultural heartbeat."
                        />
                    )}
                    {currentStep === 1 && (
                        <TitleTextComp
                            title="Art Lovers"
                            text="Art Lovers on ArtSy(nc) can immerse themselves in their city's art scene like never before. 
                        Explore nearby exhibitions, galleries, and public installations on an interactive map. 
                        Like and save favorite artworks to your profile, and connect with fellow art enthusiasts for a truly enriching experience."
                        />
                    )}
                    {currentStep === 2 && (
                        <TitleTextComp
                            title="Artist"
                            text="Artists on ArtSy(nc) have a stage to showcase their talent to a wider audience. 
                        Upload your artwork and gain visibility within the community, while connecting with fellow artists and art enthusiasts. 
                        It's your platform to share your creativity and engage with a supportive community."
                        />
                    )}
                    {currentStep === 3 && (
                        <TitleTextComp
                            title="Art Connector"
                            text="Art Connectors on ArtSy(nc) can expand their collections and curate unique exhibitions by connecting with local artists. 
                        Feature diverse artworks and enhance exhibitions with personalized projectors. 
                        It's your platform to foster creativity, engage with artists, and enrich your art connections"
                        />
                    )}
                    {currentStep === 4 && (
                        <TitleComp text="Embark on this creative journey with us." />
                    )}
                </View>
                <View style={welcomeStyle.buttonContainer}>
                    <ButtonComp
                        text={
                            currentStep > totalSteps - 2
                                ? "Get started"
                                : "Next"
                        }
                        onPress={handleNextStep}
                    />
                </View>
                <View style={welcomeStyle.stepIndicatorContainer}>
                    {Array.from({ length: totalSteps }, (_, index) => (
                        <View
                            key={index}
                            style={[
                                welcomeStyle.stepIndicator,
                                index === currentStep
                                    ? welcomeStyle.currentStep
                                    : null,
                            ]}
                        />
                    ))}
                </View>
            </ContentViewComp>
        </View>
    );
};

export default WelcomeScreen;
