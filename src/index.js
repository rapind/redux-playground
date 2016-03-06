require('./styles/index')

// import expect from 'expect.js'
// import deepFreeze from 'deep-freeze'

const todo = (state, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }
      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t => {
        return todo(t, action)
      })
    default:
      return state
  }
}

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}


const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](
          state[key],
          action
        )
        return nextState
      },
      {}
    )
  }
}

// import { combineReducers } from 'redux'
const todoApp = combineReducers({
  todos,
  visibilityFilter
})

import { createStore } from 'redux'
const store = createStore(todoApp)

console.log('State:', store.getState())

console.log('Dispatching ADD_TODO')
store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'Learn Redux'
})
console.log('State:', store.getState())

console.log('Dispatching ADD_TODO')
store.dispatch({
  type: 'ADD_TODO',
  id: 1,
  text: 'Learn Elm'
})
console.log('State:', store.getState())

console.log('Dispatching TOGGLE_TODO')
store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0
})
console.log('State:', store.getState())

console.log('Dispatching SET_VISIBILITY_FILTER')
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
})
console.log('State:', store.getState())

// import React from 'react'
// import ReactDOM from 'react-dom'
// import { createStore } from 'redux'
//
// import counter from 'stores/counter'
//
// const store = createStore(counter)
//
// const Counter = ({
//   value,
//   onIncrement,
//   onDecrement
// }) => (
//   <div>
//     <h1>{value}</h1>
//     <button onClick={onIncrement}>+</button>
//     <button onClick={onDecrement}>-</button>
//   </div>
// )
//
// const render = () => {
//   ReactDOM.render(
//     <Counter value={store.getState()}
//       onIncrement={() =>
//         store.dispatch({ type: 'INCREMENT' })
//       }
//       onDecrement={() =>
//         store.dispatch({ type: 'DECREMENT' })
//       }
//     />,
//     document.getElementById('app')
//   )
// }
//
// store.subscribe(render)
// render()
