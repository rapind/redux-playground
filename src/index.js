require('./styles/index')

import expect from 'expect.js'
import deepFreeze from 'deep-freeze'

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
        complete: !state.completed
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

const testAddTodo = () => {
  const stateBefore = []
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  }
  deepFreeze(stateBefore)
  deepFreeze(action)

  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ]

  expect(
    todos(stateBefore, action)
  ).to.eql(stateAfter)
}

const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Learn Redux',
      complete: false
    },
    {
      id: 1,
      text: 'Learn Elm',
      complete: false
    }
  ]
  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  }
  deepFreeze(stateBefore)
  deepFreeze(action)

  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      complete: false
    },
    {
      id: 1,
      text: 'Learn Elm',
      complete: true
    }
  ]

  expect(
    todos(stateBefore, action)
  ).to.eql(stateAfter)
}

testAddTodo()
testToggleTodo()

console.log('tests passed')


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
