import {useQuery} from "@tanstack/react-query";
import {todoQueryOptions} from "./query-options.ts";

export const useCaseGetTodos = () => {
  const getTodos = useQuery(todoQueryOptions.getAllTodos())

  return {
    isLoading: getTodos.isLoading,
    todos: getTodos.data
  }
}
