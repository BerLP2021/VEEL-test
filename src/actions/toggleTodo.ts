'use server';
async function toggleTodo(todo: Todo): Promise<Todo | null> {
    const { id, completed } = todo;
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                completed,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to update todo');
        }
        //fake logic
        return { ...todo, completed: !todo.completed };
    } catch (error) {
        console.error('Failed to update todo:', error);
        return null;
    }
}

export default toggleTodo;
