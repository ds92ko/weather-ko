import useLocationWeather from '@/features/weather/lib/use-location-weather'
import DISTRICTS from '@/shared/data/korea_districts.json' with { type: 'json' }
import { FallbackError } from '@/shared/lib/fallback-error'
import useTitle from '@/shared/lib/use-title'
import FavoriteToolbar from '@/widgets/favorite/ui/favorite-toolbar'
import HourlyOverview from '@/widgets/weather/ui/hourly-overview'
import LocationWeather from '@/widgets/weather/ui/location-weather'
import TempDistribution from '@/widgets/weather/ui/temp-distribution'
import { useParams } from 'react-router-dom'

const Weather = () => {
  const { location } = useParams<{ location: string }>()

  const isNotFound = !location || !DISTRICTS.includes(location)
  if (isNotFound) throw new FallbackError('location')

  const { placeName, weather, isLoading, isError } =
    useLocationWeather(location)
  useTitle(placeName)

  return (
    <>
      <FavoriteToolbar location={location} />
      <LocationWeather
        placeName={placeName}
        weather={weather}
        isLoading={isLoading}
        isError={isError}
      />
      <HourlyOverview
        hourly={weather?.hourly}
        isLoading={isLoading}
        isError={isError}
      />
      <TempDistribution
        weather={weather}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  )
}

export default Weather
