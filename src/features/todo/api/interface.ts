import { ITodo, ITodoFields } from "../domain/types"

export interface ITodoGetByIdParams {
  todoId: string
}

export interface ITodoRemoveParams {
  todoId: string
}

export interface ITodoGetAllParams {
  date: string | null
}

export interface ITodoListApi {
  getAll: (params: ITodoGetAllParams) => Promise<ITodo[]>
  getById: (params: ITodoGetByIdParams) => Promise<ITodo>
  create: (payload: ITodoFields) => Promise<ITodo>
  update: (payload: Partial<ITodo> & { id: string }) => Promise<ITodo>
  remove: (id: ITodoRemoveParams) => Promise<boolean>
  getDays: () => Promise<string[]>
}
