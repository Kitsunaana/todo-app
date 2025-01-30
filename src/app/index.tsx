import { QueryClientProvider } from "@tanstack/react-query"
import { TodoList } from "../features/todo"
import { queryClient } from "../shared/configs/query-client.ts"
import "./index.css"

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
    </QueryClientProvider>
  )
}
