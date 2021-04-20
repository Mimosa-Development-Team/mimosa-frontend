import React from 'react'
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Card from 'components/Card'
import NoResultsFound from 'components/NoResultsFound'
import styles from '../style.module.scss'

const SearchResults = ({ data, searchTerm }) => {
  const history = useHistory()
  return (
    <>
      {data ? (
        <>
          <div className={`${styles.paperListHeader}`}>
            <Typography
              className={`${styles.title}`}
              variant="h5"
            >
              Showing results for
              <span className="search-term">
                {' `'}
                {searchTerm}
                {'`'}
              </span>
            </Typography>
          </div>
          {(data || []).map(data => (
            <div
              className={`${styles.content}`}
              onClick={() => {
                history.push(
                  `/contribution/${data.parentQuestionId}`,
                  { state: data }
                )
              }}
            >
              <Card
                data={data}
                form={false}
                hideDetails
                hideEdit
              />
            </div>
          ))}
        </>
      ) : (
        <NoResultsFound term={searchTerm} />
      )}
    </>
  )
}

export default SearchResults
