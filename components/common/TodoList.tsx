// components/TodoList.tsx
import { Button } from "@/components/cn/Button";
import { Card } from "@/components/cn/Card";
import { Spinner } from "@/components/ui/spinner";
import React from "react";
import { FlatList, Text, View } from "react-native";

interface TodoListProps {
    todos: Todo[];
    isLoading: boolean;
    onTodoPress: (todo: Todo) => void;
    onDeletePress: (id: number) => void;
    onToggleComplete: (id: number, completed: boolean) => void;
}

export function TodoList({
    todos,
    isLoading,
    onTodoPress,
    onDeletePress,
    onToggleComplete,
}: TodoListProps) {
    if (isLoading) {
        return <Spinner />;
    }

    if (todos.length === 0) {
        return (
            <View className="flex-1 items-center justify-center p-4">
                <Text className="text-lg text-gray-500">No todos found</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={todos}
            keyExtractor={(item) => item.id.toString()}
            contentContainerClassName="p-4 space-y-4"
            renderItem={({ item }) => (
                <Card
                    variant="elevated"
                    onPress={() => onTodoPress(item)}
                    className="flex-row items-center justify-between"
                >
                    <View className="flex-1">
                        <Text className="text-lg font-medium">
                            {item.title}
                        </Text>
                        <Text className="text-sm text-gray-500">
                            {item.completed ? "Completed" : "Pending"}
                        </Text>
                    </View>
                    <View className="flex-row space-x-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            onPress={() =>
                                onToggleComplete(item.id, !item.completed)
                            }
                        >
                            {item.completed ? "Undo" : "Complete"}
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onPress={() => onDeletePress(item.id)}
                        >
                            Delete
                        </Button>
                    </View>
                </Card>
            )}
        />
    );
}
