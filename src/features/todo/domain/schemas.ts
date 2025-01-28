import * as yup from 'yup';

export const todoFieldsSchema = yup
  .object({
    caption: yup.string().required(),
    description: yup.string().default(""),
    completed: yup.boolean().default(false)
  })
  .required()

export const todoSchema = todoFieldsSchema
  .shape({
    id: yup.string().required(),
    createdAt: yup.number().required(),
    updatedAt: yup.number().required(),
  })
  .required()

export const todosSchema = yup
  .array(todoSchema)
  .required()

export const todoGetByIdSchema = yup
  .object({
    todoId: yup.string().required(),
  })
  .required()

export const todoRemoveSchema = yup
  .object({
    todoId: yup.string().required(),
  })
  .required()

export const todoRemoveResponseSchema = yup
  .boolean()
  .required()