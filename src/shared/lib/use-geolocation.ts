import type { Coord } from '@/shared/model/coord'
import { useEffect, useState } from 'react'

const useGeolocation = () => {
  const [coord, setCoord] = useState<Coord | null>(null)
  const [geoError, setGeoError] = useState(!navigator.geolocation)

  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoord({ lat: pos.coords.latitude, lon: pos.coords.longitude })
      },
      () => {
        setGeoError(true)
      }
    )
  }, [])

  return { coord, geoError } as const
}

export default useGeolocation
