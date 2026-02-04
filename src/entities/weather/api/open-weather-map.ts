import { API_KEY, BASE_URL } from '@/entities/weather/config'
import type {
  CurrentWeatherResponse,
  ForecastResponse,
  OneCallResponse,
  OpenWeatherMapApi,
  WeatherQuery,
} from '@/entities/weather/model/open-weather-map'
import { ApiError } from '@/shared/api/api-error'

const getFreeWeather = async ({ lat, lon }: WeatherQuery) => {
  const params = `lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`

  const [currentRes, forecastRes] = await Promise.all([
    fetch(`${BASE_URL}/2.5/weather?${params}`),
    fetch(`${BASE_URL}/2.5/forecast?${params}`),
  ])

  if (!currentRes.ok || !forecastRes.ok) {
    throw new ApiError(currentRes.ok ? forecastRes.status : currentRes.status)
  }

  const current: CurrentWeatherResponse = await currentRes.json()
  const forecast: ForecastResponse = await forecastRes.json()

  const today = new Date().toDateString()
  const todayForecasts = forecast.list.filter(
    (item) => new Date(item.dt * 1000).toDateString() === today
  )

  const temps = todayForecasts.map((item) => item.main.temp)
  const forecastMin =
    temps.length > 0 ? Math.min(...temps) : current.main.temp_min
  const forecastMax =
    temps.length > 0 ? Math.max(...temps) : current.main.temp_max

  return {
    temp: Math.round(current.main.temp),
    description: current.weather[0]?.description ?? '',
    icon: current.weather[0]?.icon ?? '01d',
    min: Math.round(Math.min(current.main.temp_min, forecastMin)),
    max: Math.round(Math.max(current.main.temp_max, forecastMax)),
    hourly: forecast.list.slice(0, 8).map((item, i) => ({
      time: i === 0 ? '지금' : `${new Date(item.dt * 1000).getHours()}시`,
      temp: Math.round(item.main.temp),
      icon: item.weather[0]?.icon ?? '01d',
    })),
  }
}

const openWeatherMapApi: OpenWeatherMapApi = {
  getWeather: async ({ lat, lon }) => {
    const res = await fetch(
      `${BASE_URL}/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr&exclude=minutely,alerts`
    )

    if (res.status === 429) return getFreeWeather({ lat, lon })

    if (!res.ok) throw new ApiError(res.status)

    const data: OneCallResponse = await res.json()

    return {
      temp: Math.round(data.current.temp),
      description: data.current.weather[0]?.description ?? '',
      icon: data.current.weather[0]?.icon ?? '01d',
      min: Math.round(data.daily[0]?.temp.min ?? 0),
      max: Math.round(data.daily[0]?.temp.max ?? 0),
      hourly: data.hourly.slice(0, 24).map((h, i) => ({
        time: i === 0 ? '지금' : `${new Date(h.dt * 1000).getHours()}시`,
        temp: Math.round(h.temp),
        icon: h.weather[0]?.icon ?? '01d',
      })),
    }
  },
}

export default openWeatherMapApi
