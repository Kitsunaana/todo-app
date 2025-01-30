import {useMutation, useQueryClient} from "@tanstack/react-query";
import {todoService} from "./service.ts";
import {FormEvent} from "react";
import {todoQueryOptions} from "./query-options.ts";

export const useCaseCreateTodo = () => {
  const queryClient = useQueryClient()

  const createTodoMutation = useMutation({
    mutationFn: (payload: { caption: string }) => todoService.create(payload),
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

    createTodoMutation.mutate({
      caption,
      completed: false
    })

    event.currentTarget.reset()
  }

  return {
    isLoading: createTodoMutation.isPending,
    handleCreate,
  }
}
