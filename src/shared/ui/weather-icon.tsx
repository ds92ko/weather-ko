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

interface WeatherIconProps {
  code: WeatherIconCode
  className?: string
}

const WeatherIcon = ({ code, className }: WeatherIconProps) => {
  const Icon = WEATHER_ICON_MAP[code] || WiDaySunny

  return <Icon className={className} />
}

export default WeatherIcon
