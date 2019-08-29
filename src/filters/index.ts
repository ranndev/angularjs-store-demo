import todos from './todos';

angular
  .module('app.filters', [])
  .filter('todos', todos);
