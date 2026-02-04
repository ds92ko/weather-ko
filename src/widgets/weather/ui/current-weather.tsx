import useCurrentWeather from '@/features/weather/lib/use-current-weather'
import useGeolocation from '@/shared/lib/use-geolocation'
import HourlyWeather, {
  HourlyWeatherSkeleton,
} from '@/shared/ui/hourly-weather'
import Skeleton from '@/shared/ui/skeleton'
import TempRange from '@/shared/ui/temp-range'
import WeatherCard from '@/shared/ui/weather-card'
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

const ERROR_MESSAGES = {
  geo: {
    title: '위치 정보를 가져올 수 없습니다',
    description: '브라우저 설정에서 위치 권한을 허용한 뒤 새로고침해 주세요',
  },
  weather: {
    title: '날씨 정보를 불러올 수 없습니다',
    description: '잠시 후 다시 시도해 주세요',
  },
} as const

interface WeatherErrorProps {
  type: keyof typeof ERROR_MESSAGES
}

const WeatherError = ({ type }: WeatherErrorProps) => {
  const { title, description } = ERROR_MESSAGES[type]

  return (
    <div className="flex min-h-[256px] flex-col items-center justify-center py-8 text-center md:min-h-[280px]">
      <p className="text-sm text-blue-200">{title}</p>
      <p className="mt-1 text-xs text-blue-300/60">{description}</p>
    </div>
  )
}

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
