'use client';

import { addTodo, deleteTodo, markTodo } from "@/actions/todos";
import { Todo } from "@/store";
import cn from "classnames";
import { FC, startTransition, useOptimistic } from "react";

export const TodoPageClient: FC<{ todos: Todo[]; }> = ({ todos }) => {
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos);
  const doneCount = optimisticTodos.filter(x => x.done).length;

  return (
    <div className="w-[400px] max-w-[calc(100%-1rem)] mx-auto">
      <div className="text-center text-sm text-green-600 py-2">
        {doneCount} out of {optimisticTodos.length} todos completed
      </div>
      <form
        className="flex"
        action={addTodo}
        onSubmit={async (e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          e.currentTarget.reset();

          startTransition(() => setOptimisticTodos(state => [...state, {
            value: data.get('title')?.toString() ?? '',
            done: false,
            pending: true
          }]));

          await addTodo(data);
        }}
      >
        <input
          type="text"
          name="title"
          className="py-1 px-2 text-gray-600 border border-gray-300 flex-1 outline-none focus:border-green-600 min-w-0"
          placeholder="what do you need to do?"
        />
        <button
          type="submit"
          className="py-1 px-4 text-white bg-green-600 border border-green-600 ml-2 duration-100 hover:bg-green-700 hover:border-green-700"
        >Add</button>
      </form>
      <hr className="w-4/5 my-2 mx-auto" />
      <div>
        {optimisticTodos.length > 0 || (
          <div className="text-center text-sm text-gray-400">
            No items
          </div>
        )}
        {optimisticTodos.length > 0 && optimisticTodos.map((x, i) => (
          <div key={i} className="w-full mb-2 text-gray-600 border border-gray-300 cursor-pointer">
            <form className="w-full flex">
              <button
                type="submit"
                className={cn("text-left flex-1", { 'line-through': x.done })}
                formAction={markTodo.bind(null, i)}
                onClick={async (e) => {
                  e.preventDefault();
                  startTransition(() => setOptimisticTodos(state => state.map((todo, idx) => ({
                    ...todo,
                    done: i !== idx ? todo.done : !todo.done
                  }))));

                  await markTodo(i);
                }}
              >
                <div className="py-1 pl-3">{x.value}</div>
              </button>
              <button
                type="submit"
                formAction={deleteTodo.bind(null, i)}
                onClick={async (e) => {
                  e.preventDefault();
                  startTransition(() => setOptimisticTodos(state => state.filter((_, idx) => idx !== i)));

                  await deleteTodo(i);
                }}
              >
                <div className="py-1 px-3 hover:text-red-500 duration-200">X</div>
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};
