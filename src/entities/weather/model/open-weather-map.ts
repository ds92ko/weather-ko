import type { Coord } from '@/shared/model/coord'
import type { Hourly, WeatherIconCode } from '@/shared/model/weather'

interface OneCallWeather {
  icon?: WeatherIconCode
  description?: string
}
interface OneCallDaily {
  temp: { min: number; max: number }
}
interface OneCallHourly {
  dt: number
  temp: number
  weather: OneCallWeather[]
}
export interface OneCallResponse {
  current: {
    temp: number
    weather: OneCallWeather[]
  }
  daily: OneCallDaily[]
  hourly: OneCallHourly[]
}

export type WeatherQuery = Coord
interface WeatherResult {
  temp: number
  description: string
  icon: WeatherIconCode
  min: number
  max: number
  hourly: Hourly[]
}
type GetWeather = (query: WeatherQuery) => Promise<WeatherResult>

export interface OpenWeatherMapApi {
  getWeather: GetWeather
}
