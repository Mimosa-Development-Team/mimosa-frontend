import { postRequest } from 'utils/http'

export function postUserAPI(data) {
  return postRequest(`/api/v1/users/auth`, data)
}
