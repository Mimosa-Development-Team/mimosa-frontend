import { getRequest } from 'utils/http'

export function getContributionAPI() {
  return getRequest(
    `api/v1/contribution/list/9591bc87-e762-4905-86d8-af179926bf6e`
  )
}
