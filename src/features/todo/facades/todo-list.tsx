import {DaysList} from "../ui/days-list";
import {useCaseGetTodos} from "../model/use-case-get-todos.ts";
import {Layout} from "../ui/layout";
import {useCaseCreateTodo} from "../model/use-case-create-todo.ts";
import {FormCreate} from "../ui/form-create";
import {List} from "../ui/list/list.tsx";
import {useQuery} from "@tanstack/react-query";
import {todoQueryOptions} from "../model/query-options.ts";

export const TodoList = () => {
  const days = useQuery(todoQueryOptions.getTodoDays())

  const getTodos = useCaseGetTodos()
  const createTodo = useCaseCreateTodo()

  return (
    <Layout
      caption="Список задач"
      sidebar={(
        <DaysList
          isLoading={days.isLoading}
          days={days.data}
        />
      )}
      todos={(
        <List
          isLoading={getTodos.isLoading}
          todos={getTodos.todos}
        />
      )}
      form={(
        <FormCreate
          isLoading={createTodo.isLoading}
          handleCreate={createTodo.handleCreate}
        />
      )}
    />
  )
}
