import { getRequest } from 'utils/http'

export function getContributionAPI() {
  return getRequest(
    `api/v1/contribution/list/a56c199f-be27-4be9-acf5-aeb924eafcc1`
  )
}
