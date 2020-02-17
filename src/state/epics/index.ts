import { combineEpics } from 'redux-observable'
import global from './global'

export default combineEpics(...[...global])
