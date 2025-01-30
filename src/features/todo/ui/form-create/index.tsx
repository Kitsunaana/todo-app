import { FormEvent } from "react";

export const FormCreate = ({
  isLoading,
  handleCreate,
}: {
  isLoading: boolean
  handleCreate: (event: FormEvent<HTMLFormElement>) => void
}) => (
  <form
    onSubmit={handleCreate}
    className="flex items-center gap-2"
  >
    <input
      type="text"
      name="caption"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Текст задачи"
    />
    <button
      type="submit"
      disabled={isLoading}
      className="disabled:opacity-50 disabled:cursor-auto cursor-pointer px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Создать
    </button>
  </form>
)
