import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import CommentsOverview from '../CommentsOverview'
import RelatedMedia from '../RelatedMedia'
import styles from './styles.module.scss'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const QuestionDetails = ({
  contributionId,
  activeTab,
  handleTabChange,
  userId,
  user,
  hasSession
}) => {
  return (
    <div className={`${styles.questionDetails}`}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="simple tabs"
        className={`${styles.tabs}`}
        disableRipple
        classes={{
          indicator: `${styles.tabIndicator}`
        }}
      >
        <Tab
          className={`${styles.tab}`}
          label="Related Media"
          disableRipple
          {...a11yProps(0)}
          classes={{
            wrapper: `${styles.tabWrapper}`,
            selected: `${styles.tabSelected}`
          }}
        />
        <Tab
          className={`${styles.tab}`}
          label="Comments Overview"
          disableRipple
          {...a11yProps(1)}
          classes={{
            wrapper: `${styles.tabWrapper}`,
            selected: `${styles.tabSelected}`
          }}
        />
      </Tabs>
      <TabPanel value={activeTab} index={0}>
        <RelatedMedia
          user={user}
          hasSession={hasSession}
          userId={userId}
          contributionId={contributionId}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <CommentsOverview
          user={user}
          hasSession={hasSession}
          userId={userId}
          contributionId={contributionId}
        />
      </TabPanel>
    </div>
  )
}

export default QuestionDetails
