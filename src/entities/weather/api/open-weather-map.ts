import { API_KEY, BASE_URL } from '@/entities/weather/config'
import type {
  OneCallResponse,
  OpenWeatherMapApi,
} from '@/entities/weather/model/open-weather-map'

const openWeatherMapApi: OpenWeatherMapApi = {
  getWeather: async ({ lat, lon }) => {
    const res = await fetch(
      `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr&exclude=minutely,alerts`
    )
    if (!res.ok) throw { status: res.status }

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
