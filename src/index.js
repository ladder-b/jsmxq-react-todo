import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import TodoModel from './todoModel'

import "todomvc-common/base.css"
import "todomvc-app-css/index.css"

var todoModel = new TodoModel();

ReactDOM.render(<App todoModel={todoModel}/>, document.getElementById("root"));