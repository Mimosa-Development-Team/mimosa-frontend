import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { isEmpty } from 'lodash'
import Login from 'pages/Login'
import Member from 'pages/Member'
// import IdleTimer from 'react-idle-timer'
import { Routes } from 'global/routes'

import { queryClient, useGlobalState } from 'store/state'

const App = () => {
  const { user } = useGlobalState()
  const hasSession = !isEmpty(user)

  // const onAction = e => {
  //   console.log('user did something', e)
  // }

  // const onActive = e => {
  //   console.log('user is active', e)
  //   // console.log("time remaining", this.idleTimer.getRemainingTime());
  // }

  // const onIdle = e => {
  //   console.log('user is idle', e)
  //   // console.log("last active", this.idleTimer.getLastActiveTime());
  // }

  const homeComponent = hasSession ? Member : Login
  return (
    <BrowserRouter>
      {/* <IdleTimer
        // ref={ref => { Null = ref }}
        element={document}
        onActive={onActive}
        onIdle={onIdle}
        onAction={onAction}
        debounce={250}
        timeout={1}
      /> */}
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
  )
}

export default App
