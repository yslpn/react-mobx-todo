import { makeAutoObservable } from "mobx";

class ToDo {
    toDoList: string[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    addToDoItem(item: string) {
        this.toDoList.push(item);
        console.log('addToDoItem:', item);
    }

    removeToDoItem(item: string) {
        this.toDoList = this.toDoList.filter(val => val !== item);
        console.log('removeToDoItem:', item);
    }
}

export default new ToDo();