import TodosFilter from '../../models/todos-filter';
import { TodosStore } from '../../stores/todos';
import template from './todos-filter.html';
import './todos-filter.scss';

export class TodosFilterController implements ng.IComponentController {
  public static $inject = ['$scope', 'Todos'];
  public activeFilter: TodosFilter;

  constructor(
    public $scope: ng.IScope,
    public Todos: TodosStore,
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
