import type { Coord } from '@/shared/model/coord'
import { useEffect, useState } from 'react'

let cachedCoord: Coord | null = null
let cachedError = !navigator.geolocation
let resolved = cachedError

const useGeolocation = () => {
  const [coord, setCoord] = useState<Coord | null>(cachedCoord)
  const [geoError, setGeoError] = useState(cachedError)

  useEffect(() => {
    if (resolved) return

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const c = { lat: pos.coords.latitude, lon: pos.coords.longitude }
        cachedCoord = c
        resolved = true
        setCoord(c)
      },
      () => {
        cachedError = true
        resolved = true
        setGeoError(true)
      }
    )
  }, [])

  return { coord, geoError } as const
}

export default useGeolocation
