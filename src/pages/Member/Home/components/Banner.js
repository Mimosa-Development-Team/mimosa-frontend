import React, { useState } from 'react'
import { useGlobalState } from 'store/state'
import getRawData from 'utils/parsing/Proxy'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CloseIcon from '@material-ui/icons/Close'
import introImage from 'assets/images/intro-illustration.svg'
import styles from '../style.module.scss'

const Banner = () => {
  const [showBanner, setShowBanner] = useState(true)
  const { showHomeBanner } = useGlobalState()

  const handleClick = () => {
    setShowBanner(false)
    showHomeBanner.merge(false)
  }
  return (
    <>
      {getRawData(showHomeBanner) && showBanner ? (
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
              <Typography
                variant="p"
                className={`${styles.leadContent}`}
              >
                Sed ut perspiciatis unde omnis iste natus error
                sit voluptatem accusantium doloremque laudantium,
                otam rem aperiam, eaque ipsa quae ab illo
                inventore veritatis et quasi architecto
              </Typography>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </>
  )
}

export default Banner
