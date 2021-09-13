import {
  getRequest,
  deleteRequest,
  putRequest
} from 'utils/http'

export const getNotificationList = () => {
  return getRequest(`api/v1/notification`)
}

export const putEmail = email => {
  return putRequest(`api/v1/user`, { email })
}

export const deleteNotificationSingle = id => {
  return deleteRequest(`/api/v1/notification/${id}`)
}

export const deleteNotificationAll = () => {
  return deleteRequest(`/api/v1/notification/all`)
}
