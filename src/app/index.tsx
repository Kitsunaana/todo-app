import { todoService } from "../features/todo/model/service"

export const App = () => {
  todoService.getAll().then(console.log)

  /* todoService
      caption: "test",
      completed: true,
      description: "123",
    })
    .then(console.log) */

  todoService
    .getById({ todoId: "PKgi60duEezUCJbq1IdAj" })
    .then(console.log)
    .catch(console.log)

  /* todoService
    .update({
      id: "PKgi60duEezUCJbq1IdAj",
      caption: "new caption test",
      completed: false,
      description: "qwe asd 123",
      createdAt: 1738051193660,
      updatedAt: 1738051193660
    })
    .then(console.log) */

  /* todoService
    .remove({ todoId: "PKgi60duEezUCJbq1IdAj" })
    .then(console.log) */

  return (
    <div>App</div>
  )
}