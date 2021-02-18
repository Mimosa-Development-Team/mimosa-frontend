import React from 'react'
import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import styles from './styles.module.scss'

const TabPanel = props => {
  const { title, content } = props
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div className={`${styles.accordionWrapper}`}>
      <Accordion
        className={`${styles.accordion}`}
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          className={`${styles.accordionSummary}`}
          expandIcon={
            expanded === 'panel1' ? (
              // temp inline style - set colors usable in components @k
              <RemoveIcon style={{ color: '#EF8C20' }} />
            ) : (
              <AddIcon style={{ color: '#EF8C20' }} />
            )
          }
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
