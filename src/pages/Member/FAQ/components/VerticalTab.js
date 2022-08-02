import React, { useState } from 'react'
import Tabs from '@material-ui/core/Tabs'
import { useHistory } from 'react-router-dom'
import Tab from '@material-ui/core/Tab'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import { useGlobalState } from 'store/state'
import getRawData from 'utils/hookstate/getRawData'
import Typography from '@material-ui/core/Typography'
import uuid from 'react-uuid'
import styles from './styles.module.scss'
import TabPanel from './TabPanel'
import Accordion from './Accordion'

function a11yProps() {
  return {
    id: `vertical-tab-${uuid()}`
  }
}

const Questions = ({ value, questions, qkey }) => {
  return questions.map((data1, index) => {
    return (
      <TabPanel value={value} index={qkey} key={index}>
        <Accordion
          title={data1.question}
          content={data1.fullDetails}
        />
      </TabPanel>
    )
  })
}

const Topic = ({ topic }) => {
  return (
    <div>
      <Typography className={`${styles.topicHeader}`}>
        {topic.topic}
      </Typography>
      <Typography variant="body2">
        {topic.shortDetails}
      </Typography>
    </div>
  )
}

const VerticalTab = ({ data }) => {
  const history = useHistory()
  const { user: proxyUser } = useGlobalState()
  const { user } = getRawData(proxyUser)
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={`${styles.tabsWrapper}`}>
      <Grid container spacing={3}>
        <Hidden smDown implementation="css">
          <Grid item xs={12} sm={3} />
        </Hidden>
        <Grid item xs={12} sm={9}>
          <Typography
            className={`${styles.h5style}`}
            variant="span"
          >
            Frequently Asked Questions
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="FAQ Topics"
            className={`${styles.tabs}`}
            disableripple="true"
            classes={{
              indicator: `${styles.tabIndicator}`
            }}
          >
            {(data || []).map((data, key) => (
              <Tab
                key={key}
                className={`${styles.tab}`}
                label={<Topic topic={data} />}
                {...a11yProps({ key })}
                classes={{
                  wrapper: `${styles.tabWrapper}`,
                  selected: `${styles.tabSelected}`
                }}
              />
            ))}
          </Tabs>
          {user && (
            <Button
              style={{ marginTop: '25px', width: '65%' }}
              className="btn primary"
              size="large"
              variant="contained"
              onClick={async () => {
                const tempData = user
                tempData.notification = true
                await proxyUser.user.set(tempData)
                history.push('/')
              }}
            >
              HOW TO
            </Button>
          )}
        </Grid>
        <Grid item xs={12} sm={9}>
          {(data || []).map((data, key1) => {
            return (
              <Questions
                value={value}
                questions={data.questions}
                qkey={key1}
                key={key1}
              />
            )
          })}
        </Grid>
      </Grid>
    </div>
  )
}

export default VerticalTab
