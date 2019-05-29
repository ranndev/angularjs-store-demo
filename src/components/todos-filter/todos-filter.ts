import TodosFilter from '../../models/todos-filter';
import { TodosStore } from '../../stores/todos';
import template from './todos-filter.html';
import './todos-filter.scss';

export class TodosFilterController implements ng.IComponentController {
  private activeFilter: TodosFilter;

  constructor(
    private $scope: ng.IScope,
    private Todos: TodosStore,
  ) {
    this.Todos.hook('CHANGE_FILTER', ({ activeFilter }) => {
      this.activeFilter = activeFilter;
    }).destroyOn(this.$scope);
  }

  public changeFilter(filter: TodosFilter) {
    this.Todos.dispatch('CHANGE_FILTER', { activeFilter: filter });
  }
}

export default {
  controller: TodosFilterController,
  template,
} as ng.IComponentOptions;
