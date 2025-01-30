import {queryOptions} from "@tanstack/react-query";
import {todoService} from "./service.ts";

export const todoQueryOptions = {
  baseKey: "todos",

  getTodoDays: () => (
    queryOptions({
      queryKey: [todoQueryOptions.baseKey, "days"],
      queryFn: () => todoService.getDays(),
    })
  ),
}
