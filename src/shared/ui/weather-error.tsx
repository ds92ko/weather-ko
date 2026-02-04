import { cva } from 'class-variance-authority'

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
  size?: 'sm' | 'lg'
}

const styles = cva(
  'flex flex-col items-center justify-center py-8 text-center',
  {
    variants: {
      size: {
        sm: 'min-h-[160px] md:min-h-[184px]',
        lg: 'min-h-[256px] md:min-h-[280px]',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  }
)

const WeatherError = ({ type, size = 'lg' }: WeatherErrorProps) => {
  const { title, description } = ERROR_MESSAGES[type]

  return (
    <div className={styles({ size })}>
      <p className="text-sm text-blue-200">{title}</p>
      <p className="mt-1 text-xs text-blue-300/60">{description}</p>
    </div>
  )
}

export default WeatherError
