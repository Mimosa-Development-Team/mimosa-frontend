import { getRequest } from 'utils/http'

export const getQuestionsAPI = data => {
  const pageNum = data.pageParam ? data.pageParam : 1
  return getRequest(
    `api/v1/contribution/questions?page=${pageNum}&limit=10`
  )
}
