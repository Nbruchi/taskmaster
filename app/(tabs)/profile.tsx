// app/(tabs)/profile.tsx
import { Card } from "@/components/cn/Card";
import { Spinner } from "@/components/ui/spinner";
import { useUser } from "@/lib/UserContext";
import React from "react";
import {
    Pressable,
    ScrollView,
    Text,
    useColorScheme,
    View,
} from "react-native";

export default function ProfileScreen() {
    const colorScheme = useColorScheme();
    const { currentUser, users, isLoading, setCurrentUser } = useUser();

    if (isLoading) {
        return <Spinner />;
    }

    if (!currentUser) {
        return (
            <View className="flex-1 items-center justify-center p-4">
                <Text className="text-lg text-gray-500">No user selected</Text>
            </View>
        );
    }

    return (
        <ScrollView
            className={`flex-1 ${
                colorScheme === "dark" ? "bg-gray-900" : "bg-gray-50"
            }`}
        >
            <View className="p-4 space-y-6">
                {/* Current User Profile */}
                <Card variant="elevated" className="p-6">
                    <Text
                        className={`text-2xl font-bold mb-4 ${
                            colorScheme === "dark"
                                ? "text-white"
                                : "text-gray-900"
                        }`}
                    >
                        Current Profile
                    </Text>
                    <View className="space-y-2">
                        <Text
                            className={`text-lg ${
                                colorScheme === "dark"
                                    ? "text-gray-300"
                                    : "text-gray-700"
                            }`}
                        >
                            Name: {currentUser.name}
                        </Text>
                        <Text
                            className={`text-lg ${
                                colorScheme === "dark"
                                    ? "text-gray-300"
                                    : "text-gray-700"
                            }`}
                        >
                            Username: {currentUser.username}
                        </Text>
                        <Text
                            className={`text-lg ${
                                colorScheme === "dark"
                                    ? "text-gray-300"
                                    : "text-gray-700"
                            }`}
                        >
                            Email: {currentUser.email}
                        </Text>
                    </View>
                </Card>

                {/* Switch User Section */}
                <View>
                    <Text
                        className={`text-xl font-semibold mb-4 ${
                            colorScheme === "dark"
                                ? "text-white"
                                : "text-gray-900"
                        }`}
                    >
                        Switch User
                    </Text>
                    <View className="space-y-2">
                        {users.map((user: User) => (
                            <Pressable
                                key={user.id}
                                onPress={() => setCurrentUser(user)}
                                className={`p-4 rounded-lg ${
                                    currentUser.id === user.id
                                        ? colorScheme === "dark"
                                            ? "bg-purple-900"
                                            : "bg-purple-100"
                                        : colorScheme === "dark"
                                        ? "bg-gray-800"
                                        : "bg-white"
                                }`}
                            >
                                <Text
                                    className={`text-lg font-medium ${
                                        colorScheme === "dark"
                                            ? "text-white"
                                            : "text-gray-900"
                                    }`}
                                >
                                    {user.name}
                                </Text>
                                <Text
                                    className={`text-sm ${
                                        colorScheme === "dark"
                                            ? "text-gray-400"
                                            : "text-gray-600"
                                    }`}
                                >
                                    {user.email}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
