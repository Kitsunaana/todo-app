import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ITodoRemoveParams } from "../domain/schemas.ts";
import { todoQueryOptions } from "./query-options.ts";
import { todoService } from "./service.ts";

export const useCaseRemoveTodo = () => {
  const [removedIds, setRemovedIds] = useState<string[]>([])

  const queryClient = useQueryClient()

  const removeTodoMutation = useMutation({
    mutationFn: (data: ITodoRemoveParams) => todoService.remove(data),
    onMutate: (variables: ITodoRemoveParams) => (
      setRemovedIds((prev) => [...prev, variables.todoId])
    ),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [todoQueryOptions.baseKey]
      })
    },
  })

  return {
    handleRemove: removeTodoMutation.mutate,
    getIsDisabled: (todoId: string) => (
      removeTodoMutation.isPending && removedIds.includes(todoId)
    ),
  }
}
