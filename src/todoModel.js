import { TodoItemState } from './TodoItemState'

export default class TodoModel {

    constructor() {
        this.itemUid = 0;
        this.itemList = [];
    }

    clearCompleted() {
        let itemList = [];
        for(var i=0; i<this.itemList.length; i++) {
            if(this.itemList[i].state !== TodoItemState.COMPLETE) {
                itemList.push(this.itemList[i]);
            }
        }
        this.itemList = itemList;
    }

    getItemById(id) { 
        return this.itemList.find(item => item.id === id);
   }

    toggleState(id) {        
        let item = this.getItemById(id);
        if(item !== undefined) {
            if(item.state === TodoItemState.COMPLETE) {
                item.state = TodoItemState.ACTIVE;
            } else if(item.state === TodoItemState.ACTIVE)  {
                item.state = TodoItemState.COMPLETE;
            }
        }
    }

    toggleAll(state) {
        this.itemList.map( item => {
            if(state) {
                item.state = TodoItemState.COMPLETE;
            } else {
                item.state = TodoItemState.ACTIVE;
            }
        });
    }

    getUid() {
        let uid = this.itemUid;
        this.itemUid++;
        return uid;
    }

    getSize() {
        return this.itemList.length;
    }

    getCountByState(state) {
        let count = 0;
        this.itemList.map( (item) => {
            if(item.state === state) {
                count++;
            }
        })
        return count;
    }

    add(title) {
        let item = {
            id: this.getUid(),
            title: title,
            state: TodoItemState.ACTIVE
        }
        this.itemList.push(item);
    }

    remove(id) {
        let idx = this.itemList.findIndex(item => item.id === id);
        if(idx !== -1) {
            this.itemList.splice(idx, 1);
        }
    }

    changeTodo(id, itemText) {
        let item = this.getItemById(id);
        if(item != undefined) {
            item.title = itemText;
        }
    }
}
