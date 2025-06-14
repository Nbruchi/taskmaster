import { Button } from "@/components/cn/Button";
import TodoList from "@/components/common/TodoList";
import { apiService } from "@/lib/api";
import { useUser } from "@/lib/UserContext";
import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text, TextInput, View, useColorScheme } from "react-native";

export default function TodosScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const colorScheme = useColorScheme();
  const { currentUser } = useUser();

  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getTodos();
      setTodos(data);
      setFilteredTodos(data);
      setCurrentPage(1); // Reset to first page when fetching new data
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []); // Fetch all todos on mount

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTodos(todos);
    } else {
      const filtered = todos.filter((todo) =>
        (todo.title || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTodos(filtered);
    }
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchQuery, todos]);

  const handleTodoPress = useCallback((todo: Todo) => {
    router.push(`/todo/${todo.id}`);
  }, []);

  const handleDeletePress = useCallback(
    async (id: number) => {
      try {
        await apiService.deleteTodo(id);
        setTodos(todos.filter((todo) => todo.id !== id));
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    },
    [todos]
  );

  const handleToggleComplete = useCallback(
    async (id: number, completed: boolean) => {
      try {
        const updatedTodo = await apiService.updateTodo(id, { completed });
        setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    },
    [todos]
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const memoizedTodoList = useMemo(
    () => (
      <TodoList
        todos={filteredTodos}
        isLoading={isLoading}
        onTodoPress={handleTodoPress}
        onDeletePress={handleDeletePress}
        onToggleComplete={handleToggleComplete}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
      />
    ),
    [
      filteredTodos,
      isLoading,
      handleTodoPress,
      handleDeletePress,
      handleToggleComplete,
      currentPage,
      totalPages,
      handlePageChange,
      itemsPerPage,
    ]
  );

  if (!currentUser) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-lg text-gray-500">
          Please select a user in the profile tab
        </Text>
      </View>
    );
  }

  return (
    <View
      className={`flex-1 ${
        colorScheme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <View className="p-4">
        <TextInput
          className={`p-4 rounded-lg border mb-4 ${
            colorScheme === "dark"
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-white text-black border-gray-300"
          }`}
          placeholder="Search todos..."
          placeholderTextColor={colorScheme === "dark" ? "#9CA3AF" : "#6B7280"}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View className="flex-1">
        {memoizedTodoList}
        <View className="p-4">
          <Button
            variant="default"
            onPress={() => router.push("/todo/create-todo")}
          >
            Add New Todo
          </Button>
        </View>
      </View>
    </View>
  );
}
