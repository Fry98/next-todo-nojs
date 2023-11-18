'use server';

import { setTodos } from "@/store";
import { redirect } from "next/navigation";

export const addTodo = async (data: FormData) => {
  setTodos(state => [...state, {
    value: data.get('title')?.toString() ?? '',
    done: false
  }]);

  redirect('/');
};

export const markTodo = async (id: number) => {
  setTodos(state => state.map(({ value, done }, i) => ({ value, done: i === id ? !done : done })))
  redirect('/');
};

export const deleteTodo = async (id: number) => {
  setTodos(state => state.filter((_, i) => i !== id));
  redirect('/');
};
