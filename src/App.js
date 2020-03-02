import React from "react";
import XRComponent from 'jsmxq-react'

// import "./App.css";

import TodoEdit from "./TodoEdit"
import TodoItemList from "./TodoItemList"
import TodoFooter from "./TodoFooter"
import { TodoItemState } from "./TodoItemState";

class App extends XRComponent {
  
  constructor(props) {
    super(props);

    this.state = {
      itemText: '',
      todoModel: props.todoModel,
      nowShowing: 'all',
      toggleAll: 'select-all',
      editId: '',
      editText: ''
    }

    this.subscriber.addSubject("EDIT_NEW_ITEM");
    this.subscriber.addSubject("ADD_NEW_ITEM");
    this.subscriber.addSubject("SHOW_ONLY");
    this.subscriber.addSubject("TOGGLE_STATE");
    this.subscriber.addSubject("CLEAR_COMPLETED")
    this.subscriber.addSubject("DEL_TODO");
    this.subscriber.addSubject("TOGGLE_ALL");
    this.subscriber.addSubject("EDIT_TODO");
    this.subscriber.addSubject("ITEM_TXT_CHANGED");
    this.subscriber.addSubject("EDIT_TODO_DONE");
  }

  onMessageReceive(msg) {
    let todoModel = this.state.todoModel;
    switch(msg.subject) {
        case 'EDIT_NEW_ITEM':
          this.setState({itemText: msg.content.itemText});
          break;
        case 'ADD_NEW_ITEM':
          todoModel.add(msg.content.itemText);
          this.setState({itemText: '', todoModel: todoModel});
          break;
        case "SHOW_ONLY":
          this.setState({nowShowing: msg.content});
          break;
          /*recvd, whenever todo item state changes*/
        case 'TOGGLE_STATE':
          todoModel.toggleState(msg.content.id);
          this.setState({
            count: msg.content.count,
            completedCount: msg.content.completedCount
          });
          break;
        case "CLEAR_COMPLETED":
          todoModel.clearCompleted();
          this.setState({todoModel: todoModel});
          break;
        case "DEL_TODO":
          todoModel.remove(msg.content.id);
          this.setState({todoModel: todoModel});
          break;
        case "TOGGLE_ALL":
          todoModel.toggleAll(this.state.toggleAll);
          this.setState({
            todoModel: todoModel,
            toggleAll: !this.state.toggleAll
          });
          break;
        case "EDIT_TODO":
          this.setState({editId: msg.content.id, editText: msg.content.editText});
          break;
        case "ITEM_TXT_CHANGED":
          this.setState({editText: msg.content.editText});
          break;
        case "EDIT_TODO_DONE":
          todoModel.changeTodo(msg.content.id, msg.content.editText);
          this.setState({
            todoModel: todoModel,
            editId:''
          });          
          break;
      }
  }

  render() {   
    
    let todoModel = this.state.todoModel;

    return (
      <div className="todoapp">
					<header className="header">
						<h1>todos</h1>						
					</header>

          <TodoEdit itemText={this.state.itemText} toggleAll={this.state.toggleAll}/>
          <TodoItemList
            itemList={todoModel.itemList}
            nowShowing={this.state.nowShowing}
            editId={this.state.editId}
            editText={this.state.editText}
          />
          <TodoFooter
            count={todoModel.getCountByState(TodoItemState.ACTIVE)}
            completedCount={todoModel.getCountByState(TodoItemState.COMPLETE)}
            nowShowing={this.state.nowShowing}
          />
          
				</div>
    )
  }
}

export default App;