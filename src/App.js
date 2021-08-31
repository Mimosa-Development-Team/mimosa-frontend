/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
  withRouter
} from 'react-router-dom'
import { Button } from '@material-ui/core'
import { QueryClientProvider } from 'react-query'
import Reactour from 'reactour'
import Member from 'pages/Member'

import { Routes } from 'global/routes'

import { queryClient } from 'store/state'

import Top from './assets/images/top.svg'
import Bottom from './assets/images/bottom.svg'

const App = () => {
  const [open, setOpen] = useState(true)

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
      <Tour open={open} setOpen={setOpen} />
    </BrowserRouter>
  )
}

const Tour = withRouter(
  // eslint-disable-next-line no-unused-vars
  ({ open, setOpen, location: { pathname }, history }) => {
    const steps = [
      {
        content: () => (
          <div>
            <h2>Welcome to Mimosa</h2>
            <p>
              Lorem Ipsum, sometimes referred to as lipsum, is
              the placeholder text used in design when creating
              content. It helps designers plan out where the
              content will sit, without needing to wait for the
              content to be written and approved.2
            </p>
            <img className="topImg" src={Top} />
            <img className="bottomImg" src={Bottom} />
          </div>
        )
      },
      {
        selector: '.test',
        content: () => (
          <div>
            <h2>Contribution List</h2>
            <p>
              Lorem Ipsum, sometimes referred to as lipsum, is
              the placeholder text used in design when creating
              content. It helps designers plan out where the
              content will sit, without needing to wait for the
              content to be written and approved.2
            </p>
            <img className="topImg" src={Top} />
            <img className="bottomImg" src={Bottom} />
          </div>
        )
      },
      ...(pathname === '/'
        ? [
            {
              selector: '.test',
              content: () => (
                <div>
                  <h2>Contribution List1</h2>
                  <p>
                    Lorem Ipsum, sometimes referred to as lipsum,
                    is the placeholder text used in design when
                    creating content. It helps designers plan out
                    where the content will sit, without needing
                    to wait for the content to be written and
                    approved.2
                  </p>
                  <img className="topImg" src={Top} />
                  <img className="bottomImg" src={Bottom} />
                </div>
              ),
              action: () =>
                history.push('/contribution-form/question/new')
            }
          ]
        : pathname === '/contribution-form/question/new'
        ? [
            {
              selector: '.cf',
              content: () => (
                <div>
                  <h2>Contribution Form</h2>
                  <p>
                    Lorem Ipsum, sometimes referred to as lipsum,
                    is the placeholder text used in design when
                    creating content. It helps designers plan out
                    where the content will sit, without needing
                    to wait for the content to be written and
                    approved.2
                  </p>
                  <img className="topImg" src={Top} />
                  <img className="bottomImg" src={Bottom} />
                </div>
              )
            },
            {
              selector: '.text2',
              content: () => (
                <div>
                  <h2>Contribution Title</h2>
                  <p>
                    Lorem Ipsum, sometimes referred to as lipsum,
                    is the placeholder text used in design when
                    creating content. It helps designers plan out
                    where the content will sit, without needing
                    to wait for the content to be written and
                    approved.2
                  </p>
                  <img className="topImg" src={Top} />
                  <img className="bottomImg" src={Bottom} />
                </div>
              )
            }
          ]
        : [])
    ]
    return (
      <Reactour
        className="tour"
        showNumber={false}
        nextButton={
          <Button
            className="btn primary"
            size="large"
            variant="contained"
          >
            Next
          </Button>
        }
        prevButton={
          <Button size="large" style={{ color: '#EF8C1F' }}>
            Previous
          </Button>
        }
        lastStepNextButton={
          <Button
            className="btn secondary"
            size="large"
            variant="contained"
            color="danger"
          >
            Exit
          </Button>
        }
        showNavigation={false}
        steps={steps}
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        update={pathname}
      />
    )
  }
)

export default App
