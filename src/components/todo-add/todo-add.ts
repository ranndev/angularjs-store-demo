import template from './todo-add.html';
import './todo-add.scss';

import Todo from '../../models/todo';
import { TodosStore } from '../../stores/todos';

export class TodoAddController implements ng.IComponentController {
  public static $inject = ['$scope', 'Todos'];
  public items: Todo[];
  public label: string = '';
  public form: ng.IFormController & {
    label: ng.INgModelController & {
      $$element: JQLite & { 0: HTMLInputElement },
    };
  };

  constructor(
    public $scope: ng.IScope,
    public Todos: TodosStore,
  ) {
    this.Todos.hook(['ADD_TODO', 'DELETE_ITEM'], ({ items }) => {
      this.items = items;
    }).destroyOn($scope);
  }

  public addTodo(label: string = this.label) {
    this.Todos.dispatch('ADD_TODO', ({ items }) => ({
      items: [...items, {
        completed: false,
        dateCompleted: null,
        dateCreated: new Date(),
        label,
      }],
    }));

    this.label = '';
    this.form.label.$$element[0].focus();
  }

  public checkDuplicate() {
    let valid: boolean = true;

    for (const item of this.items) {
      if (item.label === this.label) {
        valid = false;
        break;
      }
    }

    this.form.label.$setValidity('duplicate', valid);
  }
}

export default {
  controller: TodoAddController,
  template,
} as ng.IComponentOptions;
