/* eslint-disable no-nested-ternary */
import React from 'react'
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Card from 'components/Card'
import Loading from 'components/LoadingPage'
import NoResultsFound from 'components/NoResultsFound'
import styles from '../style.module.scss'

const SearchResults = ({
  data: arrayData,
  searchTerm,
  resultLoading
}) => {
  const history = useHistory()
  return (
    <>
      {arrayData && !resultLoading ? (
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
          {(arrayData || []).map(data => (
            <div
              className={`${styles.content}`}
              onClick={() => {
                history.push(
                  `/contribution?list=${data.id}&from=home`,
                  { state: data }
                )
              }}
            >
              <Card
                heirarchyList
                data={data}
                form={false}
                hideDetails
                hideEdit
              />
            </div>
          ))}
        </>
      ) : resultLoading ? (
        <Loading />
      ) : (
        <NoResultsFound term={searchTerm} />
      )}
    </>
  )
}

export default SearchResults
