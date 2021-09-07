import React, { useState } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'
import styles from './styles.module.scss'
import TabPanel from './TabPanel'
import Accordion from './Accordion'

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
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
          <Typography variant="h5">
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
