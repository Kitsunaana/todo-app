import "./index.css"
import {TodoList} from "../features/todo"
import {QueryClientProvider} from "@tanstack/react-query"
import {queryClient} from "../shared/configs/query-client.ts"

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
    </QueryClientProvider>
  )
}
