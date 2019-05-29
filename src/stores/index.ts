import angular from 'angular';
import Todos from './todos';

angular
  .module('app.stores', [])
  .service('Todos', Todos);
