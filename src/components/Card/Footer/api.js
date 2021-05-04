import { deleteRequest, getRequest } from 'utils/http'

export const deleteContributionAPI = id => {
  return deleteRequest(`/api/v1/contribution/${id}`)
}

export const getCommentCountAPI = query => {
  if (query.queryKey[1].id) {
    return getRequest(
      `/api/v1/comment/count/${query.queryKey[1].id}`
    )
  }
  return null
}

export const getRelatedMediaCountAPI = query => {
  if (query.queryKey[1].id) {
    return getRequest(
      `/api/v1/related-media/count/${query.queryKey[1].id}`
    )
  }
  return null
}
