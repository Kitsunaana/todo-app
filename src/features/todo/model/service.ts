import {
  todoFieldsSchema,
  todoGetByIdSchema,
  todoRemoveResponseSchema,
  todoSchema,
  todosSchema
} from "../domain/schemas";
import { ITodo, ITodoFields } from "../domain/types";
import { ITodoGetByIdParams, ITodoListApi, ITodoRemoveParams } from "../api/interface"
import { mockTodoListApi } from "../api/mock-api"

class TodoService {
  public constructor(private readonly todoListApi: ITodoListApi) { }

  public async getAll(): Promise<ITodo[]> {
    const todos = await this.todoListApi.getAll()

    return todosSchema.validateSync(todos)
  }

  public async getById(params: ITodoGetByIdParams): Promise<ITodo> {
    const validateParam = todoGetByIdSchema.validateSync(params)
    const todo = await this.todoListApi.getById(validateParam)

    return todoSchema.validateSync(todo)
  }

  public async create(payload: ITodoFields): Promise<ITodo> {
    const validatePayload = todoFieldsSchema.validateSync(payload)
    const createdTodo = await this.todoListApi.create(validatePayload)

    return todoSchema.validateSync(createdTodo)
  }

  public async update(payload: ITodo): Promise<ITodo> {
    const validatePayload = todoSchema.validateSync(payload)
    const updatedTodo = await this.todoListApi.update(validatePayload)

    return todoSchema.validateSync(updatedTodo)
  }

  public async remove(params: ITodoRemoveParams): Promise<boolean> {
    const result = await this.todoListApi.remove(params)

    return todoRemoveResponseSchema.validateSync(result)
  }
}

export const todoService = new TodoService(mockTodoListApi)