// app/(tabs)/index.tsx
import { Button } from "@/components/cn/Button";
import { router } from "expo-router";
import React from "react";
import { Text, useColorScheme, View } from "react-native";

export default function HomeScreen() {
    const colorScheme = useColorScheme();

    return (
        <View
            className={`flex-1 ${
                colorScheme === "dark" ? "bg-gray-900" : "bg-gray-50"
            }`}
        >
            <View className="p-4 space-y-4">
                <Text
                    className={`text-2xl font-bold ${
                        colorScheme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                >
                    Welcome to TaskMaster
                </Text>
                <Text
                    className={`text-base ${
                        colorScheme === "dark"
                            ? "text-gray-300"
                            : "text-gray-600"
                    }`}
                >
                    Manage your tasks efficiently and stay organized
                </Text>
                <Button variant="default" onPress={() => router.push("/todos")}>
                    View My Todos
                </Button>
            </View>
        </View>
    );
}
