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

    return todosSchema.validate(todos)
  }

  public async getById(params: ITodoGetByIdParams): Promise<ITodo> {
    const validateParam = todoGetByIdSchema.validateSync(params)
    const todo = await this.todoListApi.getById(validateParam)

    return todoSchema.validate(todo)
  }

  public async create(payload: ITodoFields): Promise<ITodo> {
    const validatePayload = todoFieldsSchema.validateSync(payload)
    const createdTodo = await this.todoListApi.create(validatePayload)

    return todoSchema.validate(createdTodo)
  }

  public async update(payload: ITodo): Promise<ITodo> {
    const validatePayload = await todoSchema.validate(payload)
    const updatedTodo = await this.todoListApi.update(validatePayload as ITodo);

    return todoSchema.validate(updatedTodo)
  }

  public async remove(params: ITodoRemoveParams): Promise<boolean> {
    const result = await this.todoListApi.remove(params)

    return todoRemoveResponseSchema.validate(result)
  }
}

export const todoService = new TodoService(mockTodoListApi)
