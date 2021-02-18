import { getRequest } from 'utils/http'

export function getFaqAPI() {
  return getRequest(`api/v1/faq`)
}
