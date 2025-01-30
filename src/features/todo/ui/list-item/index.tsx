import {Checkbox, TrashIcon} from "../../../../shared/ui";
import clsx from "clsx";

export const ListItem = ({
  caption,
  disabled,
  completed,
  onRemove,
  onToggle,
}: {
  caption: string
  completed: boolean
  disabled: boolean
  onRemove: () => void
  onToggle: (checked: boolean) => void
}) => {
  return (
    <div
      className={clsx("p-2 bg-slate-100 rounded-md mr-1 flex items-center gap-3 justify-between", {
        "opacity-75": disabled
      })}
    >
      <div className="flex gap-2 items-center">
        <Checkbox
          name="completed"
          checked={completed}
          onChange={(_, checked) => onToggle(checked)}
        />
        <span>{caption}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          disabled={disabled}
          onClick={onRemove}
          className="hover:bg-rose-100 disabled:text-rose-300 disabled:hover:bg-transparent disabled:cursor-auto cursor-pointer transition duration-300 text-rose-500 rounded-full p-1"
        >
          <TrashIcon fontSize={22}/>
        </button>
      </div>
    </div>
  )
}
