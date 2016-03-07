require('./styles/index')

import React from 'react'
import ReactDOM from 'react-dom'

const { Component } = React

class VisibleTodoList extends Component {
  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { store } = this.props
    const state = store.getState()

    return (
      <TodoList
        todos={
          getVisibleTodos( state.todos, state.visibilityFilter )
        }
        onTodoClick={ id =>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }
      />
    )
  }
}

const Todo = ({
  onClick,
  text,
  completed
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}>
    {text}
  </li>
)

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo => {
      return <Todo key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    })}
  </ul>
)

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

const AddTodo = ({
  store,
  onAddClick
}) => {
  let input

  return (
    <div>
      <input ref={node => {
        input = node
      }} />
      <button onClick={() => {
        store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text: input.value
        })
        input.value = ''
      }}>
        Add Todo
      </button>
    </div>
  )
}

const Link = ({
  active,
  children,
  onClick
}) => {
  if (active) {
    return <span>{children}</span>
  }
  return (
    <a href="#"
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  )
}

class FilterLink extends Component {
  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { store, filter, children } = this.props
    const state = store.getState()

    return (
      <Link
        active={
          filter === state.visibilityFilter
        }
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: filter
          })
        }
      >
        {children}
      </Link>
    )
  }
}

const Footer = ({ store }) => (
  <p>
    Show:
    {' '}
    <FilterLink store={ store } filter='SHOW_ALL'>
      All
    </FilterLink>
    {' '}
    <FilterLink store={ store } filter='SHOW_ACTIVE'>
      Active
    </FilterLink>
    {' '}
    <FilterLink store={ store } filter='SHOW_COMPLETED'>
      Completed
    </FilterLink>
  </p>
)

let nextTodoId = 0
const TodoApp = ({ store }) => (
  <div>
    <AddTodo store={ store } />
    <VisibleTodoList store={ store } />
    <Footer store={ store } />
  </div>
)


import root from './stores/root'
import { createStore } from 'redux'

ReactDOM.render(
  <TodoApp store={createStore(root)} />,
  document.getElementById('app')
)
