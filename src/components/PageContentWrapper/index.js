import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import CustomScrollbar from 'components/CustomScrollbar'
import styles from './styles.module.scss'

const PageContentWrapper = ({ children, backNav }) => {
  const history = useHistory()

  return (
    <div className={`${styles.contentWrapper}`}>
      {backNav && (
        <div
          onClick={() => history.goBack()}
          className={`${styles.backNav}`}
        >
          <Typography className={`${styles.back}`} variant="h4">
            Back
          </Typography>
        </div>
      )}
      <CustomScrollbar>{children}</CustomScrollbar>
    </div>
  )
}

PageContentWrapper.propTypes = {
  children: PropTypes.node
}

export default PageContentWrapper
