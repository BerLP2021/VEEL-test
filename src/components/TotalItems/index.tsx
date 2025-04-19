import React, { memo } from 'react';

type TotalItemsProps = Readonly<{
    total: number;
    done: number;
}>;

function TotalItems({ total, done }: TotalItemsProps) {
    return (
        <section className="w-full">
            <h2 className="text-2xl text-center">Total todos: </h2>
            <p className="italic text-center">
                done <span className="font-bold text-green-500">{done}</span> out of
                <span className="font-bold text-red-500"> {total}</span>
            </p>
        </section>
    );
}
export default memo(TotalItems);
