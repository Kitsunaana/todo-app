import {ReactNode} from "react";

export const Layout = ({
  sidebar,
  todos,
  form,
  caption,
}: {
  sidebar: ReactNode
  todos: ReactNode
  form: ReactNode
  caption: string
}) => {
  return (
    <div className="flex h-full">
      <div className="bg-slate-100 h-full p-2 min-w-48">
        {sidebar}
      </div>
      <div className="p-2 overflow-hidden flex flex-col gap-4 grow bg-indigo-400">
        <h4 className="text-2xl font-bold text-white">{caption}</h4>

        <div className="overflow-y-auto h-full">
          {todos}
        </div>

        <div className="bg-slate-200 rounded-md p-1">
          {form}
        </div>
      </div>
    </div>
  )
}
