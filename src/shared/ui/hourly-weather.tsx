import useDragScroll from '@/shared/lib/use-drag-scroll'
import type { Hourly } from '@/shared/model/weather'
import WeatherIcon from '@/shared/ui/weather-icon'
import { cva, type VariantProps } from 'class-variance-authority'

const styles = {
  container: cva('scrollbar-hide flex gap-2 overflow-x-auto', {
    variants: {
      variant: {
        card: 'pb-2',
        inline: 'pb-1',
      },
    },
    defaultVariants: {
      variant: 'card',
    },
  }),
  item: cva('flex shrink-0 flex-col items-center rounded-xl', {
    variants: {
      variant: {
        card: 'gap-2 border px-3 py-3 sm:px-4 min-w-[64px]',
        inline: 'gap-1.5 px-3 py-2 min-w-[60px]',
      },
      active: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'card',
        active: true,
        className: 'border-blue-500/30 bg-blue-600/20',
      },
      {
        variant: 'card',
        active: false,
        className: 'border-gray-700/30 bg-gray-800/50',
      },
      { variant: 'inline', active: true, className: 'bg-white/15' },
      { variant: 'inline', active: false, className: 'bg-white/5' },
    ],
  }),
  time: cva('text-xs', {
    variants: {
      variant: {
        card: 'text-gray-400',
        inline: 'text-blue-200',
      },
    },
    defaultVariants: { variant: 'card' },
  }),
  icon: cva('', {
    variants: {
      variant: {
        card: 'h-8 w-8',
        inline: 'h-6 w-6',
      },
    },
    defaultVariants: { variant: 'card' },
  }),
  temp: cva('font-medium', {
    variants: {
      variant: {
        card: 'text-sm',
        inline: 'text-xs',
      },
      active: {
        true: 'text-white',
        false: '',
      },
    },
    compoundVariants: [
      { variant: 'card', active: false, className: 'text-gray-300' },
      { variant: 'inline', active: false, className: 'text-blue-100' },
    ],
    defaultVariants: { variant: 'card', active: false },
  }),
}

interface HourlyWeatherProps extends VariantProps<typeof styles.container> {
  data: Hourly[]
}

const HourlyWeather = ({ data, variant = 'card' }: HourlyWeatherProps) => {
  const { ref, dragScrollProps } = useDragScroll()

  return (
    <div
      ref={ref}
      className={styles.container({ variant })}
      {...dragScrollProps}
    >
      {data.map((item) => {
        const active = item.time === '지금'

        return (
          <div
            key={`hourly-weather-${item.time}`}
            className={styles.item({ variant, active })}
          >
            <span className={styles.time({ variant })}>{item.time}</span>
            <WeatherIcon
              code={item.icon}
              className={styles.icon({ variant })}
            />
            <span className={styles.temp({ variant, active })}>
              {item.temp}°
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default HourlyWeather
