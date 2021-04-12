import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import styles from './styles.module.scss'

const SearchField = ({
  variant,
  inputChange,
  inputSubmit,
  inputClear,
  search
}) => {
  return (
    <Paper
      className={`
        ${styles.searchField}
        ${variant === 'large' ? styles.large : ''}`}
    >
      <form
        className={`${styles.form}`}
        onReset={inputClear}
        onSubmit={e => {
          e.preventDefault()
          inputSubmit()
        }}
      >
        <InputBase
          className={`${styles.input}`}
          placeholder="Search for keywords, authors, tags, presentation date"
          inputProps={{ 'aria-label': 'search' }}
          onKeyUp={e => inputChange(e)}
        />
        {search ? (
          <IconButton
            className={`${styles.iconButton}`}
            aria-label="close"
            // onClick={inputClear}
            type="reset"
          >
            <CloseIcon />
          </IconButton>
        ) : (
          <IconButton
            className={`${styles.iconButton}`}
            aria-label="search"
            onClick={inputSubmit}
          >
            <SearchIcon />
          </IconButton>
        )}
      </form>
    </Paper>
  )
}

SearchField.propTypes = {
  variant: PropTypes.string
}

export default SearchField
