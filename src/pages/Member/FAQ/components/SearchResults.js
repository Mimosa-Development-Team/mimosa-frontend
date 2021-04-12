import React from 'react'
import Typography from '@material-ui/core/Typography'
import Accordion from './Accordion'
import styles from './styles.module.scss'

const SearchResults = ({ searchTerm, data }) => {
  return (
    <div className={`${styles.resultsWrapper}`}>
      <Typography className="mb-20" variant="h5">
        Showing results for
        <span className="search-term">
          {' `'}
          {searchTerm}
          {'`'}
        </span>
      </Typography>
      {(data || []).map(data => {
        return (
          <Accordion
            title={data.question}
            content={data.fullDetails}
          />
        )
      })}
    </div>
  )
}

export default SearchResults
