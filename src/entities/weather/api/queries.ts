import openWeatherMapApi from '@/entities/weather/api/open-weather-map'
import type { WeatherQuery } from '@/entities/weather/model/open-weather-map'
import { queryOptions } from '@tanstack/react-query'

const weatherQueries = {
  all: ['weather'] as const,
  weather: (query: WeatherQuery) =>
    queryOptions({
      queryKey: [...weatherQueries.all, query],
      queryFn: () => openWeatherMapApi.getWeather(query),
    }),
}

export default weatherQueries
