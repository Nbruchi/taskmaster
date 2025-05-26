import { apiService } from "@/lib/api";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    useColorScheme,
    FlatList,
    TouchableOpacity,
} from "react-native";

export default function UsersScreen() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const colorScheme = useColorScheme();

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const data = await apiService.getUsers();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUserPress = (user: User) => {
        router.push(`/user/${user.id}`);
    };

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-lg text-gray-500">Loading users...</Text>
            </View>
        );
    }

    return (
        <View
            className={`flex-1 ${
                colorScheme === "dark" ? "bg-gray-900" : "bg-gray-50"
            }`}
        >
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handleUserPress(item)}
                        className={`p-4 border-b ${
                            colorScheme === "dark"
                                ? "border-gray-800"
                                : "border-gray-200"
                        }`}
                    >
                        <Text
                            className={`text-lg font-medium ${
                                colorScheme === "dark"
                                    ? "text-white"
                                    : "text-black"
                            }`}
                        >
                            {item.name}
                        </Text>
                        <Text
                            className={`text-sm ${
                                colorScheme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-600"
                            }`}
                        >
                            {item.email}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
