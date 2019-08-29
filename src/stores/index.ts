import todosStore from './todos-store';

angular
  .module('app.stores', [])
  .service('todosStore', todosStore);
