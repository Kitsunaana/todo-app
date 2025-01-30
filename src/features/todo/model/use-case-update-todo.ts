import {useMutation, useQueryClient} from "@tanstack/react-query";
import {todoService} from "./service.ts";
import {FormEvent} from "react";
import {todoQueryOptions} from "./query-options.ts";
import {ITodo} from "../domain/types.ts";
import {ITodoGetAllParams} from "../api/interface.ts";

export const useCaseUpdateTodo = (params: ITodoGetAllParams) => {
  const queryClient = useQueryClient()

  const updateTodoMutation = useMutation({
    mutationFn: (payload: ITodo) => todoService.update(payload),
    onMutate: async (updatedTodo: ITodo) => {
      // await queryClient.invalidateQueries({ queryKey: [todoQueryOptions.baseKey] })

      const queryKey = todoQueryOptions.getAllTodos(params).queryKey
      const previousTodos = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(
        queryKey,
        (prevTodos: ITodo[]) => (
          prevTodos.map((todo) => (
            todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
          ))
        )
      )

      return {
        previousTodos
      }
    },
    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(
          todoQueryOptions.getAllTodos(params).queryKey,
          context.previousTodos
        )
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [todoQueryOptions.baseKey]
      })
    },
  })

  const handleToggle = (payload: ITodo) => updateTodoMutation.mutate(payload)

  return {
    handleToggle,
  }
}
