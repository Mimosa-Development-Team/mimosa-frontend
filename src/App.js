/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
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
import { ToastContainer } from 'material-react-toastify'
import 'material-react-toastify/dist/ReactToastify.css'
import { queryClient, useGlobalState } from 'store/state'
import getRawData from 'utils/hookstate/getRawData'
import Top from './assets/images/top.svg'
import Bottom from './assets/images/bottom.svg'

const App = () => {
  const { user: proxyUser } = useGlobalState()
  const { user } = getRawData(proxyUser)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (user && user.notification) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [proxyUser])

  const renderComponent = () => {
    return <Member />
  }
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          style={{ marginTop: '15px' }}
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Switch>
          <Route
            path={Routes.HOME_PAGE}
            render={renderComponent}
          />
        </Switch>
      </QueryClientProvider>
      {user && proxyUser && open && (
        <Tour
          open={open}
          setOpen={setOpen}
          user={user}
          proxyUser={proxyUser}
        />
      )}
    </BrowserRouter>
  )
}

const Tour = withRouter(
  // eslint-disable-next-line no-unused-vars
  ({
    open,
    setOpen,
    location: { pathname },
    user,
    proxyUser,
    history
  }) => {
    const steps = [
      {
        content: () => (
          <div>
            <h2>Welcome to Mimosa</h2>
            <p>Click next to continue onboarding tour.</p>
            <img className="topImg" src={Top} alt="top image" />
            <img
              className="bottomImg"
              src={Bottom}
              alt="bottom image"
            />
          </div>
        )
      },
      ...(pathname === '/'
        ? [
            {
              selector: '.questionClass',
              content: () => (
                <div>
                  <h2>Add New Question</h2>
                  <p>
                    Try posting a new Question! Your questions
                    appear on the home feed and in "My
                    Contributions" page
                  </p>
                  <img
                    className="topImg"
                    src={Top}
                    alt="top image"
                  />
                  <img
                    className="bottomImg"
                    src={Bottom}
                    alt="bottom image"
                  />
                </div>
              )
            },
            {
              selector: '.questionClass',
              content: () => (
                <div>
                  <h2>Add New Question</h2>
                  <p>
                    Try posting a new Question! Your questions
                    appear on the home feed and in "My
                    Contributions" page
                  </p>
                  <img
                    className="topImg"
                    src={Top}
                    alt="top image"
                  />
                  <img
                    className="bottomImg"
                    src={Bottom}
                    alt="bottom image"
                  />
                </div>
              ),
              action: () =>
                history.push('/contribution-form/question/new')
            }
          ]
        : pathname === '/contribution-form/question/new'
        ? [
            {},
            {
              selector: '.text2',
              content: () => (
                <div>
                  <h2>Research Question</h2>
                  <p>
                    Share your research idea as a question. It
                    can be a yes/no question ("Is there life on
                    Venus?") or an open question ("Where are we
                    most likely to find life in the universe?")
                    For more tips on how to formulate a good
                    research question, check the{' '}
                    <a href="/faq">FAQ</a>
                  </p>
                  <img
                    className="topImg"
                    src={Top}
                    alt="top image"
                  />
                  <img
                    className="bottomImg"
                    src={Bottom}
                    alt="bottom image"
                  />
                </div>
              )
            },
            {
              selector: '.text3',
              content: () => (
                <div>
                  <h2>Details</h2>
                  <p>
                    Additional info about your question goes
                    here. For example, relevant links, existing
                    research, or just the reason why you are
                    interested in that question.
                  </p>
                  <img
                    className="topImg"
                    src={Top}
                    alt="top image"
                  />
                  <img
                    className="bottomImg"
                    src={Bottom}
                    alt="bottom image"
                  />
                </div>
              )
            },
            {
              selector: '.publish',
              content: () => (
                <div>
                  <h2>Publish</h2>
                  <p>
                    Make your question public, or keep it as a
                    draft by leaving this page.
                  </p>
                  <img
                    className="topImg"
                    src={Top}
                    alt="top image"
                  />
                  <img
                    className="bottomImg"
                    src={Bottom}
                    alt="bottom image"
                  />
                </div>
              )
            },
            {
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
                  <img
                    className="topImg"
                    src={Top}
                    alt="top image"
                  />
                  <img
                    className="bottomImg"
                    src={Bottom}
                    alt="bottom image"
                  />
                </div>
              ),
              action: () => history.push('/my-contributions')
            }
          ]
        : pathname === '/my-contributions'
        ? [
            {},
            {},
            {},
            {},
            {
              selector: '.userContribution',
              content: () => (
                <div>
                  <h2>Question</h2>
                  <p>
                    Click on a question to see the related
                    contributions and comments
                  </p>
                  <img
                    className="topImg"
                    src={Top}
                    alt="top image"
                  />
                  <img
                    className="bottomImg"
                    src={Bottom}
                    alt="bottom image"
                  />
                </div>
              )
            },
            {
              selector: '.userContribution',
              content: () => (
                <div>
                  <h2>Question</h2>
                  <p>
                    Click on a question to see the related
                    contributions and comments
                  </p>
                  <img
                    className="topImg"
                    src={Top}
                    alt="top image"
                  />
                  <img
                    className="bottomImg"
                    src={Bottom}
                    alt="bottom image"
                  />
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
        isOpen={pathname === '/faq' ? false : open}
        onRequestClose={async () => {
          if (pathname !== '/faq') {
            const tempData = user
            tempData.notification = false
            await setOpen(false)
            await proxyUser.user.set(tempData)
          }
        }}
        update={pathname}
      />
    )
  }
)

export default App
