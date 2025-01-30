import {SidebarList} from "../ui/sidebar-list";
import {useCaseGetTodos} from "../model/use-case-get-todos.ts";
import {Layout} from "../ui/layout";
import {useCaseCreateTodo} from "../model/use-case-create-todo.ts";
import {FormCreate} from "../ui/form-create";
import {List} from "../ui/list";
import {useQuery} from "@tanstack/react-query";
import {todoQueryOptions} from "../model/query-options.ts";
import {ListItem} from "../ui/list-item";
import {useCaseRemoveTodo} from "../model/use-case-remove-todo.ts";
import {SidebarListItem} from "../ui/sidebar-list-item";

export const TodoList = () => {
  const days = useQuery(todoQueryOptions.getTodoDays())

  const getTodos = useCaseGetTodos()
  const createTodo = useCaseCreateTodo()
  const removeTodo = useCaseRemoveTodo()

  return (
    <Layout
      caption={getTodos.selectDate ?? "Список задач"}
      sidebar={(
        <SidebarList
          isLoading={days.isLoading}
          dates={days.data}
          renderListItem={({ key, ...other }) => (
            <SidebarListItem
              {...other}
              key={key}
              selectDate={getTodos.selectDate}
              onSelectDate={getTodos.handleSelectDate}
            />
          )}
        />
      )}
      todos={(
        <List
          isLoading={getTodos.isLoading}
          todos={getTodos.todos}
          renderTodo={({ key, ...other }) => (
            <ListItem
              {...other}
              key={key}
              disabled={removeTodo.getIsDisabled(other.id)}
              onRemove={() => removeTodo.handleRemove({
                todoId: other.id
              })}
            />
          )}
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
