import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { globalReducer } from './global'

export default combineReducers({
  global: persistReducer(
    {
      key: 'global',
      storage,
      blacklist: ['isChangingLanguage']
    },
    globalReducer
  )
  // Add reducers here
})
