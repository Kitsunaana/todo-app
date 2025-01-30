import { todoService } from "../features/todo/model/service"

export const App = () => {
  todoService.getAll().then(console.log)

  /* todoService
      caption: "test",
      completed: true,
      description: "123",
    })
    .then(console.log) */


  todoService.getDays()
    .then(console.log)

  todoService.getAll({ date: "30.01.2025" })
    .then(console.log)

  /*todoService.create({
    caption: "Для теста",
    completed: false,
  })*/

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
