import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Backdrop,
  Button,
  Typography,
  Link
} from '@material-ui/core'

import Slider from 'react-slick'

import Logo from 'assets/images/logo.svg'
import Asterisk from 'assets/images/asterisk.svg'
import OrcidLogo from 'assets/images/login/orcid.png'
import SliderOne from 'assets/images/login/slider-1.png'
import SliderTwo from 'assets/images/login/slider-2.png'
import SliderThree from 'assets/images/login/slider-3.svg'

import dotenv from 'global/environment'
import loader from 'assets/images/loader.gif'
import jwtDecode from 'jwt-decode'
import { useUser } from './hooks'

import styles from './styles.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Login = () => {
  const history = useHistory()
  const { addToDo, isLoading } = useUser()
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(null)
  const [data, setData] = useState(null)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

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
    setTimeout(() => {
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
      <div className={`${styles.loginWrapper}`}>
        <div className={`${styles.contentWrapper}`}>
          <div className={`${styles.left}`}>
            <img
              className="mb-40"
              src={Logo}
              alt="mimosa logo"
            />
            <Slider {...settings}>
              <div>
                <Typography
                  variant="h2"
                  className={`${styles.header}`}
                >
                  Survey the state of your field.
                </Typography>
                <Typography
                  variant="h2"
                  className={`${styles.header}`}
                >
                  Find open questions, keep up with the most
                  debated hypotheses, and read on the accepted
                  consensus.
                </Typography>
                <img
                  className={`${styles.sliderImg}`}
                  src={SliderOne}
                  alt="slide 1"
                />
              </div>
              <div>
                <Typography
                  variant="h2"
                  className={`${styles.header}`}
                >
                  Share your research as you go. Whether you only
                  have a research idea, or a full blown
                  experimental analysis.
                </Typography>
                <img
                  className={`${styles.sliderImg}`}
                  src={SliderTwo}
                  alt="slide 2"
                />
              </div>
              <div>
                <Typography
                  variant="h2"
                  className={`${styles.header}`}
                >
                  Get feedback step by step
                </Typography>
                <Typography
                  variant="h2"
                  className={`${styles.header}`}
                >
                  ... and help others refine their ideas.
                </Typography>
                <img
                  className={`${styles.sliderImg}`}
                  src={SliderThree}
                  alt="slide 3"
                />
              </div>
            </Slider>
            <img
              className={`${styles.leftAsterisk}`}
              src={Asterisk}
              alt="asterisk"
            />
          </div>
          <div className={`${styles.right}`}>
            <Typography
              variant="h2"
              className={`${styles.header}`}
            >
              Welcome back
            </Typography>
            <Typography className={`${styles.subheader}`}>
              Welcome back! You need to log in to publish
              comments and contributions
            </Typography>
            <Button
              type="submit"
              disabled={isLoading}
              variant="contained"
              size="large"
              className={`${styles.loginBtn}`}
              onClick={() => {
                if (token) {
                  localStorage.setItem('login', true)
                }
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
            <div className={`${styles.linkWrapper}`}>
              <Link
                className={`${styles.link}`}
                onClick={() => {
                  history.push(`/terms-and-conditions`)
                }}
              >
                Terms and Conditions
              </Link>
            </div>
            <img
              className={`${styles.midAsterisk}`}
              src={Asterisk}
              alt="asterisk"
            />
          </div>
        </div>
      </div>
    </>
  )
}

Login.propTypes = {}

export default Login
