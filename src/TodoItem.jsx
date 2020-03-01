import * as React from 'react'
import XRComponent from 'jsmxq-react'
import { TodoItemState } from './TodoItemState'

var classNames = require('classnames');

export default class TodoItem extends XRComponent {

    constructor(props){
        super(props);

        this.editField = React.createRef();
    }

    onToggle() {
        this.post("TOGGLE_STATE", {id: this.props.item.id} );
    }

    handleSubmit(e) {
        this.post("EDIT_TODO_DONE", {id: this.props.item.id, editText: e.target.value}); 
    }

    handleChange(e) {
        this.post("ITEM_TXT_CHANGED", {editText: e.target.value});
    }

    handleKeyDown(e) {
        //esc key = 27
        if (event.which === 27) {
            this.post("EDIT_TODO_DONE", {id: this.props.item.id, editText: this.props.item.title});
        } else if (event.which === 13) { //enter key
            this.post("EDIT_TODO_DONE", {id: this.props.item.id, editText: e.target.value});
        }
    }

    handleEdit() {
        this.post("EDIT_TODO", {id: this.props.item.id, editText: this.props.item.title});
    }

    onDestroy() {
        this.post("DEL_TODO", {id: this.props.item.id});
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.editing && this.props.editing) {
            this.editField.current.focus();
            this.editField.current.setSelectionRange(this.editField.current.value.length, this.editField.current.value.length);
        }
    }

    render() {
        let item = this.props.item;

        return(
        <li className={classNames({
            completed: item.state===TodoItemState.COMPLETE,
            editing: this.props.editing
        })}>        
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    checked={item.state === TodoItemState.COMPLETE}
                    onChange={this.onToggle.bind(this)}
                />
                <label onDoubleClick={this.handleEdit.bind(this)}>
                    {item.title}
                </label>
                <button className="destroy" onClick={this.onDestroy.bind(this)} />
            </div>
            <input
                ref={this.editField}
                className="edit"
                value={this.props.editText}
                onBlur={this.handleSubmit.bind(this)}
                onChange={this.handleChange.bind(this)}
                onKeyDown={this.handleKeyDown.bind(this)}
            />
        </li>
        )
    }
}