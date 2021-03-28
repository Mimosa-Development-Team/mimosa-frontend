import { getRequest, postRequest } from 'utils/http'

export function getMediaAPI(query) {
  if (query.queryKey[1].id) {
    return getRequest(
      `/api/v1/related-media/${query.queryKey[1].id}`
    )
  }
  return null
}

export function postRelatedMedia(data) {
  return postRequest(`/api/v1/related-media`, data)
}
