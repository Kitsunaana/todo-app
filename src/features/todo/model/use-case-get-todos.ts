import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { todoQueryOptions } from "./query-options.ts";

export const useCaseGetTodos = () => {
  const [selectDate, setSelectDate] = useState<null | string>(
    new Date().toLocaleDateString()
  )

  const getTodos = useQuery(todoQueryOptions.getAllTodos({
    date: selectDate,
  }))

  const handleSelectDate = (date: string | null) => setSelectDate(date)

  return {
    handleSelectDate,
    selectDate,
    isLoading: getTodos.isLoading,
    todos: getTodos.data
  }
}
