import { FormEvent } from "react";
import { SaveIcon } from "../../../../shared/ui";

export const ListItemEdit = ({
  caption,
  isEdit,
  onUpdate,
  afterUpdate,
}: {
  caption: string
  isEdit: boolean
  onUpdate: (caption: string) => void
  afterUpdate: (isEdit: boolean) => void
}) => {
  if (!isEdit) return caption

  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const caption = String(formData.get("caption") ?? "")
    if (!caption) return

    afterUpdate(false)
    onUpdate(caption)
  }

  return (
    <form
      onSubmit={handleUpdate}
      className="flex items-center gap-2"
    >
      <input
        type="text"
        name="caption"
        placeholder={caption}
        defaultValue={caption}
        className="block w-full py-0.5 px-1.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />

      <button
        type="submit"
        className="hover:bg-green-100 disabled:text-green-300 disabled:hover:bg-transparent disabled:cursor-auto cursor-pointer transition duration-300 text-green-500 rounded-full p-1"
      >
        <SaveIcon fontSize={22}/>
      </button>
    </form>
  )
}
