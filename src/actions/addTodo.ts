'use server';
export default async function addTodo(todo: Todo): Promise<Todo | null> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo),
        });
        if (!response.ok) {
            throw new Error('Failed to add todo');
        }
        const newTodo = await response.json();
        return newTodo;
    } catch (error) {
        console.error('Error adding todo:', error);
        return null;
    }
}
