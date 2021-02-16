import { getRequest } from 'utils/http'

export function getUserAPI() {
  return getRequest(`users/1`)
}
