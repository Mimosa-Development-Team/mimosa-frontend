import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Header from './Header'
import Content from './Content'
import styles from './styles.module.scss'

const Card = ({ tags, type, title, content }) => {
  return (
    <Paper elevation={0} className={`${styles.paper}`}>
      <Header tags={tags} type={type} title={title} />
      <Content content={content} />
    </Paper>
  )
}

Card.propTypes = {
  tags: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  content: PropTypes.any
}

export default Card
