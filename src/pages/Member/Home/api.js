import { getRequest, postRequest } from 'utils/http'

export const getToDosAPI = () => {
  return getRequest(`user/1/todos`)
}

export const addToDoAPI = newToDo => {
  return postRequest('/todos', newToDo)
}
