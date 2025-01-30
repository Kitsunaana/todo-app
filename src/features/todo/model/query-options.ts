import { queryOptions } from "@tanstack/react-query";
import { ITodoGetAllParams } from "../api/interface.ts";
import { todoService } from "./service.ts";

export const todoQueryOptions = {
  baseKey: "todos",

  getTodoDays: () => (
    queryOptions({
      queryKey: [todoQueryOptions.baseKey, "days"],
      queryFn: () => todoService.getDays(),
    })
  ),

  getAllTodos: (params: ITodoGetAllParams) => (
    queryOptions({
      queryKey: [todoQueryOptions.baseKey, "list", params],
      queryFn: () => todoService.getAll(params)
    })
  )
}
