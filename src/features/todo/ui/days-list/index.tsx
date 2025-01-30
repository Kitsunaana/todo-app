import {CalendarIcon} from "../../../../shared/ui";

export const DaysList = ({
  isLoading,
  days,
}: {
  isLoading: boolean
  days: string[] | undefined
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
      {days?.map((day) => (
        <div
          key={day}
          className="flex items-center gap-2 transition duration-300 py-1 px-2 border border-slate-300 rounded-md cursor-pointer hover:bg-slate-300"
        >
          <CalendarIcon fontSize={22} className="text-gray-500"/>
          <span className="text-gray-700">{day}</span>
        </div>
      ))}
    </div>
  )
}
