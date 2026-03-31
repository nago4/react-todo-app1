import React from "react";
import { Todo } from "./types";
import TodoItem from "./TodoItem"; // ◀◀ 追加

type Props = {
  todos: Todo[];
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
};

const TodoList = (props: Props) => {
  // 元のデザインにある「ソートロジック」を維持
  const sortedTodos: Todo[] = [...props.todos].sort((a, b) => {
    if (a.isDone !== b.isDone) {
      return a.isDone ? 1 : -1;
    } else {
      return (a.deadline?.getTime() ?? 0) - (b.deadline?.getTime() ?? 0);
    }
  });

  if (sortedTodos.length === 0) {
    return (
      <div className="text-red-500">
        現在、登録されているタスクはありません。
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {sortedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateIsDone={props.updateIsDone}
          remove={props.remove}
        />
      ))}
    </div>
  );
};

export default TodoList;