import { combineReducers } from 'redux'
import tweets from './tweets'
import users from './users'
import authedUser from './authedUser'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  authedUser,
  users,
  tweets,
  loadingBar: loadingBarReducer
})
