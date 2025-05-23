# Todo App with Next.js and JSONPlaceholder API

A simple Todo application built with Next.js, Tailwind CSS, and JSONPlaceholder API. The app allows users to fetch, add, toggle completion state and delete todos.

## Features

-   Fetch and display todos from JSONPlaceholder API
-   Add new todos
-   Delete existing todos
-   Toggle completion state
-   Responsive design with Tailwind CSS

## Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn

## Setup and Running

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd todo-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## API Usage

The app uses the following JSONPlaceholder API endpoints:

-   GET `https://jsonplaceholder.typicode.com/todos?_limit=10` - Fetch todos
-   POST `https://jsonplaceholder.typicode.com/todos` - Create a new todo
-   PATCH `https://jsonplaceholder.typicode.com/todos/{id}` - Toggle completion state
-   DELETE `https://jsonplaceholder.typicode.com/todos/{id}` - Delete a todo

## Technologies Used

-   Next.js
-   React (with Hooks)
-   Tailwind CSS
-   Fetch API

## Notes

# Notes

-   The project uses Next.js 15 with the App Router.
-   Tailwind CSS is configured for styling.
-   The Fetch API is used for HTTP requests.
-   The README includes instructions to set up and run the project.
-   The JSONPlaceholder API simulates CRUD operations (POST/DELETE/PATCH requests don't persist).
-   The app is responsive and styled minimally with Tailwind CSS.
-   TypeScript is assumed for type safety (types included in components).

The app uses fake logic for storing added todos (due to the way the placeholder API works). Initial data is retrieved from the server, the following changes are sent to API and stored in local state.
Added logic for optimistically updating the UI (useOptimistic and useTransition)
