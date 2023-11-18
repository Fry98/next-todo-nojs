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

  const todos = getTodos();
  const totalCount = todos.length;
  const doneCount = todos.filter(x => x.done).length;

  return (
    <div className="w-[400px] max-w-[calc(100%-1rem)] mx-auto">
      <div className="text-center text-sm text-green-600 py-2">
        {doneCount} out of {totalCount} todos completed
      </div>
      <form className="flex" action={addTodo}>
        <input
          key={performance.now()}
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
      <div className="">
        {totalCount > 0 || (
          <div className="text-center text-sm text-gray-400">
            No items
          </div>
        )}
        {totalCount > 0 && todos.map((x, i) => (
          <div key={i} className="w-full mb-2 text-gray-600 border border-gray-300 cursor-pointer">
            <form className="w-full flex">
              <button
                type="submit"
                className={cn("text-left flex-1", { 'line-through': x.done })}
                formAction={markTodo.bind(null, i)}
              >
                <div className="py-1 pl-3">{x.value}</div>
              </button>
              <button type="submit" formAction={deleteTodo.bind(null, i)}>
                <div className="py-1 px-3 hover:text-red-500 duration-200">X</div>
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoPage;
