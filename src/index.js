require('./styles/index')

import expect from 'expect.js'
import deepFreeze from 'deep-freeze'

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
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

testAddTodo()
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
