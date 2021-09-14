import { postRequest, putRequest } from 'utils/http'

export function postUserAPI(data) {
  return postRequest(`/api/v1/users/auth`, data)
}

export const putEmail = data => {
  return putRequest(`api/v1/users/email/${data.id}`, {
    email: data.email
  })
}
