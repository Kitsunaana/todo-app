import { nanoid } from "nanoid"
import { sleep } from "../../../shared/utils"
import { mockLocalStorage } from "../../../shared/local-storage"
import { ITodoListApi } from "./interface"
import { ITodo } from "../domain/types"
import { todosSchema } from "../domain/schemas"

const STORAGE_KEY = "todos-kit"

const initState = () => mockLocalStorage.add(STORAGE_KEY, [])

const readTodos = (): ITodo[] => {
  const todos = mockLocalStorage.get({
    key: STORAGE_KEY,
    parse: true,
  })

  const isValidTodos = todosSchema.isValidSync(todos)
  if (isValidTodos) return todos as ITodo[]

  initState()
  return []
}

const findTodoIndex = (id: string, todos: ITodo[]) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id)
  if (todoIndex === -1) throw new Error("todo not found")

  return todoIndex
}

export const mockTodoListApi: ITodoListApi = {
  getAll: async (params) => (
    sleep(1000)
      .then(() => {
        const todos = readTodos()

        if (params?.date) {
          return todos.filter((todo) => {
            const todoDate = new Date(todo.createdAt).toLocaleDateString()

            return todoDate === params.date
          })
        }

        return todos
      })
  ),

  getDays: async () => (
    sleep(1000)
      .then(() => {
        const todos = readTodos()

        return todos.reduce<string[]>((result, todo) => {
          const date = new Date(todo.createdAt).toLocaleDateString()

          if (result.includes(date)) return result
          return result.concat(date)
        }, [])
      })
  ),

  getById: async (params) => (
    sleep(1000)
      .then(() => {
        const todos = readTodos()
        const todoIndex = findTodoIndex(params.todoId, todos)

        return todos[todoIndex]
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
    sleep(1000)
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
    sleep(1000)
      .then(() => {
        const todos = readTodos()
        const todoIndex = findTodoIndex(params.todoId, todos)

        mockLocalStorage.add(STORAGE_KEY, todos.replace(todoIndex))

        return true
      })
  )
}
