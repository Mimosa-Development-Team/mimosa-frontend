import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { isEmpty } from 'lodash'

import getRawData from 'utils/hookstate/getRawData'

import Login from 'pages/Login'
import Member from 'pages/Member'

import { Routes } from 'global/routes'

import { queryClient, useGlobalState } from 'store/state'

const App = () => {
  const { user: proxyUser } = useGlobalState()
  const user = getRawData(proxyUser)
  const hasSession = !isEmpty(user)

  const renderComponent = () =>
    hasSession ? <Member /> : <Login />
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
