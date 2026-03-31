import React from "react";
import { Todo } from "./types";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faClock,
  faFaceGrinWide,
} from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";

type Props = {
  todo: Todo;
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
};

// 優先度を星に変換する関数
const num2star = (n: number): string => "★".repeat(4 - n);

const TodoItem = ({ todo, updateIsDone, remove }: Props) => {
  return (
    <div
      className={twMerge(
        "rounded-md border border-slate-500 bg-white px-3 py-2 drop-shadow-md",
        todo.isDone && "bg-blue-50 opacity-50"
      )}
    >
      {/* 完了済みバッジ */}
      {todo.isDone && (
        <div className="mb-1 rounded bg-blue-400 px-2 py-0.5 text-center text-xs text-white">
          <FontAwesomeIcon icon={faFaceGrinWide} className="mr-1.5" />
          完了済み
          <FontAwesomeIcon icon={faFaceGrinWide} className="ml-1.5" />
        </div>
      )}

      <div className="flex items-baseline text-slate-700">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={(e) => updateIsDone(todo.id, e.target.checked)}
          className="mr-1.5 cursor-pointer"
        />
        <FontAwesomeIcon icon={faFile} flip="horizontal" className="mr-1" />
        
        <div className={twMerge(
          "grow text-lg font-bold",
          todo.isDone && "line-through decoration-2"
        )}>
          {todo.name}
        </div>

        <div className="ml-2 flex items-center space-x-2 shrink-0">
          <span className="text-sm">優先度</span>
          <span className="text-orange-400">{num2star(todo.priority)}</span>
          <button
            onClick={() => remove(todo.id)}
            className="rounded-md bg-slate-200 px-2 py-1 text-sm font-bold text-white hover:bg-red-500 transition-colors"
          >
            削除
          </button>
        </div>
      </div>

      {/* 期限表示 */}
      {todo.deadline && (
        <div className="ml-4 flex items-center text-sm text-slate-500 mt-1">
          <FontAwesomeIcon icon={faClock} flip="horizontal" className="mr-1.5" />
          <div className={twMerge(todo.isDone && "line-through")}>
            期限: {dayjs(todo.deadline).format("YYYY年M月D日 H時m分")}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;