import {ITodo} from "../../domain/types.ts";
import {TrashIcon} from "../../../../shared/ui";
import {ReactNode} from "react";

export const List = ({
  isLoading,
  todos,
  renderTodo,
}: {
  isLoading: boolean
  todos: ITodo[] | undefined
  renderTodo: (data: ITodo & { key: string }) => ReactNode
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-0.5">
        {Array.from({ length: 5 }, (_, i) => i).map((i) => (
          <div
            key={i}
            className="h-[46px] mr-1 bg-gray-300 rounded-md dark:bg-gray-700 animate-pulse"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-0.5">
      {todos?.map((todo) => (
        renderTodo({
          ...todo,
          key: todo.id,
        })
        /*<div
          key={todo.id}
          className="p-2 bg-slate-100 rounded-md mr-1 flex items-center gap-3 justify-between"
        >
          <span>{todo.caption}</span>

          <div className="flex items-center gap-2">
            <button
              disabled={true}
              className="hover:bg-rose-100 disabled:text-rose-300 disabled:hover:bg-transparent disabled:cursor-auto cursor-pointer transition duration-300 text-rose-500 rounded-full p-1"
            >
              <TrashIcon fontSize={22} />
            </button>
          </div>
        </div>*/
      ))}
    </div>
  )
}
