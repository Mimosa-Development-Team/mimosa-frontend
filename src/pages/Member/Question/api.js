import { getRequest } from 'utils/http'

export const getContributionAPI = data => {
  const id = window.location.pathname.split('/').pop()

  return getRequest(
    `api/v1/contribution/list/${id}/${data.queryKey[1].userId}`
  )
}
