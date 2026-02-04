import type { WeatherIconCode } from '@/shared/model/weather'
import type { IconType } from 'react-icons'
import {
  WiCloud,
  WiCloudy,
  WiDayCloudy,
  WiDayFog,
  WiDayRain,
  WiDayShowers,
  WiDaySnow,
  WiDaySunny,
  WiDayThunderstorm,
  WiNightAltCloudy,
  WiNightAltRain,
  WiNightAltShowers,
  WiNightAltSnow,
  WiNightAltThunderstorm,
  WiNightClear,
  WiNightFog,
} from 'react-icons/wi'

type WeatherIconMap = Record<WeatherIconCode, IconType>

const WEATHER_ICON_MAP: WeatherIconMap = {
  '01d': WiDaySunny,
  '01n': WiNightClear,
  '02d': WiDayCloudy,
  '02n': WiNightAltCloudy,
  '03d': WiCloud,
  '03n': WiCloud,
  '04d': WiCloudy,
  '04n': WiCloudy,
  '09d': WiDayShowers,
  '09n': WiNightAltShowers,
  '10d': WiDayRain,
  '10n': WiNightAltRain,
  '11d': WiDayThunderstorm,
  '11n': WiNightAltThunderstorm,
  '13d': WiDaySnow,
  '13n': WiNightAltSnow,
  '50d': WiDayFog,
  '50n': WiNightFog,
}

const WEATHER_COLOR_MAP: Record<WeatherIconCode, string> = {
  '01d': 'text-yellow-400',
  '01n': 'text-indigo-300',
  '02d': 'text-yellow-300',
  '02n': 'text-indigo-300',
  '03d': 'text-gray-300',
  '03n': 'text-gray-300',
  '04d': 'text-gray-400',
  '04n': 'text-gray-400',
  '09d': 'text-blue-300',
  '09n': 'text-blue-300',
  '10d': 'text-blue-400',
  '10n': 'text-blue-400',
  '11d': 'text-yellow-300',
  '11n': 'text-yellow-300',
  '13d': 'text-sky-200',
  '13n': 'text-sky-200',
  '50d': 'text-gray-400',
  '50n': 'text-gray-400',
}

interface WeatherIconProps {
  code: WeatherIconCode
  className?: string
}

const WeatherIcon = ({ code, className }: WeatherIconProps) => {
  const Icon = WEATHER_ICON_MAP[code] || WiDaySunny

  return <Icon className={`${WEATHER_COLOR_MAP[code]} ${className}`} />
}

export default WeatherIcon
