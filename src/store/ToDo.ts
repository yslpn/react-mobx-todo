import { makeAutoObservable } from "mobx";
import { TToDoItem } from "../types";

class ToDo {
    toDoList: TToDoItem[] = [];
    Error: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    addToDoItem(item: TToDoItem) {
        if (this.toDoList.find(el => el.title === item.title)) {
            this.setError('A similar task already exists.');
        } else if (item.title === '') {
            this.setError('Cannot be empty.');
        } else {
            this.toDoList.push(item);
            localStorage.setItem('toDoList', JSON.stringify(this.toDoList));
            console.log('addToDoItem:', item);
        }
    }

    removeToDoItem(item: TToDoItem) {
        this.toDoList = this.toDoList.filter(val => val !== item);
        localStorage.setItem('toDoList', JSON.stringify(this.toDoList));
        console.log('removeToDoItem:', item);
    }

    togleDone(item: TToDoItem) {
        const index = this.toDoList.indexOf(item);
        this.toDoList[index].completed = !this.toDoList[index].completed;
        localStorage.setItem('toDoList', JSON.stringify(this.toDoList));
        console.log('togleDone:', item);
    }

    reset() {
        this.toDoList = [];
        localStorage.clear();
        console.log('reset');
    }

    addAllList(items: TToDoItem[]) {
        this.toDoList = items;
        console.log('addAllList:', items);
    }

    setError(text: string) {
        this.Error = text;
        console.log('setError:', text);
    }

    fetchRandomToDoItem() {
        fetch(`https://jsonplaceholder.typicode.com/todos/${Math.floor(Math.random() * 200)}`)
            .then(response => response.json())
            .then(json => {
                this.addToDoItem(json);
            });
    }
}

export default new ToDo();