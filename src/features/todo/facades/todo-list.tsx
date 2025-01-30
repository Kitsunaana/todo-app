import { useCaseCreateTodo } from "../model/use-case-create-todo.ts";
import { useCaseGetTodos } from "../model/use-case-get-todos.ts";
import { useCaseRemoveTodo } from "../model/use-case-remove-todo.ts";
import { useCaseUpdateTodo } from "../model/use-case-update-todo.ts";
import { FormCreate } from "../ui/form-create";
import { Layout } from "../ui/layout";
import { List } from "../ui/list";
import { ListItem } from "../ui/list-item";
import { SidebarList } from "../ui/sidebar-list";
import { SidebarListItem } from "../ui/sidebar-list-item";
import {useCaseGetDays} from "../model/use-case-get-days.ts";

export const TodoList = () => {
  const getDays = useCaseGetDays()

  const getTodos = useCaseGetTodos()
  const createTodo = useCaseCreateTodo()
  const removeTodo = useCaseRemoveTodo()
  const updateTodo = useCaseUpdateTodo({ date: getTodos.selectDate })

  return (
    <Layout
      caption={getTodos.selectDate ?? "Список задач"}
      sidebar={(
        <SidebarList
          isLoading={getDays.isLoading}
          dates={getDays.days}
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
              disabled={(
                removeTodo.getIsDisabled(other.id) ||
                updateTodo.getIsDisabled(other.id)
              )}
              onToggle={(checked) => (
                updateTodo.handleUpdate({ ...other, completed: checked })
              )}
              onUpdate={(caption) => (
                updateTodo.handleUpdate({ ...other, caption })
              )}
              onRemove={() => (
                removeTodo.handleRemove({ todoId: other.id })
              )}
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

