import { getRequest } from 'utils/http'

export const getQuestionsAPI = () => {
  return getRequest(`api/v1/contribution/questions`)
}
