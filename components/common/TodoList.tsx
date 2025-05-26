// components/common/TodoList.tsx
import { Button } from "@/components/cn/Button";
import { Card } from "@/components/cn/Card";
import { Spinner } from "@/components/ui/spinner";
import React, { memo } from "react";
import { FlatList, Text, View } from "react-native";

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  onTodoPress: (todo: Todo) => void;
  onDeletePress: (id: number) => void;
  onToggleComplete: (id: number, completed: boolean) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
}

interface TodoItemProps {
  item: Todo;
  onPress: () => void;
  onDelete: () => void;
  onToggleComplete: () => void;
}

const TodoItem = memo(function TodoItem({
  item,
  onPress,
  onDelete,
  onToggleComplete,
}: TodoItemProps) {
  return (
    <Card variant="elevated" onPress={onPress} className="p-4 mb-4">
      <View className="flex-1">
        <Text className="text-lg font-medium mb-2">
          {item.title || "Untitled Todo"}
        </Text>
        <Text className="text-sm text-gray-500 mb-4">
          {item.completed ? "Completed" : "Pending"}
        </Text>
        <View className="flex flex-row justify-end items-center gap-4">
          <Button variant="secondary" size="sm" onPress={onToggleComplete}>
            {item.completed ? "Undo" : "Complete"}
          </Button>
          <Button variant="destructive" size="sm" onPress={onDelete}>
            Delete
          </Button>
        </View>
      </View>
    </Card>
  );
});

function TodoList({
  todos,
  isLoading,
  onTodoPress,
  onDeletePress,
  onToggleComplete,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 10,
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTodos = todos.slice(startIndex, endIndex);

  const renderItem = ({ item }: { item: Todo }) => (
    <TodoItem
      item={item}
      onPress={() => onTodoPress(item)}
      onDelete={() => onDeletePress(item.id)}
      onToggleComplete={() => onToggleComplete(item.id, !item.completed)}
    />
  );

  return (
    <View className="flex-1">
      <FlatList
        data={currentTodos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16, gap: 16 }}
        renderItem={renderItem}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
      <View className="flex-row justify-center items-center p-4 gap-2">
        <Button
          variant="secondary"
          size="sm"
          onPress={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Text className="text-sm">
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          variant="secondary"
          size="sm"
          onPress={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </View>
    </View>
  );
}

export default memo(TodoList);
