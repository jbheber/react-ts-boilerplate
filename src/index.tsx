import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { configureStore } from './state/store'
import Router from './router'
import * as serviceWorker from './serviceWorker'

import './index.scss'

const { store, persistor } = configureStore({})

ReactDOM.render(
  <ThemeProvider>
    <CSSReset />
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
