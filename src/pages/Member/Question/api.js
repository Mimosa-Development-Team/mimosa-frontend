import { getRequest } from 'utils/http'

export const getContributionAPI = id => {
  return getRequest(`api/v1/contribution/questionslist/${id}`)
}

export const getSingleAPI = id => {
  return getRequest(`api/v1/contribution/question/${id}`)
}
