import axios, { isAxiosError } from "axios";

// Define the base URL for the API
const BASE_URL = "https://jsonplaceholder.typicode.com";

// Create an axios instance with default config
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

class ApiService {
    // Todo endpoints
    async getTodos(): Promise<Todo[]> {
        try {
            const response = await api.get("/todos");
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getTodoById(id: number): Promise<Todo> {
        try {
            const response = await api.get(`/todos/${id}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async createTodo(todo: Omit<Todo, "id">): Promise<Todo> {
        try {
            const response = await api.post("/todos", todo);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async updateTodo(id: number, todo: Partial<Todo>): Promise<Todo> {
        try {
            const response = await api.put(`/todos/${id}`, todo);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async deleteTodo(id: number): Promise<void> {
        try {
            await api.delete(`/todos/${id}`);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // User endpoints
    async getUsers(): Promise<User[]> {
        try {
            const response = await api.get("/users");
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getUserById(id: number): Promise<User> {
        try {
            const response = await api.get(`/users/${id}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getUserTodos(userId: number): Promise<Todo[]> {
        try {
            const response = await api.get(`/users/${userId}/todos`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Error handling
    private handleError(error: any): Error {
        if (isAxiosError(error)) {
            // Handle Axios specific errors
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                return new Error(
                    `API Error: ${error.response.status} - ${
                        error.response.data.message || "Unknown error"
                    }`
                );
            } else if (error.request) {
                // The request was made but no response was received
                return new Error("No response received from server");
            } else {
                // Something happened in setting up the request that triggered an Error
                return new Error(`Request Error: ${error.message}`);
            }
        }
        // Handle non-Axios errors
        return new Error("An unexpected error occurred");
    }
}

// Create and export a singleton instance
export const apiService = new ApiService();
