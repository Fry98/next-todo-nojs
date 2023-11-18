import { cookies } from 'next/headers';

export interface Todo {
  value: string;
  done: boolean;
}

export const getTodos = (): Todo[] => {
  return JSON.parse(cookies().get('todos')?.value ?? '[]');
};

export const setTodos = (setter: (todos: Todo[]) => Todo[]): void => {
  const updated = setter(getTodos());
  cookies().set('todos', JSON.stringify(updated), { maxAge: 60 * 60 * 24 * 365 });
};
