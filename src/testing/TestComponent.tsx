import React, { FunctionComponent } from 'react'

import { BrowserRouter } from 'react-router-dom'
import { MockStoreEnhanced } from 'redux-mock-store'
import { Provider } from 'react-redux'

export type TestComponentProps = {
  store: MockStoreEnhanced<any, {}>
}

export const TestComponent: FunctionComponent<TestComponentProps> = ({
  store,
  children
}) => (
  <BrowserRouter keyLength={0}>
    <Provider store={store}>{children}</Provider>
  </BrowserRouter>
)
