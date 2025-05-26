import { cn } from "@/lib/utils";
import { Pressable, Text } from "react-native";

interface ButtonProps {
    onPress: () => void;
    children: React.ReactNode;
    variant?:
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | "link";
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
    disabled?: boolean;
}

export function Button({
    onPress,
    children,
    variant = "default",
    size = "default",
    className,
    disabled = false,
}: ButtonProps) {
    const baseStyles = "rounded-lg active:translate-y-1";

    const variants = {
        default: "bg-primary-600 border-2 border-b-4 border-primary-800",
        destructive: "bg-red-600 border-2 border-b-4 border-red-800",
        outline: "bg-transparent border-2 border-primary-600",
        secondary: "bg-primary-100 border-2 border-b-4 border-primary-300",
        ghost: "bg-transparent",
        link: "bg-transparent underline",
    };

    const sizes = {
        default: "px-4 py-3",
        sm: "px-3 py-2",
        lg: "px-6 py-4",
        icon: "p-3",
    };

    const textColors = {
        default: "text-white font-medium",
        destructive: "text-white font-medium",
        outline: "text-primary-600 font-medium",
        secondary: "text-primary-900 font-medium",
        ghost: "text-primary-600 font-medium",
        link: "text-primary-600 font-medium underline",
    };

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                disabled && "opacity-50",
                className
            )}
        >
            <Text
                className={cn(
                    "text-center",
                    textColors[variant],
                    size === "sm" && "text-sm",
                    size === "default" && "text-base",
                    size === "lg" && "text-lg"
                )}
            >
                {children}
            </Text>
        </Pressable>
    );
}
