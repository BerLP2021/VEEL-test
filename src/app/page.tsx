import fetchTodosAction from '@/actions/fetchTodos';
import TodoList from '@/components/TodoList';
import FakeTodosProvider from '@/components/TodoFakeStore';

export default async function Home() {
    const todosData = await fetchTodosAction();

    return (
        <div className="grid grid-rows-[1fr_120px] items-start justify-items-center min-h-screen gap-16 w-full">
            <main className="pt-10 flex flex-col gap-8 items-center px-5 md:px-0 w-full md:w-[50%] max-w-[600px]">
                <h1 className="text-3xl font-bold text-center">Todo App</h1>
                <FakeTodosProvider data={todosData}>
                    <TodoList />
                </FakeTodosProvider>
            </main>
            <footer className="flex gap-[24px] flex-wrap items-center justify-center">
                Hello world footer
            </footer>
        </div>
    );
}
