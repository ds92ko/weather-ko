import type { WeatherResult } from '@/entities/weather/model/open-weather-map'
import Skeleton from '@/shared/ui/skeleton'

interface TempDistributionProps {
  weather: WeatherResult | undefined
  isLoading: boolean
  isError: boolean
}

const TempDistributionSkeleton = () => {
  return (
    <>
      <div className="mb-2 flex justify-between text-xs text-gray-500">
        <Skeleton className="h-4 w-10" theme="light" />
        <Skeleton className="h-4 w-10" theme="light" />
      </div>
      <div className="relative h-3 overflow-hidden rounded-full bg-gray-700">
        <div className="h-full w-full rounded-full bg-gradient-to-r from-blue-400 via-green-400 to-orange-400" />
      </div>
      <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-400">
        현재
        <Skeleton className="h-[20px] w-10" theme="light" />
      </div>
    </>
  )
}

const getTempStyle = (weather: WeatherResult) => {
  const position =
    ((weather.temp - weather.min) / (weather.max - weather.min || 1)) * 100

  return {
    left:
      position === 0
        ? 'calc(0% + 6px)'
        : position === 100
          ? 'calc(100% - 6px)'
          : `${position}%`,
  }
}

const TempDistribution = ({
  weather,
  isLoading,
  isError,
}: TempDistributionProps) => {
  return (
    <section>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
        기온 분포
      </h3>
      <div className="rounded-xl border border-gray-700/30 bg-gray-800 p-5">
        {isError ? (
          <div className="flex min-h-[68px] items-center justify-center">
            <p className="text-sm text-gray-500">날씨 정보 없음</p>
          </div>
        ) : isLoading || !weather ? (
          <TempDistributionSkeleton />
        ) : (
          <>
            <div className="mb-2 flex justify-between text-xs text-gray-500">
              <span>{weather.min}°</span>
              <span>{weather.max}°</span>
            </div>
            <div
              className="relative h-3 overflow-hidden rounded-full bg-gray-700"
              role="img"
              aria-label={`현재 기온 ${weather.temp}도가 최소 ${weather.min}도와 최대 ${weather.max}도 사이에 표시됨`}
            >
              <div
                className="h-full w-full rounded-full bg-gradient-to-r from-blue-400 via-green-400 to-orange-400"
                aria-hidden="true"
              />
              <div
                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-500 bg-white shadow-lg"
                style={getTempStyle(weather)}
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-400">
              현재
              <span className="font-medium text-white">{weather.temp}°</span>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default TempDistribution
