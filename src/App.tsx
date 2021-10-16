import { FC } from 'react';
import './App.css';
import ToDoList from './components/ToDoList/ToDoList';

const App: FC = () => (
    <div className="App">
      <header className="App-header">
        <ToDoList/>
      </header>
    </div>
);

export default App;
