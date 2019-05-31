import NgStore from 'angularjs-store';
import Todo from '../models/todo';
import TodosFilter from '../models/todos-filter';

export interface TodosState {
  activeFilter: TodosFilter;
  items: Todo[];
}

export type TodosActions = [
  'ADD_TODO',
  'CHANGE_FILTER',
  'DELETE_ITEM',
  'EDIT_ITEM',
  'TOGGLE_ITEM',
];

export type TodosStore = NgStore<TodosState, TodosActions>;

export default function todosStore(): TodosStore {
  // Load TodosStore data from local storage
  const lastItems = JSON.parse(window.localStorage.getItem('TodosStore_items') || '[]');
  const lastActiveFilter = window.localStorage.getItem('TodoStore_activeFilter') || 'all';

  // Create a new store using the data from local storage.
  const store = new NgStore<TodosState, TodosActions>({
    activeFilter: lastActiveFilter as TodosFilter,
    items: (lastItems as Todo[]).map((item) => {
      item.dateCreated = new Date(item.dateCreated);
      item.dateCompleted = item.dateCompleted ? new Date(item.dateCompleted) : null;
      return item;
    }),
  });

  // Automatically save items to localStorage
  store.hook(['ADD_TODO', 'DELETE_ITEM', 'TOGGLE_ITEM', 'EDIT_ITEM'], ({ items }) => {
    const savedItems = JSON.stringify(items);
    window.localStorage.setItem('TodosStore_items', savedItems);
  });

  // Automatically save activeFilter to localStorage
  store.hook('CHANGE_FILTER', ({ activeFilter }) => {
    window.localStorage.setItem('TodoStore_activeFilter', activeFilter);
  });

  return store;
}
