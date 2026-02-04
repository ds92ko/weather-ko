import type { WeatherResult } from '@/entities/weather/model/open-weather-map'
import Skeleton from '@/shared/ui/skeleton'
import WeatherCard from '@/shared/ui/weather-card'
import WeatherIcon from '@/shared/ui/weather-icon'

interface LocationWeatherProps {
  placeName: string
  weather?: WeatherResult
  isLoading: boolean
  isError: boolean
}

const WeatherError = () => {
  return (
    <div className="flex min-h-[160px] flex-col items-center justify-center py-8 text-center md:min-h-[184px]">
      <p className="text-sm text-blue-200">날씨 정보를 불러올 수 없습니다</p>
      <p className="mt-1 text-xs text-blue-300/60">
        잠시 후 다시 시도해 주세요
      </p>
    </div>
  )
}

const WeatherSkeleton = () => {
  return (
    <>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Skeleton
          className="h-14 w-14 md:h-20 md:w-20"
          variant="circle"
          theme="light"
        />
        <Skeleton className="h-12 w-16 md:h-20 md:w-24" theme="light" />
      </div>
      <Skeleton
        className="mx-auto mt-6 h-[20px] w-full max-w-60"
        theme="light"
      />
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        <Skeleton className="h-6 w-20 rounded-full border" theme="light" />
        <Skeleton className="h-6 w-20 rounded-full border" theme="light" />
      </div>
    </>
  )
}

const LocationWeather = ({
  placeName,
  weather,
  isLoading,
  isError,
}: LocationWeatherProps) => {
  return (
    <WeatherCard>
      <h3 className="truncate text-sm font-medium text-white/90">
        {placeName}
      </h3>
      {isError ? (
        <WeatherError />
      ) : isLoading || !weather ? (
        <WeatherSkeleton />
      ) : (
        <>
          <div className="mt-6 flex items-center justify-center gap-3">
            <WeatherIcon
              code={weather.icon}
              className="h-14 w-14 md:h-20 md:w-20"
            />
            <p className="text-5xl font-extralight tracking-tighter text-white drop-shadow-sm md:text-7xl">
              {weather.temp}°
            </p>
          </div>
          <p className="mt-6 text-sm text-white/90">{weather.description}</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-blue-100 ring-1 ring-white/20">
              최저 {weather.min}°
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-blue-100 ring-1 ring-white/20">
              최고 {weather.max}°
            </span>
          </div>
        </>
      )}
    </WeatherCard>
  )
}

export default LocationWeather
