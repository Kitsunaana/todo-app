import { ITodoListApi } from "../api/interface";
import { mockTodoListApi } from "../api/mock-api";
import {
  daysGetResponseSchema,
  IDaysGetResponse,
  ITodoCreateBody,
  ITodoCreateResponse,
  ITodoGetAllParams,
  ITodoGetAllResponse,
  ITodoRemoveParams,
  ITodoRemoveResponse,
  ITodoUpdateBody,
  ITodoUpdateResponse,
  todoCreateBodySchema,
  todoCreateResponseSchema,
  todoGetAllParamsSchema,
  todoGetAllResponseSchema,
  todoRemoveParamsSchema,
  todoRemoveResponseSchema,
  todoUpdateBodySchema,
  todoUpdateResponseSchema
} from "../domain/schemas.ts";


class TodoService {
  public constructor(private readonly todoListApi: ITodoListApi) { }

  public async getAll(params: ITodoGetAllParams): Promise<ITodoGetAllResponse> {
    const validatedParams = todoGetAllParamsSchema.validateSync(params)
    const todos = await this.todoListApi.getAll(validatedParams)

    return todoGetAllResponseSchema.validate(todos)
  }

  public async getDays(): Promise<IDaysGetResponse> {
    const days = await this.todoListApi.getDays()

    return daysGetResponseSchema.validateSync(days)
  }

  public async create(payload: ITodoCreateBody): Promise<ITodoCreateResponse> {
    const validatedPayload = todoCreateBodySchema.validateSync(payload)
    const createdTodo = await this.todoListApi.create({
      ...validatedPayload,
      completed: false
    })

    return todoCreateResponseSchema.validate(createdTodo)
  }

  public async update(payload: ITodoUpdateBody): Promise<ITodoUpdateResponse> {
    const validatedPayload = todoUpdateBodySchema.validateSync(payload)
    const updatedTodo = await this.todoListApi.update(validatedPayload);

    return todoUpdateResponseSchema.validate(updatedTodo)
  }

  public async remove(params: ITodoRemoveParams): Promise<ITodoRemoveResponse> {
    const validatedParams = todoRemoveParamsSchema.validateSync(params)
    const result = await this.todoListApi.remove(validatedParams)

    return todoRemoveResponseSchema.validate(result)
  }
}

export const todoService = new TodoService(mockTodoListApi)
