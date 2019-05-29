interface Todo {
  completed: boolean;
  label: string;
  dateCreated: Date;
  dateCompleted: Date | null;
}

export default Todo;
