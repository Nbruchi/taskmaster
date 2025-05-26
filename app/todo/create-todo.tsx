// app/create-todo.tsx
import { Button } from "@/components/cn/Button";
import { apiService } from "@/lib/api";
import { router } from "expo-router";
import React, { useState } from "react";
import { TextInput, useColorScheme, View } from "react-native";

export default function CreateTodoScreen() {
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const colorScheme = useColorScheme();

    const handleCreate = async () => {
        if (!title.trim()) return;

        try {
            setIsLoading(true);
            await apiService.createTodo({
                userId: 1,
                title: title.trim(),
                completed: false,
            });
            router.back();
        } catch (error) {
            console.error("Error creating todo:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View
            className={`flex-1 ${
                colorScheme === "dark" ? "bg-gray-900" : "bg-gray-50"
            }`}
        >
            <View className="p-4 space-y-4">
                <TextInput
                    className={`p-4 rounded-lg border ${
                        colorScheme === "dark"
                            ? "bg-gray-800 text-white border-gray-700"
                            : "bg-white text-black border-gray-300"
                    }`}
                    placeholder="Enter todo title"
                    placeholderTextColor={
                        colorScheme === "dark" ? "#9CA3AF" : "#6B7280"
                    }
                    value={title}
                    onChangeText={setTitle}
                />
                <Button
                    variant="default"
                    onPress={handleCreate}
                    disabled={isLoading || !title.trim()}
                >
                    {isLoading ? "Creating..." : "Create Todo"}
                </Button>
            </View>
        </View>
    );
}
