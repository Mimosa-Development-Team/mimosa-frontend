import React from 'react'
import PropTypes from 'prop-types'
import QuestionTags from 'components/Tags/QuestionTags'
import AnalysisTag from 'components/Tags/AnalysisTag'
import DeprecatedTag from 'components/Tags/DeprecatedTag'

const Tags = ({
  type,
  questionTags,
  analysisTag,
  deprecated
}) => {
  return (
    <div>
      {type === 'question' && questionTags.length > 0 && (
        <QuestionTags data={questionTags} />
      )}
      {type !== 'question' && deprecated && <DeprecatedTag />}
      {type === 'analysis' && analysisTag && (
        <AnalysisTag variant={analysisTag} />
      )}
    </div>
  )
}

Tags.propTypes = {
  type: PropTypes.string.isRequired,
  questionTags: PropTypes.array,
  analysisTag: PropTypes.any,
  deprecated: PropTypes.bool
}

export default Tags
