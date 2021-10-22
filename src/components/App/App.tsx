import { useEffect } from 'react';
import styles from './App.module.css';
import ToDoList from '../ToDoList/ToDoList';
import ToDo from '../../store/ToDo';

const App = (): JSX.Element => {
  useEffect(() => {
    const getToDoList = JSON.parse(localStorage.getItem('toDoList') || '[]');
    ToDo.addAllList(getToDoList);
  }, [])

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <h1 className={styles.AppHead}>To-Do List</h1>
        <ToDoList />
      </header>
    </div>
  )
};

export default App;
