'use client';

import React, { createContext } from 'react';
import { useState } from 'react';

type TodosContextType = {
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
} & TodosResponse;
export const TodosContext = createContext<TodosContextType | null>(null);

function FakeTodosProvider({
    children,
    data,
}: Readonly<{
    children: React.ReactNode;
    data: TodosResponse;
}>) {
    const [todos, setTodos] = useState<Todo[]>(data.todos);
    const { success, message } = data;
    return (
        <TodosContext.Provider value={{ success, message, todos, setTodos }}>
            {children}
        </TodosContext.Provider>
    );
}

export default FakeTodosProvider;
