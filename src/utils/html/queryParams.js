import { useLocation } from 'react-router-dom'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

export const useQueryParams = () => {
  const query = useQuery()

  return query
}
