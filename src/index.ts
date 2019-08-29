import './index.scss';

import './components';
import './filters';
import './stores';

angular
  .module('app', [
    'app.stores',
    'app.filters',
    'app.components',
  ]);
