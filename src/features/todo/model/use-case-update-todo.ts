import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ITodoGetAllParams } from "../api/interface.ts";
import { ITodoUpdateBody } from "../domain/schemas.ts";
import { todoQueryOptions } from "./query-options.ts";
import { todoService } from "./service.ts";

export const useCaseUpdateTodo = (params: ITodoGetAllParams) => {
  const [updatedIds, setUpdatedIds] = useState<string[]>([])

  const queryClient = useQueryClient()

  const updateTodoMutation = useMutation({
    mutationFn: (payload: ITodoUpdateBody) => todoService.update(payload),
    onMutate: async (updatedTodo: ITodoUpdateBody) => {
      setUpdatedIds((prev) => [...prev, updatedTodo.id])
      // await queryClient.invalidateQueries({ queryKey: [todoQueryOptions.baseKey] })

      const queryKey = todoQueryOptions.getAllTodos(params).queryKey
      const previousTodos = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(
        queryKey,
        (prevTodos) => (
          prevTodos?.map((todo) => (
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

  return {
    handleUpdate: updateTodoMutation.mutate,
    getIsDisabled: (todoId: string) => (
      updateTodoMutation.isPending && updatedIds.includes(todoId)
    ),
  }
}
