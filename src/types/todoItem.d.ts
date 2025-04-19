interface Todo {
    id?: string;
    title: string;
    completed: boolean;
    sending?: boolean;
    adding?: boolean;
}

interface TodosResponse {
    todos: Todo[];
    success: boolean;
    message: string;
}
