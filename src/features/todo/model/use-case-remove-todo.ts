import {useMutation, useQueryClient} from "@tanstack/react-query";
import {todoService} from "./service.ts";
import {FormEvent, useState} from "react";
import {todoQueryOptions} from "./query-options.ts";

export const useCaseRemoveTodo = () => {
  const [removedIds, setRemovedIds] = useState<string[]>([])

  const queryClient = useQueryClient()

  const removeTodoMutation = useMutation({
    mutationFn: (data: { todoId: string }) => todoService.remove(data),
    onMutate: (variables: { todoId: string }) => (
      setRemovedIds(prev => [...prev, variables.todoId])
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
