import { useEffect } from 'react';
import './App.css';
import ToDoList from './components/ToDoList/ToDoList';
import ToDo from './store/ToDo';

const App = (): JSX.Element => {
  useEffect(() => {
    const getToDoList = JSON.parse(localStorage.getItem('toDoList') || '[]');
    ToDo.addAllList(getToDoList);
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-head">To-Do List</h1>
        <ToDoList />
      </header>
    </div>
  )
};

export default App;
