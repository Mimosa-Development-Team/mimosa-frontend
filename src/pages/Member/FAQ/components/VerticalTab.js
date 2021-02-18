import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Grid from '@material-ui/core/Grid'
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

const VerticalTab = props => {
  const { data } = props
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={`${styles.tabsWrapper}`}>
      <Grid container spacing={3}>
        <Grid item xs={3} />
        <Grid item xs={9}>
          <Typography variant="h5">
            Frequently Asked Questions
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={`${styles.tabs}`}
            disableRipple="true"
            classes={{
              indicator: `${styles.tabIndicator}`
            }}
          >
            {(data || []).map((data, key) => (
              <Tab
                className={`${styles.tab}`}
                label={data.topic}
                {...a11yProps({ key })}
                classes={{
                  wrapper: `${styles.tabWrapper}`
                }}
              />
            ))}
          </Tabs>
        </Grid>
        <Grid item xs={9}>
          {(data || []).map((data, key) => (
            <TabPanel value={value} index={key}>
              <Accordion
                title={data.question}
                content={data.fullDetails}
              />
            </TabPanel>
          ))}
        </Grid>
      </Grid>
    </div>
  )
}

export default VerticalTab
