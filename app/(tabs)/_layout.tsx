// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Home, ListTodo, User, Users } from "lucide-react-native";
import { useColorScheme } from "react-native";

export default function TabsLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                headerStyle: {
                    backgroundColor:
                        colorScheme === "dark" ? "#1F2937" : "#FFFFFF",
                },
                headerTintColor: colorScheme === "dark" ? "#FFFFFF" : "#000000",
                tabBarStyle: {
                    backgroundColor:
                        colorScheme === "dark" ? "#1F2937" : "#FFFFFF",
                },
                tabBarActiveTintColor: "#9333ea",
                tabBarInactiveTintColor:
                    colorScheme === "dark" ? "#9CA3AF" : "#6B7280",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <Home size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="todos"
                options={{
                    title: "Todos",
                    tabBarIcon: ({ color }) => (
                        <ListTodo size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="users"
                options={{
                    title: "Users",
                    tabBarIcon: ({ color }) => (
                        <Users size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => <User size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
