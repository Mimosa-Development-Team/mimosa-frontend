import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
} from 'utils/http'

export function getCommentsAPI(query) {
  if (query.queryKey[1].id) {
    return getRequest(`api/v1/comment/${query.queryKey[1].id}`)
  }
  return null
}

export const postCommentAPI = data => {
  return postRequest(`/api/v1/comment`, data)
}

export const putCommentAPI = data => {
  return putRequest(`/api/v1/comment/${data.id}`, data)
}

export const deleteCommentAPI = id => {
  return deleteRequest(`/api/v1/comment/${id}`)
}
