import { ReactNode } from "react";
import { ITodo } from "../../domain/types.ts";

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
      ))}
    </div>
  )
}
