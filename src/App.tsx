import { FC } from 'react';
import './App.css';
import ToDoList from './components/ToDoList/ToDoList';

const App: FC = () => (
    <div className="App">
      <header className="App-header">
        <h1 className="App-head">To-Do List</h1>
        <ToDoList/>
      </header>
    </div>
);

export default App;
