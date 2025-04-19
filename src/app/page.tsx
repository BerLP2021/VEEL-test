import fetchTodosAction from '@/actions/fetchTodos';
import TodoList from '@/components/TodoList';
import FakeTodosProvider from '@/components/TodoFakeProvider';
import Image from 'next/image';

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
                <Image
                    src="/logo.png"
                    alt="It's me"
                    width={70}
                    height={70}
                    className="rounded-full"
                />
                <p className="text-lg">
                    Created for <span className="font-bold">VEEL</span> by{' '}
                    <a
                        href="https://t.me/ThalerTimm"
                        target="_blank"
                        className="font-bold text-blue-400 text-shadow-blue-200 hover:underline  [text-underline-position:under]"
                    >
                        @ThalerTimm
                    </a>
                </p>
            </footer>
        </div>
    );
}
