import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import Member from 'pages/Member'

import { Routes } from 'global/routes'

import { queryClient } from 'store/state'

const App = () => {
  const renderComponent = () => {
    return <Member />
  }
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route
            path={Routes.HOME_PAGE}
            render={renderComponent}
          />
        </Switch>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
