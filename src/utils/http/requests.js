import axios from 'axios'

import dotenv from 'global/environment'
import localForage from 'localforage'
import { handleHttpError } from './handleHttpError'

const axiosInstance = axios.create({
  baseURL: dotenv.apiBaseUrl
})

function makeHttpRequest(apiCall) {
  return new Promise(async (resolve, reject) => {
    try {
      const localData = await localForage.getItem('globalState')
      if (localData) {
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${
          localData.user ? localData.user.token : ''
        }`
      }
      const req = await apiCall()
      resolve(req.data)
    } catch (e) {
      reject(handleHttpError(e))
    }
  })
}

export function getRequest(path, options = {}) {
  return makeHttpRequest(() => axiosInstance.get(path, options))
}

export function postRequest(path, data, options = {}) {
  return makeHttpRequest(() =>
    axiosInstance.post(path, data, options)
  )
}

export function putRequest(path, data, options = {}) {
  return makeHttpRequest(() =>
    axiosInstance.put(path, data, options)
  )
}

export function deleteRequest(path, options = {}) {
  return makeHttpRequest(() =>
    axiosInstance.delete(path, options)
  )
}
