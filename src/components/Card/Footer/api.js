import { deleteRequest } from 'utils/http'

export const deleteContributionAPI = id => {
  return deleteRequest(`/api/v1/contribution/${id}`)
}
