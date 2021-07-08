import { deleteRequest, getRequest } from 'utils/http'

// why is this different from the others
export const deleteContributionAPI = id => {
  return deleteRequest(`/api/v1/contribution/${id}`)
}

export const deleteDraftAPI = id => {
  return deleteRequest(`/api/v1/draft/${id}`)
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
