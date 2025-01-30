import {useQuery} from "@tanstack/react-query";
import {todoQueryOptions} from "./query-options.ts";
import {useState} from "react";

export const useCaseGetTodos = () => {
  const [selectDate, setSelectDate] = useState<null | string>(null)

  const getTodos = useQuery(todoQueryOptions.getAllTodos({
    date: selectDate,
  }))

  const handleSelectDate = (date: string) => setSelectDate(date)

  return {
    handleSelectDate,
    selectDate,
    isLoading: getTodos.isLoading,
    todos: getTodos.data
  }
}
