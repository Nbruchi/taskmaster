// app/_layout.tsx
import { UserProvider } from "@/lib/UserContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

export default function RootLayout() {
    const [loaded, error] = useFonts({
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    });

    const colorScheme = useColorScheme();

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    if (!loaded) {
        return null;
    }

    return (
        <UserProvider>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor:
                            colorScheme === "dark" ? "#1F2937" : "#FFFFFF",
                    },
                    headerTintColor:
                        colorScheme === "dark" ? "#FFFFFF" : "#000000",
                    contentStyle: {
                        backgroundColor:
                            colorScheme === "dark" ? "#111827" : "#F9FAFB",
                    },
                }}
            />
        </UserProvider>
    );
}
