import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State variables
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  // Function to fetch todos from local storage periodically
  function fetchTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }

  useEffect(() => {
    // Fetch todos when component mounts
    fetchTodos();

    const interval = setInterval(fetchTodos, 1000); // Fetch todos every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  useEffect(() => {
    // Save todos to local storage whenever it changes
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleAddTodo() {
    if (inputValue.trim() !== '') {
      const newTodo = {
        text: inputValue.trim() + "  -  " + currentUser,
        isCompleted: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  }

  function toggleTodo(index) {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  }

  function handleEditTodo(index, newValue) {
    const newTodos = [...todos];
    newTodos[index].text = newValue;
    setTodos(newTodos);
  }

  function handleDeleteTodo(index) {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  }

  function handleLogin(userName) {
    setCurrentUser(userName);
  }

  function handleLogout() {
    setCurrentUser('');
  }

  return (
    <div className="app">
      {currentUser ? (
        <div className= "darmian">
          <div className="header">
            <h1>Welcome, {currentUser}!</h1>
            <button className= "logout" onClick={handleLogout}>Logout</button>
          </div>
          <div className="card">
            <div className="todo-list">
              <ul>
                {todos.map((todo, index) => (
                  <li key={index} className="todo-item">
                    <input
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={() => toggleTodo(index)}
                    />
                    <span style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
                      {todo.text}
                    </span>
                    <button className="add-btn" onClick={() => handleEditTodo(index, prompt('Edit todo:', todo.text))}>Edit</button>
                    &nbsp;
                    <button className="add-btn" onClick={() => handleDeleteTodo(index)}>Delete</button>
                  </li>
                ))}
              </ul>
              <div className="add-todo">
                <input
                  type="text"
                  placeholder="Enter here..."
                  className="todo-input"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <button className="add-btn" onClick={handleAddTodo}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="login-container">
          <h1>Just Do it</h1>
          <button onClick={() => handleLogin(prompt('Enter your name:'))}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
