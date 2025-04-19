import React, { memo } from 'react';

type TodoItemProps = Readonly<{
    todo: Todo;
    onDelete: (todo: Todo) => void;
    onToggle: (todo: Todo) => void;
}>;

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
    const [checked, setChecked] = React.useState(todo.completed);
    const handleToggle = () => {
        onToggle(todo);
        setChecked(!checked);
    };
    return (
        <li
            className={`flex justify-between gap-8 items-center px-3 hover:bg-gray-800 dark:hover:shadow-gray-700 hover:shadow-md hover:shadow-gray-200  rounded transition-all duration-200 border-1 border-gray-200 dark:border-gray-700 select-none py-4 relative ${
                todo.sending ? 'animate-pulse pointer-events-none' : ''
            } ${todo.adding ? 'border-dashed pointer-events-none' : ''}`}
        >
            <input
                type="checkbox"
                className="shrink-0 w-5 h-5 cursor-pointer after:aspect-square after:h-full after:absolute after:top-0 after:left-0"
                checked={todo.completed}
                onChange={handleToggle}
            />
            <span className={`text-start flex-1 ${todo.completed ? 'line-through' : ''}`}>
                {todo.title} {todo.sending ? '...' : ''}
            </span>
            <button
                onClick={() => onDelete(todo)}
                className="text-red-900 text-5xl leading-0 cursor-pointer w-6 h-6  rounded-full hover:text-red-700 transition-all duration-200 origin-center hover:scale-[150%] will-change-transform"
            >
                &times;
            </button>
        </li>
    );
}
export default memo(TodoItem);
