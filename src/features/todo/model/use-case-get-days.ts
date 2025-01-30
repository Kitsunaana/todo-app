import {useQuery} from "@tanstack/react-query";
import {todoQueryOptions} from "./query-options.ts";
import {IDaysGetResponse} from "../domain/schemas.ts";

export const useCaseGetDays = () => {
  const getDays = useQuery({
    ...todoQueryOptions.getTodoDays(),
    select: (data: IDaysGetResponse) => {
      const currentDate = new Date().toLocaleDateString()
      if (data.includes(currentDate)) return data

      return [currentDate].concat(data)
    }
  })

  return {
    days: getDays.data,
    isLoading: getDays.isLoading,
  }
}
