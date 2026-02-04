import useCurrentWeather from '@/features/weather/lib/use-current-weather'
import useGeolocation from '@/shared/lib/use-geolocation'
import HourlyWeather, {
  HourlyWeatherSkeleton,
} from '@/shared/ui/hourly-weather'
import Skeleton from '@/shared/ui/skeleton'
import TempRange from '@/shared/ui/temp-range'
import WeatherCard from '@/shared/ui/weather-card'
import WeatherError from '@/shared/ui/weather-error'
import WeatherIcon from '@/shared/ui/weather-icon'
import { cva } from 'class-variance-authority'

const styles = cva('mb-4 truncate text-sm font-medium text-white/90', {
  variants: {
    loading: {
      true: 'animate-pulse',
      false: '',
    },
  },
  defaultVariants: { loading: false },
})

const WeatherSkeleton = () => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Skeleton
          className="h-14 w-14 md:h-20 md:w-20"
          variant="circle"
          theme="light"
        />
        <Skeleton className="h-12 w-16 md:h-20 md:w-24" theme="light" />
      </div>
      <div className="mt-2 flex flex-wrap-reverse items-center justify-between gap-2">
        <Skeleton className="h-[20px] w-32" theme="light" />
        <Skeleton className="h-[20px] w-24" theme="light" />
      </div>
      <div className="mt-6 border-t border-white/10 pt-6">
        <HourlyWeatherSkeleton variant="inline" />
      </div>
    </>
  )
}

const CurrentWeather = () => {
  const { coord, geoError } = useGeolocation()
  const { weather, currentPlace, isLoading, isError } = useCurrentWeather(coord)

  return (
    <WeatherCard>
      <div className="mb-1 flex items-center gap-2 text-xs text-blue-200">
        <span>📍</span>
        <span>현재 위치</span>
      </div>
      {geoError || isError ? (
        <WeatherError type={geoError ? 'geo' : 'weather'} />
      ) : (
        <>
          <p
            className={styles({
              loading: !coord || isLoading,
            })}
          >
            {!coord
              ? '위치를 가져오는 중...'
              : isLoading
                ? '날씨 정보를 불러오는 중...'
                : currentPlace}
          </p>
          {weather ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <WeatherIcon
                  code={weather.icon}
                  className="h-14 w-14 md:h-20 md:w-20"
                />
                <p className="text-5xl font-extralight tracking-tighter text-white md:text-7xl">
                  {weather.temp}°
                </p>
              </div>
              <div className="mt-2 flex flex-wrap-reverse items-center justify-between gap-2">
                <p className="text-sm text-blue-200">{weather.description}</p>
                <TempRange min={weather.min} max={weather.max} />
              </div>
              <div className="mt-6 border-t border-white/10 pt-6">
                <HourlyWeather data={weather.hourly} variant="inline" />
              </div>
            </>
          ) : (
            <WeatherSkeleton />
          )}
        </>
      )}
    </WeatherCard>
  )
}

export default CurrentWeather
