import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useQueryParams } from 'utils/html/queryParams'
import Typography from '@material-ui/core/Typography'
import CustomScrollbar from 'components/CustomScrollbar'
import BackIcon from 'assets/images/icons/back.svg'
import styles from './styles.module.scss'

const PageContentWrapper = ({ children, backNav }) => {
  const history = useHistory()
  const queryParams = useQueryParams()
  const url = queryParams.get('from')
  return (
    <div className={`${styles.contentWrapper}`}>
      {backNav && (
        <div
          onClick={() => {
            if (url === 'profile') {
              history.push('/my-contributions')
            } else {
              history.push('/')
            }
          }}
          className={`${styles.backNav}`}
        >
          <Typography className={`${styles.back}`} variant="h4">
            <span className={`${styles.icon}`}>
              <img src={BackIcon} alt="back" />
            </span>
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
