import locationQueries from '@/entities/location/api/queries'
import weatherQueries from '@/entities/weather/api/queries'
import { type Coord, DEFAULT_COORD } from '@/shared/model/coord'
import { useQuery } from '@tanstack/react-query'

const useCurrentWeather = (coord: Coord | null) => {
  const { data: currentPlace } = useQuery({
    ...locationQueries.regionName(coord ?? DEFAULT_COORD),
    enabled: !!coord,
  })
  const {
    data: weather,
    isLoading,
    isError,
  } = useQuery({
    ...weatherQueries.weather(coord ?? DEFAULT_COORD),
    enabled: !!coord,
  })

  return { weather, currentPlace, isLoading, isError }
}

export default useCurrentWeather
