/* eslint-disable prefer-destructuring */
import { getRequest } from 'utils/http'

export const getQuestionsAPI = data => {
  const pageNum = data.pageParam ? data.pageParam : 1
  const orderBy = data.queryKey[1].orderBy
  return getRequest(
    `api/v1/contribution/questions?page=${pageNum}&limit=10&orderBy=${orderBy}`
  )
}

export const getResultsAPI = query => {
  if (query.queryKey[1].search) {
    return getRequest(
      `/api/v1/contribution/search?data=${query.queryKey[1].search}`
    )
  }
  return null
}
