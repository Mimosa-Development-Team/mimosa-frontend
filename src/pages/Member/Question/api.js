import { getRequest } from 'utils/http'

export function getContributionAPI() {
  const id = window.location.pathname.split('/').pop()
  return getRequest(`api/v1/contribution/list/${id}`)
}
