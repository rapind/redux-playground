require('./styles/index')

import expect from 'expect.js'
import deepFreeze from 'deep-freeze'

const toggleTodo = (todo) => {
  // return Object.assign(
  //   {},
  //   todo,
  //   { completed: !todo.completed }
  // )
  return {
    ...todo,
    completed: !todo.completed
  }
}


const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false
  }

  const todoAfter = {
    id: 0,
    text: 'Learn Redux',
    completed: true
  }

  deepFreeze(todoBefore)

  expect(
    toggleTodo(todoBefore)
  ).to.eql(todoAfter)
}

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
