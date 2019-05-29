import angular from 'angular';
import todoAdd from './todo-add/todo-add';
import todosFilter from './todos-filter/todos-filter';
import todos from './todos/todos';

angular
  .module('app.components', [])
  .component('todoAdd', todoAdd)
  .component('todos', todos)
  .component('todosFilter', todosFilter);
