async function fetchTodos(): Promise<TodosResponse> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10', {
            next: {
                revalidate: 600,
                tags: ['todos'],
            },
            cache: 'force-cache',
        });
        if (!response.ok) {
            throw new Error('Error fetching todos');
        }
        const data = await response.json();

        return {
            message: 'Todos fetched successfully',
            success: true,
            todos: data,
        };
    } catch (error) {
        console.error('Error fetching todos:', error);
        return {
            message: 'Error fetching todos',
            success: false,
            todos: [],
        };
    }
}

export default fetchTodos;
