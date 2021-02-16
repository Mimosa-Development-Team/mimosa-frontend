import localForage from 'localforage'

const PluginID = Symbol('LocalForage')

export const LocalForage = localStorageKey => {
  return () => ({
    id: PluginID,
    init: state => {
      localForage.getItem(localStorageKey).then(persisted => {
        if (persisted !== null) {
          state.set(persisted)
        } else if (!state.promised && !state.error) {
          localForage.setItem(localStorageKey, state.value)
        }
      })
      return {
        onSet: p => {
          if ('state' in p) {
            localForage.setItem(localStorageKey, p.state)
          } else {
            localForage.removeItem(localStorageKey)
          }
        }
      }
    }
  })
}
