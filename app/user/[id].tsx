import { apiService } from "@/lib/api";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Text,
    TouchableOpacity,
    View,
    useColorScheme,
} from "react-native";

export default function UserProfileScreen() {
    const { id } = useLocalSearchParams();
    const [user, setUser] = useState<User | null>(null);
    const [userTodos, setUserTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const colorScheme = useColorScheme();

    const fetchUserData = async () => {
        try {
            setIsLoading(true);
            const [userData, todosData] = await Promise.all([
                apiService.getUserById(Number(id)),
                apiService.getUserTodos(Number(id)),
            ]);
            setUser(userData);
            setUserTodos(todosData);
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleTodoPress = (todo: Todo) => {
        router.push(`/todo/${todo.id}`);
    };

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-lg text-gray-500">
                    Loading profile...
                </Text>
            </View>
        );
    }

    if (!user) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-lg text-gray-500">User not found</Text>
            </View>
        );
    }

    return (
        <View
            className={`flex-1 ${
                colorScheme === "dark" ? "bg-gray-900" : "bg-gray-50"
            }`}
        >
            <View className="p-4 space-y-4">
                <Text
                    className={`text-2xl font-bold ${
                        colorScheme === "dark" ? "text-white" : "text-black"
                    }`}
                >
                    {user.name}
                </Text>
                <Text
                    className={`text-lg ${
                        colorScheme === "dark"
                            ? "text-gray-300"
                            : "text-gray-700"
                    }`}
                >
                    {user.email}
                </Text>
                <Text
                    className={`text-lg ${
                        colorScheme === "dark"
                            ? "text-gray-300"
                            : "text-gray-700"
                    }`}
                >
                    Username: {user.username}
                </Text>

                <Text
                    className={`text-xl font-semibold mt-4 ${
                        colorScheme === "dark" ? "text-white" : "text-black"
                    }`}
                >
                    Tasks
                </Text>
                <FlatList
                    data={userTodos}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ gap: 16 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleTodoPress(item)}
                            className={`p-4 rounded-lg border ${
                                colorScheme === "dark"
                                    ? "bg-gray-800 border-gray-700"
                                    : "bg-white border-gray-200"
                            }`}
                        >
                            <Text
                                className={`text-lg ${
                                    colorScheme === "dark"
                                        ? "text-white"
                                        : "text-black"
                                }`}
                            >
                                {item.title}
                            </Text>
                            <Text
                                className={`text-sm ${
                                    colorScheme === "dark"
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                }`}
                            >
                                Status:{" "}
                                {item.completed ? "Completed" : "Pending"}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}
