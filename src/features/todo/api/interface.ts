import { ITodo, ITodoFields } from "../domain/types"

export interface ITodoRemoveParams {
  todoId: string
}

export interface ITodoGetAllParams {
  date: string | null
}

export interface ITodoListApi {
  getAll: (params: ITodoGetAllParams) => Promise<ITodo[]>
  create: (payload: ITodoFields) => Promise<ITodo>
  update: (payload: ITodo) => Promise<ITodo>
  remove: (id: ITodoRemoveParams) => Promise<boolean>
  getDays: () => Promise<string[]>
}
