import * as React from 'react'
import XRComponent from 'jsmxq-react'
import classNames from 'classnames'

export default class TodoFooter extends XRComponent {

    constructor(props) {
        super(props);
    }

    render () {
    
        if(this.props.count <= 0 && this.props.completedCount <= 0) {
            return null;
        }

        var activeTodoWord = "items"
        var clearButton = null;

        if(this.props.count <= 1) {
            activeTodoWord = "item";
        }

        if (this.props.completedCount > 0) {
            clearButton = (
                <button
                    className="clear-completed"
                    onClick={() => this.post("CLEAR_COMPLETED")}>
                    Clear completed
                </button>
            );
        }

        var nowShowing = this.props.nowShowing;
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{this.props.count}</strong> {activeTodoWord} left
                </span>
                <ul className="filters">
                    <li>
                        <a
                            href='#'
                            onClick={() => {this.post("SHOW_ONLY", 'all'); return false}}
                            className={classNames({selected: nowShowing === 'all'})}
                        >
                            All
                        </a>
                    </li>
                    {' '}
                    <li>
                        <a
                            href='#'
                            onClick={() => {this.post("SHOW_ONLY", 'active'); return false}}
                            className={classNames({selected: nowShowing === 'active'})}>
                                Active
                        </a>
                    </li>
                    {' '}
                    <li>
                        <a
                            href="#"
                            onClick={() => {this.post("SHOW_ONLY", 'completed'); return false}}
                            className={classNames({selected: nowShowing === 'completed'})}>
                                Completed
                        </a>
                    </li>
                </ul>
                {clearButton}
            </footer>
        )
    }
}
