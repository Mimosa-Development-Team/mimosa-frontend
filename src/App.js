import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { isEmpty } from 'lodash'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from 'global/styles'
import Login from 'pages/Login'
import Member from 'pages/Member'

import { Routes } from 'global/routes'

import { queryClient, useGlobalState } from 'store/state'

const App = () => {
  const { user } = useGlobalState()
  const hasSession = !isEmpty(user)

  const homeComponent = hasSession ? Member : Login
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Switch>
            <Route
              exact
              path={Routes.HOME_PAGE}
              component={homeComponent}
            />
          </Switch>
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
