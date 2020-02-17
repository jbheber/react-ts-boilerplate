import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import paths from './routes'

import Home from '../pages/Home'

const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={paths.ROOT} component={Home} />
      </Switch>
    </BrowserRouter>
  )
}

export default RouterComponent
