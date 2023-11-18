import { getTodos } from "@/store";
import { FC } from "react";
import { TodoPageClient } from "./page-client";

const TodoPage: FC = async () => {
  const todos = getTodos();

  return (
    <TodoPageClient todos={todos} />
  );
};

export default TodoPage;
