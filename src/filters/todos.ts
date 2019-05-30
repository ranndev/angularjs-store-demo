import Todo from '../models/todo';
import TodosFilter from '../models/todos-filter';

const todos: ng.Injectable<ng.FilterFactory> = ($filter: ng.IFilterService) => {
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

todos.$inject = ['$filter'];

export default todos;
