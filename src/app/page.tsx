import { getTodos, setTodos } from "@/store";
import cn from "classnames";
import { redirect } from "next/navigation";
import { FC } from "react";

const TodoPage: FC = async () => {
  const addTodo = async (data: FormData) => {
    'use server';

    setTodos(state => [...state, {
      value: data.get('title')?.toString() ?? '',
      done: false
    }]);

    redirect('/');
  };

  const markTodo = async (id: number) => {
    'use server';

    setTodos(state => state.map(({ value, done }, i) => ({ value, done: i === id ? !done : done })))
    redirect('/');
  };

  const deleteTodo = async (id: number) => {
    'use server';

    setTodos(state => state.filter((_, i) => i !== id));
    redirect('/');
  };

  const totalCount = getTodos().length;
  const doneCount = getTodos().filter(x => x.done).length;

  return (
    <div className="h-screen">
      <div className="w-[400px] mx-auto">
        <div className="text-center text-sm text-green-600 my-2">
          {doneCount} out of {totalCount} todos completed
        </div>
        <form className="flex" action={addTodo}>
          <input
            key={performance.now()}
            type="text"
            name="title"
            className="p-2 text-gray-600 border border-gray-300 flex-1"
            placeholder="what do you need to do?"
          />
          <button
            type="submit"
            className="py-2 px-4 text-white bg-green-600 border border-green-600 ml-2 duration-100 hover:bg-green-700 hover:border-green-700"
          >Add</button>
        </form>
        <hr className="w-4/5 my-2 mx-auto" />
        <div className="">
          {totalCount > 0 || (
            <div className="text-center text-sm text-gray-400">
              No items
            </div>
          )}
          {totalCount > 0 && getTodos().map((x, i) => (
            <div key={i} className="w-full mb-2 text-gray-600 border border-gray-300 flex cursor-pointer">
              <form className="flex-1" action={markTodo.bind(null, i)}>
                <button type="submit" className={cn("text-left w-full", { 'line-through': x.done })}>
                  <div className="my-1 ml-2">{x.value}</div>
                </button>
              </form>
              <form action={deleteTodo.bind(null, i)}>
                <button type="submit">
                  <div className="py-1 px-2 hover:text-red-500 duration-100">X</div>
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
