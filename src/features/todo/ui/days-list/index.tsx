import {CalendarIcon} from "../../../../shared/ui";
import clsx from "clsx";

export const DaysList = ({
  isLoading,
  dates,
  selectDate,
  onSelectDate,
}: {
  isLoading: boolean
  dates: string[] | undefined
  selectDate: string | null
  onSelectDate: (date: string) => void
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({length: 5}, (_, i) => i).map((i) => (
          <div
            key={i}
            className="h-[34px] bg-gray-300 rounded-md dark:bg-gray-700 animate-pulse"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {dates?.map((date) => (
        <div
          key={date}
          onClick={() => onSelectDate(date)}
          className={clsx("flex items-center gap-2 transition duration-300 py-1 px-2 border border-slate-300 rounded-md cursor-pointer hover:bg-slate-300", {
            "border border-slate-400": selectDate === date
          })}
        >
          <CalendarIcon fontSize={22} className="text-gray-500"/>
          <span className="text-gray-700">{date}</span>
        </div>
      ))}
    </div>
  )
}
