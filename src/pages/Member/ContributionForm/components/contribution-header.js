import React from 'react'
import {
  Card,
  Grid,
  Typography,
  CardContent,
  makeStyles
} from '@material-ui/core'
import capitalizeText from 'utils/parsing/capitalize'

const useStyles = makeStyles(() => ({
  question: {
    color: '#F2BA32',
    fontWeight: 'bold'
  },
  hypothesis: {
    color: '#EC8A2A',
    fontWeight: 'bold'
  },
  experiment: {
    color: '#54B356',
    fontWeight: 'bold'
  },
  data: {
    color: '#3576D6',
    fontWeight: 'bold'
  },
  analysis: {
    color: '#724586',
    fontWeight: 'bold'
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
        <Grid item sm={12}>
          <Typography variant="subtitle1" gutterBottom>
            This contribution will fall under{' '}
            {capitalizeText(data.category)}
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1">
                <span
                  className={
                    classes[data.category.toLowerCase()]
                  }
                >
                  {capitalizeText(data.category)}
                </span>
                : {data.subject}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12}>
          <Typography
            variant="h2"
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
