import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

const root = combineReducers({
  todos,
  visibilityFilter
})

export default root
