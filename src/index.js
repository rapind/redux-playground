require('./styles/index')

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

import root from './stores/root'

const store = createStore(root)
const { Component } = React

let nextTodoId = 0
class TodoApp extends Component {

  renderTodos() {
    return this.props.todos.map(todo => {
      return (
        <li key={todo.id}>
          {todo.text}
        </li>
      )
    })
  }

  render() {
    return (
      <div>
        <input ref={node => {
          this._input = node
        }} />
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: this._input.value,
            id: nextTodoId++
          })
          this._input.value = ''
        }}>
          Add Todo
        </button>
        <ul>
          {this.renderTodos()}
        </ul>
      </div>
    )
  }
}


const render = () => {
  ReactDOM.render(
    <TodoApp
      todos={store.getState().todos}
    />,
    document.getElementById('app')
  )
}

store.subscribe(render)
render()
