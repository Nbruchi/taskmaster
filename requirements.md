# Task Management App Requirements

## Project Overview

A mobile application built with Expo/React Native that helps users manage their tasks using JSONPlaceholder API for data management. The app features a modern UI with 3D-styled components and a purple color theme.

## Technical Stack

-   **Framework**: Expo/React Native
-   **Styling**: NativeWind (Tailwind CSS for React Native)
-   **UI Components**: Custom 3D-styled components
-   **API**: JSONPlaceholder
-   **Navigation**: Expo Router (Tab Navigation)
-   **State Management**: React Context
-   **Font**: Poppins

## Design System

### Colors

-   Primary: Purple (#9333ea)
-   Secondary: Light Purple (#e9d5ff)
-   Background: White
-   Text: Dark Purple (#581c87)
-   Accent: Light Purple (#f3e8ff)

### Typography

-   Font Family: Poppins
-   Weights: Regular, Medium, SemiBold, Bold, ExtraBold
-   Sizes: sm, base, lg, xl

### Components

-   3D-styled buttons with bottom border
-   Elevated cards with shadow
-   Consistent spacing and padding
-   Interactive feedback on press

## Functional Requirements

### 1. Task Management

-   [ ] View all tasks
-   [ ] Create new tasks
-   [ ] Edit existing tasks
-   [ ] Delete tasks
-   [ ] Mark tasks as complete/incomplete
-   [ ] Search tasks by title

### 2. User Management

-   [ ] View list of all users
-   [ ] View individual user profiles
-   [ ] Filter tasks by user

### 3. Task Details

-   [ ] View task title
-   [ ] Edit task details
-   [ ] Delete task

## API Integration

### JSONPlaceholder Endpoints

-   `/todos` - Task management
-   `/users` - User management

### Data Models

```typescript
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
```

## Screen Structure

### Tab Navigation

1. **Home Tab**

    - Task list
    - Task creation
    - Task filtering
    - Search functionality

2. **Users Tab**

    - User list
    - User details
    - User's tasks

3. **Profile Tab**
    - User profile
    - Task statistics
    - Settings
