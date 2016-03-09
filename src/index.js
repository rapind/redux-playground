require('./styles/index')

import React from 'react'
import ReactDOM from 'react-dom'

const { Component } = React

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch({
        type: 'TOGGLE_TODO',
        id
      })
    }
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

import { connect } from 'react-redux'

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

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

const AddTodo = (props, { store }) => {
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

AddTodo.contextTypes = {
  store: React.PropTypes.object
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
    this.unsubscribe = this.context.store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { filter, children } = this.props
    const { store } = this.context
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
FilterLink.contextTypes = {
  store: React.PropTypes.object
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

import { Provider } from'react-redux'

import root from './stores/root'
import { createStore } from 'redux'

ReactDOM.render(
  <Provider store={createStore(root)}>
    <TodoApp />
  </Provider>,
  document.getElementById('app')
)
