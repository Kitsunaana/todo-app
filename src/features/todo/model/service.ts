import {
  todoFieldsSchema,
  todoGetByIdSchema,
  todoRemoveResponseSchema,
  todoSchema,
  todosSchema
} from "../domain/schemas";
import { ITodo, ITodoFields } from "../domain/types";
import {ITodoGetAllParams, ITodoGetByIdParams, ITodoListApi, ITodoRemoveParams} from "../api/interface"
import { mockTodoListApi } from "../api/mock-api"

class TodoService {
  public constructor(private readonly todoListApi: ITodoListApi) { }

  public async getAll(params: ITodoGetAllParams): Promise<ITodo[]> {
    const todos = await this.todoListApi.getAll(params)

    return todosSchema.validate(todos)
  }

  public async getDays(): Promise<string[]> {
    return await this.todoListApi.getDays()
  }

  public async getById(params: ITodoGetByIdParams): Promise<ITodo> {
    const validateParam = todoGetByIdSchema.validateSync(params)
    const todo = await this.todoListApi.getById(validateParam)

    return todoSchema.validate(todo)
  }

  public async create(payload: { caption: string }): Promise<ITodo> {
    const createdTodo = await this.todoListApi.create({
      ...payload,
      completed: false
    })

    return todoSchema.validate(createdTodo)
  }

  public async update(payload: Partial<ITodo> & { id: string }): Promise<ITodo> {
    // const validatePayload = await todoSchema.validate(payload)
    const updatedTodo = await this.todoListApi.update(payload);

    return todoSchema.validate(updatedTodo)
  }

  public async remove(params: ITodoRemoveParams): Promise<boolean> {
    try {
      const result = await this.todoListApi.remove(params)

      return todoRemoveResponseSchema.validate(result)
    } catch (error) {
      console.log(error)
    }
  }
}

export const todoService = new TodoService(mockTodoListApi)
