import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import styles from './styles.module.scss'

const SearchField = ({ variant }) => {
  return (
    <Paper
      component="form"
      className={`
        ${styles.searchField}
        ${variant === 'large' ? styles.large : ''}`}
    >
      <InputBase
        className={`${styles.input}`}
        placeholder="Search for keywords, authors, tags, presentation date"
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton
        type="submit"
        className={`${styles.iconButton}`}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

SearchField.propTypes = {
  variant: PropTypes.string
}

export default SearchField