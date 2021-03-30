import { getRequest } from 'utils/http'

export const getResultsAPI = query => {
  if (query.queryKey[1].search) {
    return getRequest(
      `/api/v1/contribution/search?data=${query.queryKey[1].search}`
    )
  }
  return null
}
