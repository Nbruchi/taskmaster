import { cn } from "@/lib/utils";
import { Pressable, Text, View } from "react-native";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onPress?: () => void;
    variant?: "default" | "elevated";
}

export function Card({
    children,
    className,
    onPress,
    variant = "default",
}: CardProps) {
    const baseStyles = "rounded-xl p-4";

    const variants = {
        default: "bg-white border-2 border-primary-100",
        elevated: "bg-white border-2 border-b-4 border-primary-200 shadow-lg",
    };

    const Container = onPress ? Pressable : View;

    return (
        <Container
            onPress={onPress}
            className={cn(
                baseStyles,
                variants[variant],
                onPress && "active:translate-y-1",
                className
            )}
        >
            {children}
        </Container>
    );
}

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
    return <View className={cn("mb-2", className)}>{children}</View>;
}

interface CardTitleProps {
    children: React.ReactNode;
    className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
    return (
        <Text
            className={cn("text-lg font-semibold text-primary-900", className)}
        >
            {children}
        </Text>
    );
}

interface CardDescriptionProps {
    children: React.ReactNode;
    className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
    return (
        <Text className={cn("text-sm text-primary-600 font-sans", className)}>
            {children}
        </Text>
    );
}

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
    return <View className={cn("mt-2", className)}>{children}</View>;
}

interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
    return (
        <View className={cn("mt-4 flex-row justify-end gap-2", className)}>
            {children}
        </View>
    );
}
