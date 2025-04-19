'use client';

import React, { useCallback, useOptimistic, useTransition } from 'react';

import toggleTodoAction from '@/actions/toggleTodo';
import deleteTodoAction from '@/actions/deleteTodo';
import TotalItems from '../TotalItems';
import TodoItem from '../TodoItem';
import TodoForm from '../TodoForm';
import useTodos from '@/context';

function TodoList() {
    const { success, todos, setTodos, message } = useTodos();
    const [, startTransition] = useTransition();
    const [optimisticTodos, updateOptimisticTodos] = useOptimistic(
        todos,
        (
            state,
            payload: {
                type: 'ADD' | 'DELETE' | 'TOGGLE' | 'CONFIRM' | 'REVERT';
                todo: Todo;
            },
        ) => {
            switch (payload.type) {
                case 'ADD':
                    return [
                        {
                            ...payload.todo,
                            sending: true,
                        },
                        ...state,
                    ];
                case 'DELETE':
                    return state.filter((todo) => todo.id !== payload.todo.id);
                case 'TOGGLE':
                    return state.map((todo) =>
                        todo.id === payload.todo.id
                            ? { ...todo, completed: !todo.completed, adding: true }
                            : todo,
                    );
                case 'REVERT':
                    return state;
                default:
                    return state;
            }
        },
    );

    const addOptimisticTodo = useCallback(
        (newTodo: Todo) => {
            updateOptimisticTodos({ type: 'ADD', todo: newTodo });
        },
        [updateOptimisticTodos],
    );

    const toggleOptimisticTodo = (todo: Todo) => {
        startTransition(() => {
            updateOptimisticTodos({
                type: 'TOGGLE',
                todo: { ...todo, completed: !todo.completed },
            });
        });
    };

    const deleteOptimisticTodo = (todo: Todo) => {
        startTransition(() => {
            updateOptimisticTodos({ type: 'DELETE', todo });
        });
    };

    const revertTodo = useCallback(
        (todo: Todo) => {
            startTransition(() => updateOptimisticTodos({ type: 'REVERT', todo }));
        },
        [updateOptimisticTodos],
    );

    const handleDelete = useCallback(async (todo: Todo) => {
        deleteOptimisticTodo(todo);
        const todoFromApi = await deleteTodoAction(todo.id as string);
        if (!todoFromApi) {
            revertTodo(todo);
            return;
        }
        setTodos((todos) => todos.filter((t) => t.id !== todo.id));
    }, []);

    const handleToggle = useCallback(async (todo: Todo) => {
        toggleOptimisticTodo(todo);
        const todoFromApi = await toggleTodoAction(todo);
        if (!todoFromApi) {
            revertTodo(todo);
            return;
        }
        startTransition(() => {
            setTodos((todos) => todos.map((t) => (t.id === todo.id ? todoFromApi : t)));
        });
    }, []);

    const completed = optimisticTodos.filter((todo) => todo.completed).length;

    return (
        <>
            <TodoForm
                handleAddTodo={addOptimisticTodo}
                revertTodo={revertTodo}
                setTodos={setTodos}
            />

            {!!optimisticTodos.length && (
                <TotalItems total={optimisticTodos.length} done={completed} />
            )}
            {!success ? (
                <p className="text-red-500 text-center">{message}</p>
            ) : (
                <ul className="space-y-2 w-full">
                    {optimisticTodos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onDelete={handleDelete}
                            onToggle={handleToggle}
                        />
                    ))}
                </ul>
            )}
            {optimisticTodos.length === 0 && success && (
                <p className="text-center">No todos yet. You should work harder! :)</p>
            )}
        </>
    );
}

export default TodoList;
