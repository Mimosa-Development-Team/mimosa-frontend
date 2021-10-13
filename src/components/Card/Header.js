import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

// import HTMLEllipsis from 'react-lines-ellipsis/lib/html'
import QuestionIcon from 'assets/images/icons/question-icon.svg'
import HypothesisIcon from 'assets/images/icons/hypothesis-icon.svg'
import ExperimentIcon from 'assets/images/icons/experiment-icon.svg'
import DataIcon from 'assets/images/icons/data-icon.svg'
import AnalysisIcon from 'assets/images/icons/analysis-icon.svg'
import Tags from './Tags'
import styles from './styles.module.scss'

const Header = ({
  // treeView,
  type,
  title,
  questionTags,
  analysisTag,
  deprecated,
  data,
  click,
  heirarchyList
}) => {
  return (
    <div onClick={() => !heirarchyList && click()}>
      <Tags
        type={type}
        questionTags={questionTags}
        analysisTag={analysisTag}
        deprecated={deprecated}
      />
      {data.status === `draft` || data.draft ? ( //data.status === 'draft' || data.draft
        <div style={{ paddingBottom: '5px' }}>
          <span>
            <i className={`${styles.draft}`}>Draft </i>{' '}
            {data.draft &&
              data.draft.subject !== data.subject &&
              data.draft.subject}
          </span>
        </div>
      ) : null}
      <Typography
        variant="h2"
        className={`${!heirarchyList && styles.headerTitle}`}
      >
        {type === 'question' && (
          <span className={`${styles.type} ${type}`}>
            <img src={QuestionIcon} /> {type}
          </span>
        )}
        {type === 'hypothesis' && (
          <span className={`${styles.type} ${type}`}>
            <img src={HypothesisIcon} /> {type}
          </span>
        )}
        {type === 'experiment' && (
          <span className={`${styles.type} ${type}`}>
            <img src={ExperimentIcon} /> {type}
          </span>
        )}
        {type === 'data' && (
          <span className={`${styles.type} ${type}`}>
            <img src={DataIcon} /> {type}
          </span>
        )}
        {type === 'analysis' && (
          <span className={`${styles.type} ${type}`}>
            <img src={AnalysisIcon} /> {type}
          </span>
        )}{' '}
        {title}
      </Typography>
    </div>
  )
}

Header.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  questionTags: PropTypes.node,
  analysisTag: PropTypes.any,
  deprecated: PropTypes.bool
}

export default Header
