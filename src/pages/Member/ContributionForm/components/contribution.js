import React from 'react'
import Controls from 'components/controls/Controls'
import {
  Button,
  Grid,
  Typography,
  Divider
} from '@material-ui/core'
import BackIcon from 'assets/images/icons/back.svg'
// import DeleteIcon from 'assets/images/icons/delete.svg'
import styles from './style.module.scss'

function ContributionForm() {
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={2}
    >
      <Grid item xs={12} sm={12}>
        <div className={`${styles.btnBack}`}>
          <div className={`${styles.backNav}`}>
            <Typography
              className={`${styles.back}`}
              variant="h4"
            >
              <span className={`${styles.icon}`}>
                <img src={BackIcon} alt="back" />
              </span>
              Back
            </Typography>
          </div>
        </div>
      </Grid>
      <Grid item sm={12} className="text2">
        <Controls.Input type="text" name="subject" />
      </Grid>
      <Grid item xs={12}>
        <Controls.Quill className="text3" name="details" />
      </Grid>
      <Grid item sm={12}>
        <Typography variant="h1" gutterBottom>
          Upcoming Conference
        </Typography>
      </Grid>
      <Grid item sm={12}>
        <Controls.Input
          type="text"
          label="Conference Name"
          name="conferenceName"
        />
      </Grid>
      <Grid item sm={2}>
        <Controls.Input
          type="date"
          label="Presentation Details"
          name="presentationDetails"
        />
      </Grid>
      <Grid item sm={2}>
        <Controls.Input
          type="time"
          label="Start Time GMT"
          name="startTime"
        />
      </Grid>
      <Grid item sm={2}>
        <Controls.Input
          type="time"
          label="End Time GMT"
          name="endTime"
        />
      </Grid>
      <Grid item xs={12}>
        <Divider variant="middle" />
      </Grid>
      <Typography className="ml-10" variant="h1" gutterBottom>
        Add Related Media
      </Typography>
      <Grid item xs={12}>
        <Controls.MultiSelect
          name="tags"
          label="Add tags to help people find your contribution"
          placeholder="Press Enter to add tag"
        />
      </Grid>
      <Grid item xs={12}>
        <Controls.MultiSelect
          name="author"
          asterisk
          label="Authors"
          placeholder="Press Enter to add author"
        />
      </Grid>
      <Grid item className={`${styles.btnContainer}`} xs={12}>
        <Button
          className="btn primary submitBtn publish"
          variant="contained"
          style={{ position: 'absolute', right: 22 }}
        >
          PUBLISH NOW
        </Button>
      </Grid>
    </Grid>
  )
}

export default ContributionForm
