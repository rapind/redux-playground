require('./styles/index')

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

import root from './stores/root'

const store = createStore(root)
const { Component } = React

const Todo = ({
  onClick,
  text,
  completed
}) => {
  return (
    <li
      onClick={onClick}
      style={{
        textDecoration:
          completed ? 'line-through' : 'none'
      }}>
      {text}
    </li>
  )
}

const TodoList = ({
  todos,
  onTodoClick
}) => {
  return (
    <ul>
      {todos.map(todo => {
        return <Todo
          key={todo.id}
          {...todo}
          onClick={() => onTodoClick(todo.id)}
        />
      })}
    </ul>
  )
}

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

  render() {
    const {
      todos,
      visibilityFilter
    } = this.props

    const visibleTodos = getVisibleTodos(todos, visibilityFilter)
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
        <TodoList
          todos={visibleTodos}
          onTodoClick={id =>
            store.dispatch({
              type: 'TOGGLE_TODO',
              id
            })
          } />
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
