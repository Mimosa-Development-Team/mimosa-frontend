import React from 'react'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import styles from './styles.module.scss'

const SearchField = props => {
  const { variant } = props
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

export default SearchField
