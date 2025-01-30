import * as yup from 'yup';

export const todosSchema = yup
  .array(
    yup
      .object({
        caption: yup.string().required(),
        completed: yup.boolean().default(false),
        id: yup.string().required(),
        createdAt: yup.number().required(),
        updatedAt: yup.number().required(),
      })
      .required()
  )
  .required()




export const todoGetAllParamsSchema = yup
  .object({
    date: yup.string().required().nullable()
  })
  .required()

export type ITodoGetAllParams = yup.InferType<typeof todoGetAllParamsSchema>

export const todoGetAllResponseSchema = yup
  .array(
    yup
      .object({
        id: yup.string().required(),
        caption: yup.string().required(),
        completed: yup.boolean().required(),
        createdAt: yup.number().required(),
        updatedAt: yup.number().required(),
      })
      .required()
  )
  .required()

export type ITodoGetAllResponse = yup.InferType<typeof todoGetAllResponseSchema>

export const daysGetResponseSchema = yup
  .array(yup.string().required())
  .required()

export type IDaysGetResponse = yup.InferType<typeof daysGetResponseSchema>

export const todoCreateBodySchema = yup
  .object({
    caption: yup.string().required()
  })
  .required()

export type ITodoCreateBody = yup.InferType<typeof todoCreateBodySchema>

export const todoCreateResponseSchema = yup
  .object({
    id: yup.string().required(),
    caption: yup.string().required(),
    completed: yup.boolean().required(),
    createdAt: yup.number().required(),
    updatedAt: yup.number().required(),
  })
  .required()

export type ITodoCreateResponse = yup.InferType<typeof todoCreateResponseSchema>

export const todoUpdateBodySchema = yup
  .object({
    id: yup.string().required(),
    caption: yup.string().required(),
    completed: yup.boolean().default(false).required(),
    createdAt: yup.number().required(),
    updatedAt: yup.number().required(),
  })
  .required()

export type ITodoUpdateBody = yup.InferType<typeof todoUpdateBodySchema>

export const todoUpdateResponseSchema = yup
  .object({
    id: yup.string().required(),
    caption: yup.string().required(),
    completed: yup.boolean().required(),
    createdAt: yup.number().required(),
    updatedAt: yup.number().required(),
  })
  .required()

export type ITodoUpdateResponse = yup.InferType<typeof todoUpdateResponseSchema>

export const todoRemoveParamsSchema = yup
  .object({
    todoId: yup.string().required()
  })
  .required()

export type ITodoRemoveParams = yup.InferType<typeof todoRemoveParamsSchema>

export const todoRemoveResponseSchema = yup
  .boolean()
  .required()

export type ITodoRemoveResponse = yup.InferType<typeof todoRemoveResponseSchema>
