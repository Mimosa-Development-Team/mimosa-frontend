import {
  getRequest,
  deleteRequest,
  putRequest
} from 'utils/http'

export const getNotificationList = () => {
  return getRequest(`api/v1/notification`)
}

export const putEmail = emailNotification => {
  return putRequest(`api/v1/users`, emailNotification)
}

export const deleteNotificationSingle = id => {
  return deleteRequest(`/api/v1/notification/${id}`)
}

export const deleteNotificationAll = () => {
  return deleteRequest(`/api/v1/notification`)
}
