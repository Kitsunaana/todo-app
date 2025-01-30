import { nanoid } from "nanoid"
import { mockLocalStorage } from "../../../shared/local-storage"
import { sleep } from "../../../shared/utils"
import { todosSchema } from "../domain/schemas"
import { ITodo } from "../domain/types"
import defaultTodos from "./default-todos.json"
import { ITodoListApi } from "./interface"

const STORAGE_KEY = "todos-kit"

const readTodos = (): ITodo[] => {
  try {
    return mockLocalStorage.get({
      key: STORAGE_KEY,
      parse: true,
      validate: (value) => todosSchema.validateSync(value)
    })
  } catch (error) {
    console.log(error)
    mockLocalStorage.add(STORAGE_KEY, defaultTodos)
    return defaultTodos
  }
}

const findTodoIndex = (id: string, todos: ITodo[]) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id)
  if (todoIndex === -1) throw new Error("todo not found")

  return todoIndex
}

const getDate = (createdAt: number) => new Date(createdAt).toLocaleDateString()

export const mockTodoListApi: ITodoListApi = {
  getAll: async (params) => (
    sleep(1000)
      .then(() => {
        const todos = readTodos()
          .sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)

        if (params?.date) {
          return todos.filter((todo) => (
            getDate(todo.createdAt) === params.date
          ))
        }

        return todos
      })
  ),

  getDays: async () => (
    sleep(1000)
      .then(() => {
        const todos = readTodos()

        return todos
          .sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)
          .reduce<string[]>((result, todo) => {
            const todoDate = getDate(todo.createdAt)

            if (result.includes(todoDate)) return result
            return result.concat(todoDate)
          }, [])
      })
  ),

  create: async (payload) => (
    sleep(1000)
      .then(() => {
        const buildTodo = {
          ...payload,
          id: nanoid(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }

        const todos = readTodos()
        mockLocalStorage.add(STORAGE_KEY, todos.concat(buildTodo))

        return buildTodo
      })
  ),

  update: async ({ id, ...other }) => (
    sleep(2000)
      .then(() => {
        const todos = readTodos()
        const todoIndex = findTodoIndex(id, todos)

        const todo = todos[todoIndex]
        const updatedTodo = Object.assign({}, todo, other)

        mockLocalStorage.add(STORAGE_KEY, todos.replace(todoIndex, updatedTodo))

        return updatedTodo
      })
  ),

  remove: async (params) => (
    sleep(2000)
      .then(() => {
        const todos = readTodos()
        const todoIndex = findTodoIndex(params.todoId, todos)

        mockLocalStorage.add(STORAGE_KEY, todos.replace(todoIndex))

        return true
      })
  )
}
