import locationQueries from '@/entities/location/api/queries'
import weatherQueries from '@/entities/weather/api/queries'
import DISTRICTS from '@/shared/data/korea_districts.json' with { type: 'json' }
import { displayLocation } from '@/shared/lib/format'
import { DEFAULT_COORD } from '@/shared/model/coord'
import { useQuery } from '@tanstack/react-query'

const useLocationWeather = (location: string) => {
  const placeName = displayLocation(location)

  const { data: coord } = useQuery({
    ...locationQueries.geocode(placeName),
    enabled: !!location && DISTRICTS.includes(location),
  })
  const { data: weather, isLoading } = useQuery({
    ...weatherQueries.weather(coord ?? DEFAULT_COORD),
    enabled: !!coord,
  })

  return { placeName, weather, isLoading }
}

export default useLocationWeather
