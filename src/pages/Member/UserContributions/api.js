/* eslint-disable prefer-destructuring */
import { getRequest } from 'utils/http'

export const getQuestionsAPI = data => {
  const pageNum = data.pageParam ? data.pageParam : 1
  const orderBy = data.queryKey[1].orderBy
  const userId = data.queryKey[1].userId

  return getRequest(
    `api/v1/contribution/question/${userId}/${orderBy}?page=${pageNum}&limit=10`
  )
}
