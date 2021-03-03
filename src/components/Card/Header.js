import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Tags from 'components/Tags'
import styles from './styles.module.scss'

const Header = ({ tags, type, title }) => {
  return (
    <div>
      <Tags data={tags} />
      <Typography variant="h2">
        <span className={`${styles.type} ${type}`}>
          {type}:{' '}
        </span>
        {title}
      </Typography>
    </div>
  )
}

Header.propTypes = {
  tags: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default Header
