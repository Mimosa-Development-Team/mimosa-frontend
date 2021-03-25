import { putRequest, postRequest, getRequest } from 'utils/http'

export const getUserAPI = () => {
  return getRequest(`/api/v1/users/list`)
}

export const getTagsAPI = () => {
  return getRequest(`/api/v1/contribution/tags`)
}

export const postContributionAPI = data => {
  return postRequest(`/api/v1/contribution`, data)
}

export const putContributionAPI = data => {
  return putRequest(`/api/v1/contribution/${data.id}`, data)
}

export const getRelatedMediaAPI = data => {
  const { id } = data.queryKey[1]
  return getRequest(`/api/v1/related-media/${id}`)
}
