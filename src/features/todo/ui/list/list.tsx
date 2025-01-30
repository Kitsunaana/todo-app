import {ITodo} from "../../domain/types.ts";

export const List = ({
  isLoading,
  todos,
}: {
  isLoading: boolean
  todos: ITodo[] | undefined
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-0.5">
        {Array.from({ length: 5 }, (_, i) => i).map((i) => (
          <div
            key={i}
            className="h-[48px] mr-1 bg-gray-300 rounded-md dark:bg-gray-700 animate-pulse"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-0.5">
      {todos?.map((todo) => (
        <div
          key={todo.id}
          className="p-3 bg-slate-100 rounded-md mr-1"
        >
          {todo.caption}
        </div>
      ))}
    </div>
  )
}
