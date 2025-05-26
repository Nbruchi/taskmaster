import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { apiService } from "./api";

interface UserContextType {
    currentUser: User | null;
    users: User[];
    isLoading: boolean;
    setCurrentUser: (user: User) => void;
    fetchUsers: () => Promise<void>;
}

interface UserProviderProps {
    children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: UserProviderProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const data = await apiService.getUsers();
            setUsers(data);

            if (!currentUser && data.length > 0) {
                setCurrentUser(data[0]);
            }
        } catch (error) {
            console.error(`Error fetching users: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <UserContext.Provider
            value={{
                currentUser,
                users,
                isLoading,
                setCurrentUser,
                fetchUsers,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error(`useUser must be used within a UserProvider`);
    }
    return context;
}
