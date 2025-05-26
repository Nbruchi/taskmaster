// app/todo/[id].tsx
import { Button } from "@/components/cn/Button";
import { Spinner } from "@/components/ui/spinner";
import { apiService } from "@/lib/api";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TextInput, useColorScheme, View } from "react-native";

export default function TodoDetailsScreen() {
    const { id } = useLocalSearchParams();
    const [todo, setTodo] = useState<Todo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const colorScheme = useColorScheme();

    useEffect(() => {
        fetchTodo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchTodo = async () => {
        try {
            setIsLoading(true);
            const data = await apiService.getTodoById(Number(id));
            setTodo(data);
            setEditedTitle(data.title);
        } catch (error) {
            console.error("Error fetching todo:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async () => {
        if (!todo || !editedTitle.trim()) return;

        try {
            setIsLoading(true);
            const updatedTodo = await apiService.updateTodo(todo.id, {
                title: editedTitle.trim(),
                completed: todo.completed, // Preserve the completion status
            });
            setTodo(updatedTodo);
            setIsEditing(false);
            router.back(); // Navigate back after successful update
        } catch (error) {
            console.error("Error updating todo:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!todo) return;

        try {
            setIsLoading(true);
            await apiService.deleteTodo(todo.id);
            router.back();
        } catch (error) {
            console.error("Error deleting todo:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (!todo) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-lg text-gray-500">Todo not found</Text>
            </View>
        );
    }

    return (
        <View
            className={`flex-1 w-full p-10 ${
                colorScheme === "dark" ? "bg-gray-900" : "bg-gray-50"
            }`}
        >
            <View className="p-4 space-y-4">
                {isEditing ? (
                    <TextInput
                        className={`p-4 rounded-lg border ${
                            colorScheme === "dark"
                                ? "bg-gray-800 text-white border-gray-700"
                                : "bg-white text-black border-gray-300"
                        }`}
                        value={editedTitle}
                        onChangeText={setEditedTitle}
                    />
                ) : (
                    <Text
                        className={`text-xl font-medium ${
                            colorScheme === "dark" ? "text-white" : "text-black"
                        }`}
                    >
                        {todo.title}
                    </Text>
                )}
                <Text
                    className={`text-sm ${
                        colorScheme === "dark"
                            ? "text-gray-400"
                            : "text-gray-600"
                    }`}
                >
                    Status: {todo.completed ? "Completed" : "Pending"}
                </Text>
                <View className="flex flex-row items-center gap-4 mt-4 justify-center w-full">
                    {isEditing ? (
                        <>
                            <Button
                                variant="default"
                                onPress={handleUpdate}
                                disabled={isLoading}
                                className="w-1/2"
                            >
                                Save
                            </Button>
                            <Button
                                variant="secondary"
                                onPress={() => {
                                    setIsEditing(false);
                                    setEditedTitle(todo.title);
                                }}
                                className="w-1/2"
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="secondary"
                                onPress={() => setIsEditing(true)}
                                className="w-1/2"
                            >
                                Edit
                            </Button>
                            <Button
                                variant="destructive"
                                onPress={handleDelete}
                                disabled={isLoading}
                                className="w-1/2"
                            >
                                Delete
                            </Button>
                        </>
                    )}
                </View>
            </View>
        </View>
    );
}
