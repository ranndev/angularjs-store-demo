import './index.scss';

import angular from 'angular';
import 'jquery';

import './components';
import './filters';
import './stores';

angular
  .module('app', [
    'app.stores',
    'app.filters',
    'app.components',
  ]);
