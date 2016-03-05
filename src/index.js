require('./styles/index')

import expect from 'expect.js'
import deepFreeze from 'deep-freeze'

const addCounter = (list) => {
  return [...list, 0]
}

const removeCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ]
}

const incrementCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    (list[index] + 1),
    ...list.slice(index + 1)
  ]
}

const testAddCounter = () => {
  const listBefore = []
  deepFreeze(listBefore)

  const listAfter = [0]
  expect(
    addCounter(listBefore)
  ).to.eql(listAfter)
}

const testRemoveCounter = () => {
  const listBefore = [0, 3, 8]
  deepFreeze(listBefore)

  const listAfter = [0, 8]
  expect(
    removeCounter(listBefore, 1)
  ).to.eql(listAfter)
}

const testIncrementCounter = () => {
  const listBefore = [0, 3, 8]
  deepFreeze(listBefore)

  const listAfter = [0, 4, 8]
  expect(
    incrementCounter(listBefore, 1)
  ).to.eql(listAfter)
}

testAddCounter()
testRemoveCounter()
testIncrementCounter()

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
