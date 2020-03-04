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
      toggleAll: false,
      editId: '',
      editText: ''
    }

    // this.subscriber.addSubject("TODO_EDIT_NEW_ITEM");
    // this.subscriber.addSubject("TODO_ADD_NEW_ITEM");
    // this.subscriber.addSubject("TODO_SHOW_ONLY");
    // this.subscriber.addSubject("TODO_TOGGLE_STATE");
    // this.subscriber.addSubject("TODO_CLEAR_COMPLETED")
    // this.subscriber.addSubject("TODO_DEL");
    // this.subscriber.addSubject("TODO_TOGGLE_ALL");
    // this.subscriber.addSubject("TODO_EDIT");
    // this.subscriber.addSubject("TODO_ITEM_TXT_CHANGED");
    // this.subscriber.addSubject("TODO_EDIT_DONE");

    this.subscriber.addSubject(/TODO_\B/);
  }

  deriveToggleState() {
    return (this.state.todoModel.getCountByState(TodoItemState.ACTIVE) <= 0)  
  }

  onMessageReceive(msg) {
    let todoModel = this.state.todoModel;

    switch(msg.subject) {
        case 'TODO_EDIT_NEW_ITEM':
          this.setState({itemText: msg.content.itemText});
          break;
        case 'TODO_ADD_NEW_ITEM':
          todoModel.add(msg.content.itemText);
          this.setState({itemText: '', todoModel: todoModel});
          break;
        case "TODO_SHOW_ONLY":
          this.setState({nowShowing: msg.content});
          break;
          /*recvd, whenever todo item state changes*/
        case 'TODO_TOGGLE_STATE':
          todoModel.toggleState(msg.content.id);          
          this.setState({
            count: msg.content.count,
            completedCount: msg.content.completedCount,
            toggleAll: this.deriveToggleState()
          });
          break;
        case "TODO_CLEAR_COMPLETED":
          todoModel.clearCompleted();
          this.setState({todoModel: todoModel,
            toggleAll: true});
          break;
        case "TODO_DEL":
          todoModel.remove(msg.content.id);
          this.setState({todoModel: todoModel,
            toggleAll: this.deriveToggleState()});
          break;
        case "TODO_TOGGLE_ALL":
          todoModel.toggleAll(!this.state.toggleAll);
          this.setState({
            todoModel: todoModel,
            toggleAll: !this.state.toggleAll
          });
          break;
        case "TODO_EDIT":
          this.setState({editId: msg.content.id, editText: msg.content.editText});
          break;
        case "TODO_ITEM_TXT_CHANGED":
          this.setState({editText: msg.content.editText});
          break;
        case "TODO_EDIT_DONE":
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

          <TodoEdit
            itemText={this.state.itemText}
            toggleAll={this.state.toggleAll}
            showToggle={todoModel.getSize() > 0}
          />
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