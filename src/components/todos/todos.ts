import template from './todos.html';
import './todos.scss';

import Todo from '../../models/Todo';
import TodosFilter from '../../models/todos-filter';
import { TodosStore } from '../../stores/todos';

export type EditableTodo = Todo & {
  $editing: boolean;
  $label: string;
};

export class TodosController implements ng.IComponentController {
  private items: Todo[];
  private activeFilter: TodosFilter;

  constructor(
    private $scope: ng.IScope,
    private Todos: TodosStore,
  ) {
    this.Todos.hook('*', ({ activeFilter, items }) => {
      this.items = items;
      this.activeFilter = activeFilter;
    }).destroyOn(this.$scope);
  }

  public toggleItem(selectedTodo: Todo) {
    this.Todos.dispatch('TOGGLE_ITEM', ({ items }) => {
      for (const item of items) {
        if (item.label === selectedTodo.label) {
          item.completed = selectedTodo.completed;
          item.dateCreated = selectedTodo.completed
            ? item.dateCreated : new Date();
          item.dateCompleted = selectedTodo.completed
            ? new Date() : null;

          break;
        }
      }

      return { items };
    });
  }

  public deleteItem(selectedTodo: Todo) {
    this.Todos.dispatch('DELETE_ITEM', ({ items }) => ({
      items: items.filter((item) => item.label !== selectedTodo.label),
    }));
  }

  public editItem(event: MouseEvent, selectedTodo: EditableTodo) {
    selectedTodo.$editing = true;
    selectedTodo.$label = selectedTodo.label;

    const element = event.srcElement && (event.srcElement as HTMLElement).parentElement;

    if (element) {
      setTimeout(() => {
        const input = element.querySelector<HTMLInputElement>('[type="text"]');

        if (input) {
          input.focus();
        }
      });
    }
  }

  public submitItem(event: KeyboardEvent, selectedTodo: EditableTodo) {
    if (event.key === 'Escape') {
      selectedTodo.$editing = false;
    } else if (event.key === 'Enter') {
      this.Todos.dispatch('EDIT_ITEM', ({ items }) => ({
        items: items.map((todo) => {
          if (todo.label === selectedTodo.label) {
            todo.label = selectedTodo.$label;
          }

          return todo;
        }),
      }));

      selectedTodo.label = selectedTodo.$label;
      selectedTodo.$editing = false;
    }
  }
}

export default {
  controller: TodosController,
  template,
} as ng.IComponentOptions;
