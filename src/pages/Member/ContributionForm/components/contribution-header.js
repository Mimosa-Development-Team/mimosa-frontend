import React from 'react'
import {
  Card,
  Grid,
  Typography,
  CardContent,
  makeStyles
} from '@material-ui/core'
import capitalizeText from 'utils/parsing/capitalize'
import styles from './style.module.scss'

const useStyles = makeStyles(() => ({
  question: {
    color: '#F2BA1D!important',
    fontFamily: 'Roboto-Bold!important',
    marginRight: '3px'
  },
  hypothesis: {
    color: '#EC8A2A!important',
    fontFamily: 'Roboto-Bold!important',
    marginRight: '3px'
  },
  experiment: {
    color: '#54B356!important',
    fontFamily: 'Roboto-Bold!important',
    marginRight: '3px'
  },
  data: {
    color: '#3576D6!important',
    fontFamily: 'Roboto-Bold!important',
    marginRight: '3px'
  },
  analysis: {
    color: '#724586!important',
    fontFamily: 'Roboto-Bold!important',
    marginRight: '3px'
  }
}))

const ContributionHeader = ({ data, type }) => {
  const classes = useStyles()
  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={3}
      >
        <Grid item xs={12} sm={12}>
          <Typography
            className={`${styles.label}`}
            variant="subtitle1"
            gutterBottom
          >
            This contribution will fall under{' '}
            {capitalizeText(data.category)}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Card variant="outlined" className="inputCard">
            <CardContent>
              <Typography className="inputContent">
                <span
                  className={
                    classes[data.category.toLowerCase()]
                  }
                >
                  {capitalizeText(data.category)}:
                </span>
                {data.subject}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography
            variant="h4"
            className={classes[type.toLowerCase()]}
          >
            {type}
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default ContributionHeader
