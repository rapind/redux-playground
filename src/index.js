require('./styles/index')

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

import root from './stores/root'

const store = createStore(root)
const { Component } = React

const FilterLink = ({
  filter,
  currentFilter,
  children
}) => {
  if (filter === currentFilter) {
    return <span>{children}</span>
  }
  return (
    <a href="#"
      onClick={e => {
        e.preventDefault()
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        })
      }}
    >
      {children}
    </a>
  )
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      )
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed
      )
    default:
      return todos
  }
}

let nextTodoId = 0
class TodoApp extends Component {

  renderTodos(todos, visibilityFilter) {
    const visibleTodos = getVisibleTodos(todos, visibilityFilter)
    return visibleTodos.map(todo => {
      return (
        <li key={todo.id}
          onClick={() => {
            store.dispatch({
              type: 'TOGGLE_TODO',
              id: todo.id
            })
          }}
          style={{
            textDecoration:
              todo.completed ? 'line-through' : 'none'
          }}>
          {todo.text}
        </li>
      )
    })
  }

  render() {
    const {
      todos,
      visibilityFilter
    } = this.props

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
          {this.renderTodos(todos, visibilityFilter)}
        </ul>
        <p>
          Show:
          {' '}
          <FilterLink
            filter='SHOW_ALL'
            currentFilter={visibilityFilter}
          >
            All
          </FilterLink>
          {' '}
          <FilterLink
            filter='SHOW_ACTIVE'
            currentFilter={visibilityFilter}
          >
            Active
          </FilterLink>
          {' '}
          <FilterLink
            filter='SHOW_COMPLETED'
            currentFilter={visibilityFilter}
          >
            Completed
          </FilterLink>
        </p>
      </div>
    )
  }
}


const render = () => {
  ReactDOM.render(
    <TodoApp
      {...store.getState()}
    />,
    document.getElementById('app')
  )
}

store.subscribe(render)
render()
