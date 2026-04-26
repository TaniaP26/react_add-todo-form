import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import type { Todo } from './components/TodoInfo';

function getNewTodosId(todoList: Todo[]) {
  const maxId = Math.max(...todoList.map(todo => todo.id), 0);

  return maxId + 1;
}

export const App = () => {
  const [title, setTitle] = useState('Please enter a title');
  const [userId, setUserId] = useState(0);
  const [todoList, setTodoList] = useState<Todo[]>(todosFromServer);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    setError('');
    setSuccess('');

    // ❗ валідація
    if (!title || title === 'Please enter a title') {
      setError('Please enter a title');

      return;
    }

    if (userId === 0) {
      setError('Please choose a user');

      return;
    }

    const user = usersFromServer.find(u => u.id === userId);

    const newTodo: Todo = {
      id: getNewTodosId(todoList),
      title,
      completed: false,
      user,
    };

    setTodoList(prev => [...prev, newTodo]);

    // ✅ повертаємо до початкового стану
    setTitle('Please enter a title');
    setUserId(0);

    setSuccess('Todo added successfully');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={addTodo}>
        <div className="field">
          <label htmlFor="title-id">Title: </label>

          <input
            type="text"
            id="title-id"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="user-id">User: </label>

          <select
            id="user-id"
            value={userId}
            onChange={event => setUserId(+event.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {error && <span className="error">{error}</span>}
        {success && <span className="success">{success}</span>}

        <button type="submit">Add</button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
