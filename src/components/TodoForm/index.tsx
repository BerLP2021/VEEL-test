'use client';

import addTodoAction from '@/actions/addTodo';
import { useRef, useTransition } from 'react';

type TodoFormProps = {
    handleAddTodo: (todo: Todo) => void;
    revertTodo: (todo: Todo) => void;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

function TodoForm({ handleAddTodo, revertTodo, setTodos }: TodoFormProps) {
    const [, startTransition] = useTransition();
    const formRef = useRef<HTMLFormElement>(null);

    async function formAction(formData: FormData) {
        const title = formData.get('title') as string;
        const newTodo = { title, completed: false, id: Math.random().toString() };
        handleAddTodo(newTodo);
        formRef.current?.reset();
        const todoFromApi = await addTodoAction(newTodo);
        if (!todoFromApi) {
            revertTodo(newTodo);
            return;
        }
        startTransition(() => {
            setTodos((todos) => [{ ...todoFromApi, id: newTodo.id }, ...todos]);
        });
    }
    return (
        <form action={formAction} ref={formRef} className="flex gap-2 w-full">
            <input
                type="text"
                name="title"
                placeholder="Add a new todo"
                className="flex-1 p-2 border rounded"
            />
            <button
                type="submit"
                className={`bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-200`}
            >
                Add
            </button>
        </form>
    );
}

export default TodoForm;
