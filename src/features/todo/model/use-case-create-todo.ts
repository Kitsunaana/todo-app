import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent } from "react";
import { ITodoCreateBody } from "../domain/schemas.ts";
import { todoQueryOptions } from "./query-options.ts";
import { todoService } from "./service.ts";

export const useCaseCreateTodo = () => {
  const queryClient = useQueryClient()

  const createTodoMutation = useMutation({
    mutationFn: (payload: ITodoCreateBody) => todoService.create(payload),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [todoQueryOptions.baseKey]
      })
    },
  })

  const handleCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const caption = String(formData.get("caption") ?? "")
    if (!caption) return

    createTodoMutation.mutate({ caption })

    event.currentTarget.reset()
  }

  return {
    isLoading: createTodoMutation.isPending,
    handleCreate,
  }
}
