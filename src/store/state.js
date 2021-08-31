import { QueryClient } from 'react-query'
import { createState, useState } from '@hookstate/core'
import { LocalForage } from 'utils/hookstate/LocalForage'

const defaultGlobalState = createState({
  isLoggedIn: false,
  user: {},
  login: false
})

export const useGlobalState = () => {
  const globalState = useState(defaultGlobalState)
  globalState.attach(LocalForage('globalState'))

  return globalState
}

export const queryClient = new QueryClient({
  defaultConfig: {
    queries: {
      staleTime: Infinity, // Change to milliseconds in case you want to refetch data in the background
      cacheTime: Infinity, // Change to milliseconds in case you want to garbage collect unused data
      retry: false
    }
  }
})
