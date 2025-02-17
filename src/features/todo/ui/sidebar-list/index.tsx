import { ReactNode } from "react";
import { BurgerIcon, CalendarIcon } from "../../../../shared/ui";
import {date} from "yup";

type ListItemIconProps = {
  className: string
  fontSize: number
}

type ListItemProps = {
  key: string
  date: string | null
  caption: string
  renderIcon: (props: ListItemIconProps) => ReactNode
}

export const SidebarList = ({
  isLoading,
  dates,
  renderListItem
}: {
  isLoading: boolean
  dates: string[] | undefined
  renderListItem: (props: ListItemProps) => ReactNode
}) => {
  // const currentDate = new Date().toLocaleDateString()

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
      {renderListItem({
        key: "all",
        date: null,
        caption: "Все задачи",
        renderIcon: (props) => (
          <BurgerIcon className={props.className} fontSize={props.fontSize} />
        )
      })}

      {/*{(dates?.includes(currentDate) ? (dates || []) : [currentDate, ...(dates || [])]).map((date) => (*/}
      {dates?.map((date) => (
        renderListItem({
          date,
          key: date,
          caption: date,
          renderIcon: (props) => (
            <CalendarIcon className={props.className} fontSize={props.fontSize} />
          )
        })
      ))}
    </div>
  )
}
