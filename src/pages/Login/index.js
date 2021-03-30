import React, { useEffect, useState } from 'react'
import { Backdrop, Button } from '@material-ui/core'
import LogoIcon from 'assets/images/login/logo-icon-only.svg'
import Logo from 'assets/images/logo.svg'
import ContentImage from 'assets/images/login/slide1.png'
import LeftSlide from 'assets/images/login/left-slider.png'
import RightSlide from 'assets/images/login/right-slider.png'
import OrcidLogo from 'assets/images/login/orcid-icon.png'
import dotenv from 'global/environment'
import loader from 'assets/images/loader.gif'
import jwtDecode from 'jwt-decode'
import { useUser } from './hooks'
import styles from './styles.module.scss'

const Login = () => {
  const { addToDo, isLoading } = useUser()
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    if (window.location.hash) {
      const params = window.location.hash.substr(1).split('&')
      for (let i = 0; i < params.length; i++) {
        const a = params[i].split('=')
        // Now every parameter from the hash is beind handled this way
        if (a[0] === 'id_token' && a[1]) {
          const token = a[1]
          setToken(token)
          setData(jwtDecode(token))
        }
      }
    }
  }, [addToDo])

  const submitLogin = () => {
    setLoading(true)
    setTimeout(function () {
      addToDo({ token })
    }, 2000)
  }

  return (
    <>
      {loading ? (
        <Backdrop
          style={{ backgroundColor: '#E2E2E4', zIndex: 10 }}
          variant="outlined"
          open={loading}
        >
          <img src={loader} />
        </Backdrop>
      ) : null}
      <div className={`${styles.lgContainer}`}>
        <div className={`${styles.left}`}>
          <div className={`${styles.leftContainer}`}>
            <div className={`${styles.leftContent}`}>
              <div className={`${styles.mainLogo}`}>
                <img src={Logo} />
              </div>
              <div className={`${styles.leftText}`}>
                <h2>Survey the state of your field.</h2>
                <h2>Share you research as you go.</h2>
                <h2>Get fast feedback.</h2>
                <h2>Find like-minded collaborators.</h2>
              </div>
              <div className={`${styles.contentImage}`}>
                <img src={ContentImage} />
              </div>
              <div className={`${styles.slider}`}>
                <div className={`${styles.sliderDots}`}>
                  <a className={`${styles.sliderIndicator}`} />
                  <a className={`${styles.slideDot}`} />
                  <a className={`${styles.slideDot}`} />
                  <a className={`${styles.slideDot}`} />
                </div>
              </div>
              <div className={`${styles.pagination}`}>
                <img
                  className={`${styles.slideLeft}`}
                  src={LeftSlide}
                />
                <img
                  className={`${styles.slideRight}`}
                  src={RightSlide}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.right}`}>
          <div className={`${styles.rightContent}`}>
            <h2 component="h1" variant="h5">
              Welcome back
            </h2>
            <p>Loremn ipsum dolor sit amet , consectetur</p>
            <p>adipiscing elit, sed do eiusmod tempor.</p>
            <Button
              type="submit"
              disabled={isLoading}
              variant="contained"
              size="large"
              onClick={() => {
                return token
                  ? submitLogin()
                  : window.location.assign(
                      `${dotenv.orcidUrl}${window.location.href}`
                    )
              }}
            >
              <img src={OrcidLogo} />
              {data
                ? `Continue as ${data.given_name} ${data.family_name}`
                : 'Log in with ORCID'}
            </Button>
          </div>
        </div>
        <div className={`${styles.logo}`}>
          <img src={LogoIcon} />
        </div>
      </div>
    </>
  )
}

Login.propTypes = {}

export default Login
