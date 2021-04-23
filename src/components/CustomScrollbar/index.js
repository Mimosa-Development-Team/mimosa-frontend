import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import styles from './styles.module.scss'

const renderView = ({ style, ...props }) => {
  const viewStyle = {
    paddingRight: '22px',
    overflowX: 'hidden',
    marginTop: '0',
    marginBottom: '0'
  }
  return (
    <div
      className="box"
      style={{ ...style, ...viewStyle }}
      {...props}
      id="scrollableList"
    />
  )
}

const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    borderRadius: 4,
    backgroundColor: '#D7E1E8',
    right: '0px'
  }
  return <div style={{ ...style, ...thumbStyle }} {...props} />
}

const CustomScrollbar = props => {
  return (
    <Scrollbars
      renderView={renderView}
      renderThumbVertical={renderThumb}
      className={`${styles.scrollbar}`}
      {...props}
    />
  )
}

export default CustomScrollbar
