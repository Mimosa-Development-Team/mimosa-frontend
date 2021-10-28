import { getRequest, putRequest } from 'utils/http'

export const getSettings = () => {
  return getRequest(`/users/settings`)
}

export const editSettings = payload => {
  return putRequest(`/users/settings`, payload)
}
