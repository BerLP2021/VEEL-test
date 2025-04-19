'use client';
import { TodosContext } from '@/components/TodoFakeProvider';
import { useContext } from 'react';

function useTodos() {
    const context = useContext(TodosContext);
    if (!context) {
        throw new Error('useTodos must be used within a TodosProvider');
    }
    return context;
}

export default useTodos;
