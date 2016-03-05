require('./styles/index')

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

import counter from 'stores/counter'

const store = createStore(counter)

const Counter = ({
  value,
  onIncrement,
  onDecrement
}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
)

const render = () => {
  ReactDOM.render(
    <Counter value={store.getState()}
      onIncrement={() =>
        store.dispatch({ type: 'INCREMENT' })
      }
      onDecrement={() =>
        store.dispatch({ type: 'DECREMENT' })
      }
    />,
    document.getElementById('app')
  )
}

store.subscribe(render)
render()
