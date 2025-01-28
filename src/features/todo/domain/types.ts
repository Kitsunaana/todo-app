export interface ITodoFields {
  caption: string
  description: string
  completed: boolean
}

export interface ITodo extends ITodoFields {
  id: string
  createdAt: number
  updatedAt: number
}
