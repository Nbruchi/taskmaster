import { cn } from "@/lib/utils";
import { ActivityIndicator, View } from "react-native";

interface SpinnerProps {
    size?: "small" | "large";
    className?: string;
}

export function Spinner({ size = "large", className }: SpinnerProps) {
    return (
        <View className={cn("flex-1 items-center justify-center", className)}>
            <ActivityIndicator size={size} color="#9333ea" />
        </View>
    );
}
