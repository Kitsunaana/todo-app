import {Checkbox, PenIcon, TrashIcon} from "../../../../shared/ui";
import clsx from "clsx";
import {useState} from "react";
import {ListItemEdit} from "../list-item-edit";

export const ListItem = ({
  caption,
  disabled,
  completed,
  onRemove,
  onToggle,
  onUpdate,
}: {
  caption: string
  completed: boolean
  disabled: boolean
  onRemove: () => void
  onToggle: (checked: boolean) => void
  onUpdate: (caption: string) => void
}) => {
  const [isEdit, setIsEdit] = useState(false)

  return (
    <div
      className={clsx("p-2 bg-slate-100 rounded-md mr-1 flex items-center gap-3 justify-between", {
        "opacity-75": disabled
      })}
    >
      <div className="flex gap-2 items-center">
        <Checkbox
          disabled={disabled}
          name="completed"
          checked={completed}
          onChange={(_, checked) => onToggle(checked)}
        />
        <ListItemEdit
          caption={caption}
          isEdit={isEdit}
          onUpdate={onUpdate}
          afterUpdate={setIsEdit}
        />
      </div>

      <div className="flex items-center gap-0.5">
        <button
          disabled={disabled}
          onClick={() => setIsEdit(prev => !prev)}
          className="hover:bg-blue-100 disabled:text-blue-300 disabled:hover:bg-transparent disabled:cursor-auto cursor-pointer transition duration-300 text-blue-500 rounded-full p-1"
        >
          <PenIcon fontSize={22}/>
        </button>

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
