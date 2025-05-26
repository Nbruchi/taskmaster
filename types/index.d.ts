interface Todo {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

interface TaskCardProps {
    task: Todo;
    onPress: (task: Todo) => void;
    onComplete: (taskId: number) => void;
}

interface UserCardProps {
    user: User;
    onPress: (user: User) => void;
    taskCount?: number;
}
