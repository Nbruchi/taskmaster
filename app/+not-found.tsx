import { Link, Stack } from "expo-router";
import React from "react";
import { Text, View, useColorScheme } from "react-native";

export default function NotFoundScreen() {
    const colorScheme = useColorScheme();

    return (
        <>
            <Stack.Screen options={{ title: "Oops!" }} />
            <View
                className={`flex-1 items-center justify-center p-5 ${
                    colorScheme === "dark" ? "bg-gray-900" : "bg-gray-50"
                }`}
            >
                <Text
                    className={`text-xl font-semibold mb-4 ${
                        colorScheme === "dark" ? "text-white" : "text-black"
                    }`}
                >
                    This screen does not exist.
                </Text>
                <Link href="/" className="mt-4">
                    <Text
                        className={`text-lg ${
                            colorScheme === "dark"
                                ? "text-purple-400"
                                : "text-purple-600"
                        }`}
                    >
                        Go to home screen!
                    </Text>
                </Link>
            </View>
        </>
    );
}
