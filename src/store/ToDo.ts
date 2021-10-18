import { makeAutoObservable } from "mobx";
import { IToDoItem } from "../types";

class ToDo {
    toDoList: IToDoItem[] = [];
    Error: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    addToDoItem(item: IToDoItem): void {
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

    removeToDoItem(item: IToDoItem): void {
        this.toDoList = this.toDoList.filter(val => val !== item);
        localStorage.setItem('toDoList', JSON.stringify(this.toDoList));
        console.log('removeToDoItem:', item);
    }

    togleDone(item: IToDoItem): void {
        const index = this.toDoList.indexOf(item);
        this.toDoList[index].completed = !this.toDoList[index].completed;
        localStorage.setItem('toDoList', JSON.stringify(this.toDoList));
        console.log('togleDone:', item);
    }

    reset(): void {
        this.toDoList = [];
        localStorage.clear();
        console.log('reset');
    }

    addAllList(items: IToDoItem[]): void {
        this.toDoList = items;
        console.log('addAllList:', items);
    }

    setError(text: string, error?: string): void {
        this.Error = text;
        console.log('setError:', text);
        if(error) {
            console.log(error);
        }
    }

    fetchRandomToDoItem(): void {
        fetch(`https://jsonplaceholder.typicode.com/todos/${Math.floor(Math.random() * 200)}`)
            .then(response => response.json())
            .then(json => {
                this.addToDoItem(json);
            }).catch((e) => this.setError('Something went wrong. Try again.', e));
    }
}

export default new ToDo();