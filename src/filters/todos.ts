import Todo from '../models/Todo';
import TodosFilter from '../models/todos-filter';

const filter: ng.Injectable<ng.FilterFactory> = function todos($filter: ng.IFilterService) {
  return (items: Todo[], activeFilter: TodosFilter) => {
    const filterredTodos = items.filter((item) => (
      activeFilter === 'all' ||
      (activeFilter === 'active' && !item.completed) ||
      (activeFilter === 'completed' && item.completed)
    ));

    return $filter('orderBy')(
      filterredTodos,
      activeFilter === 'completed' ? '-dateCompleted' : 'dateCreated',
    );
  };
};

export default filter;
