import { makeAutoObservable } from "mobx";
import { TToDoItem } from "../types";

class ToDo {
    toDoList: TToDoItem[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    addToDoItem(item: TToDoItem) {
        this.toDoList.push(item);
        localStorage.setItem('toDoList', JSON.stringify(this.toDoList));
        console.log('addToDoItem:', item);
    }

    removeToDoItem(item: TToDoItem) {
        this.toDoList = this.toDoList.filter(val => val !== item);
        localStorage.setItem('toDoList', JSON.stringify(this.toDoList));
        console.log('removeToDoItem:', item);
    }

    togleDone(item: TToDoItem) {
        const index = this.toDoList.indexOf(item);
        this.toDoList[index].checked = !this.toDoList[index].checked;
        localStorage.setItem('toDoList', JSON.stringify(this.toDoList));
        console.log('togleDone:', item);
    }

    reset() {
        this.toDoList = [];
        localStorage.clear();
    }

    addAllList(items: TToDoItem[]) {
        this.toDoList = items;
    }
}

export default new ToDo();