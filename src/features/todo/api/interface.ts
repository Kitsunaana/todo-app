import { ITodo, ITodoFields } from "../domain/types"

export interface ITodoGetByIdParams {
  todoId: string
}

export interface ITodoRemoveParams {
  todoId: string
}

export interface ITodoListApi {
  getAll: () => Promise<ITodo[]>
  getById: (params: ITodoGetByIdParams) => Promise<ITodo>
  create: (payload: ITodoFields) => Promise<ITodo>
  update: (payload: ITodo) => Promise<ITodo>
  remove: (id: ITodoRemoveParams) => Promise<boolean>
}