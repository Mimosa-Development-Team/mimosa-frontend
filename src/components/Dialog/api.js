import { getRequest, putRequest } from 'utils/http'

export function getCommentsAPI(query) {
  if (query.queryKey[1].id) {
    return getRequest(`api/v1/comment/${query.queryKey[1].id}`)
  }
  return null
}

export const putEmail = data => {
  return putRequest(`api/v1/users/email/${data.id}`, {
    email: data.email
  })
}
