'use server';

async function deleteTodo(id: string) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete todo');
        }
        //fake logic
        return true;
    } catch (error) {
        console.error('Error deleting todo:', error);
        return null;
    }
}

export default deleteTodo;
