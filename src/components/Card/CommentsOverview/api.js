import { getRequest } from 'utils/http'

export function getCommentsAPI(query) {
  if (query.queryKey[1].id) {
    return getRequest(`api/v1/comment/${query.queryKey[1].id}`)
  }
  return null
}
