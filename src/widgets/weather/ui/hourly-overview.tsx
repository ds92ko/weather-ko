import type { Hourly } from '@/shared/model/weather'
import HourlyWeather, {
  HourlyWeatherSkeleton,
} from '@/shared/ui/hourly-weather'

interface HourlyOverviewProps {
  hourly?: Hourly[]
  isLoading: boolean
  isError: boolean
}

const HourlyOverview = ({
  hourly,
  isLoading,
  isError,
}: HourlyOverviewProps) => (
  <section>
    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
      시간대별 기온
    </h3>
    {isError ? (
      <div className="flex min-h-[117px] items-center justify-center">
        <p className="text-sm text-gray-500">날씨 정보 없음</p>
      </div>
    ) : isLoading || !hourly ? (
      <HourlyWeatherSkeleton variant="card" />
    ) : (
      <HourlyWeather data={hourly} variant="card" />
    )}
  </section>
)

export default HourlyOverview
