import clsx from "clsx";
import {ReactNode} from "react";

export const SidebarListItem = ({
  date,
  caption,
  selectDate,
  onSelectDate,
  renderIcon,
}: {
  date: string | null
  caption: string
  selectDate: string | null
  onSelectDate: (date: string | null) => void
  renderIcon: (props: { className: string; fontSize: number }) => ReactNode
}) => {
  return (
    <div
      onClick={() => onSelectDate(date)}
      className={clsx("flex items-center gap-2 transition duration-300 py-1 px-2 border border-slate-300 rounded-md cursor-pointer hover:bg-slate-300", {
        "border-slate-400": selectDate === date
      })}
    >
      {renderIcon({
        className: "text-gray-500",
        fontSize: 22
      })}
      <span className="text-gray-700">{caption}</span>
    </div>
  )
}
