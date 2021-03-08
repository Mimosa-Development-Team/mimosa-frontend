import { Downgraded } from '@hookstate/core'

export default function getRawData(proxyData) {
  return proxyData.attach(Downgraded).get()
}
