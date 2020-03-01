import * as React from 'react'
import XRComponent from 'jsmxq-react'
import TodoItem from './TodoItem';
import { TodoItemState } from './TodoItemState';

export default class TodoItemList extends XRComponent {
    constructor(props){
        super(props);
    }   

    render() {
        var items = [];

        for(var i=0; i<this.props.itemList.length; i++) {
            let item = this.props.itemList[i];
            if( 
                (this.props.nowShowing == 'all') ||
                (this.props.nowShowing == 'active' && item.state === TodoItemState.ACTIVE) ||
                (this.props.nowShowing == 'completed' && item.state === TodoItemState.COMPLETE)
            )
            {                   
                items.push(
                    <TodoItem
                        key={item.id}
                        _xrname_={item.id}
                        item={item}
                        editing={item.id===this.props.editId}
                        editText={this.props.editText}
                    />
                );
            }
        }    
        
        return (
            <ul className = "todo-list">
                {items}
            </ul>
        )
    }
}