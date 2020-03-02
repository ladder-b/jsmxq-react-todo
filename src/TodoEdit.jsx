import * as React from 'react'
import XRComponent from 'jsmxq-react'

export default class TodoEdit extends XRComponent {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleNewTodoKeyDown = this.handleNewTodoKeyDown.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
    }

    handleNewTodoKeyDown() {
        //ENTER_KEY = 13
        if (event.keyCode !== 13) {
            return;
        }

        event.preventDefault();

        var val = this.props.itemText.trim();

        if (val) {
         this.post("TODO_ADD_NEW_ITEM", { itemText: val} );
        }
    }
  
    handleChange(e) {
        this.post("TODO_EDIT_NEW_ITEM",{itemText: e.target.value});
    }
  
    toggleAll() {
        this.post("TODO_TOGGLE_ALL");
    }

    render() {
        return(
            <div>
                <input
                    id="toggle-all"
                    className="toggle-all"
                    type="checkbox"
                    onChange={this.toggleAll}
                    checked={ !this.props.toggleAll }
                />
                <label style={{top:10, left:-12, zIndex:255}}
                    htmlFor="toggle-all"
                />

               <input
                    type='text'
                    className="new-todo"
                    placeholder="What needs to be done?"
                    value={this.props.itemText}
                    onKeyDown={this.handleNewTodoKeyDown}
                    onChange={this.handleChange}
                    autoFocus={true}
                />
            </div>
        )
    }
}