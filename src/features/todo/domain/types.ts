export interface ITodoFields {
  caption: string
  completed: boolean
}

export interface ITodo extends ITodoFields {
  id: string
  createdAt: number
  updatedAt: number
}
