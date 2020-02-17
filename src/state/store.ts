import { applyMiddleware, compose, createStore } from 'redux'

import { createEpicMiddleware } from 'redux-observable'
import { persistStore } from 'redux-persist'
import rootEpic from './epics'
import rootReducer from './reducers'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  }
}
const epicMiddleware = createEpicMiddleware()

export function configureStore(initialState: { [key: string]: any }) {
  const middlewares = []

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  middlewares.push(applyMiddleware(epicMiddleware))

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(...middlewares)
  )
  epicMiddleware.run(rootEpic as any)

  const persistor = persistStore(store)
  return { store, persistor }
}
