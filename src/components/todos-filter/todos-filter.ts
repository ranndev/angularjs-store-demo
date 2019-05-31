import TodosFilter from '../../models/todos-filter';
import { TodosStore } from '../../stores/todos-store';
import template from './todos-filter.html';
import './todos-filter.scss';

export class TodosFilterController implements ng.IComponentController {
  public static $inject = ['$scope', 'todosStore'];
  public activeFilter: TodosFilter;

  constructor(
    public $scope: ng.IScope,
    public todosStore: TodosStore,
  ) {
    this.todosStore.hook('CHANGE_FILTER', ({ activeFilter }) => {
      this.activeFilter = activeFilter;
    }).destroyOn(this.$scope);
  }

  public changeFilter(filter: TodosFilter) {
    this.todosStore.dispatch('CHANGE_FILTER', { activeFilter: filter });
  }
}

export default {
  controller: TodosFilterController,
  template,
} as ng.IComponentOptions;
