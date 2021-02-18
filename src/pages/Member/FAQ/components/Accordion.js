import React from 'react'
import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import styles from './styles.module.scss'

const TabPanel = props => {
  const { title, content } = props

  return (
    <div className={`${styles.accordionWrapper}`}>
      <Accordion className={`${styles.accordion}`}>
        <AccordionSummary
          className={`${styles.accordionSummary}`}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h3">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails
          className={`${styles.accordionDetails}`}
        >
          <Typography>{content}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default TabPanel
