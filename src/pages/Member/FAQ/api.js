import { getRequest } from 'utils/http'

export function getFaqAPI() {
  return getRequest(`api/v1/faq`)
}

export const getFaqResultsAPI = query => {
  if (query.queryKey[1].search) {
    return getRequest(`/api/v1/faq/${query.queryKey[1].search}`)
  }
  return null
}
