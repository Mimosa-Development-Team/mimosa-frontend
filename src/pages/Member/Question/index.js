import React from 'react'
import Sidebar from 'components/Sidebar'
import styles from './styles.module.scss'

const Question = () => {
  return (
    <div className={`${styles.questionWrapper}`}>
      <div className={`${styles.contentWrapper}`}>test</div>
      <Sidebar />
    </div>
  )
}

export default Question
