import { getRequest } from 'utils/http'

export const getContributionAPI = id => {
  return getRequest(`api/v1/contribution/questionslist/${id}`)
}
