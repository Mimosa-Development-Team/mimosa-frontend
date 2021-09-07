import { getRequest } from 'utils/http'

export const getContributionAPI = () => {
  return getRequest(`api/v1/contribution/questionslist`)
}
