import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CloseIcon from '@material-ui/icons/Close'
import SearchIcon from 'assets/images/home/search.svg'
import ContributeIcon from 'assets/images/home/contribute.svg'
import introImage from 'assets/images/intro-illustration.svg'
import styles from '../style.module.scss'

const Banner = () => {
  const [showBanner, setShowBanner] = useState(true)
  const showHomeBanner = localStorage.getItem('showHomeBanner')
    ? JSON.parse(localStorage.getItem('showHomeBanner'))
    : true

  const handleClick = () => {
    setShowBanner(false)
    localStorage.setItem('showHomeBanner', false)
  }
  return (
    <>
      {showHomeBanner && showBanner ? (
        <Card className={`${styles.bannerDiv}`}>
          <CardContent className={`${styles.details}`}>
            <img
              src={introImage}
              className={`${styles.introImg}`}
              alt="intro-image"
            />
            <div className={`${styles.contents}`}>
              <CloseIcon
                className={`${styles.closeIcon}`}
                onClick={handleClick}
              />
              <Typography
                variant="h2"
                className={`${styles.leadTitle}`}
              >
                Welcome to mimosa! Let’s get you started.
              </Typography>
              <Typography className={`${styles.leadContent}`}>
                Browse by keywords, authors, or conferences using
                the{' '}
                <span>
                  <img src={SearchIcon} alt="search" />
                </span>{' '}
                search bar.
              </Typography>
              <Typography className={`${styles.leadContent}`}>
                Publish a new contribution using the{' '}
                <span>
                  <img src={ContributeIcon} alt="contribute" />
                </span>{' '}
                button at the top of this page, or add your
                analysis to an existing experiment by using the{' '}
                <span>
                  <img
                    src={ContributeIcon}
                    alt="contribute icon"
                  />
                </span>{' '}
                button in the experiment&apos;s page.
              </Typography>
              <Typography className={`${styles.leadContent}`}>
                Give feedback about contributions using the
                comment function.
              </Typography>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </>
  )
}

export default Banner
