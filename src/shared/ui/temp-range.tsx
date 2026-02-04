import { cva } from 'class-variance-authority'

interface TempRangeProps {
  min: number
  max: number
  variant?: 'primary' | 'secondary'
}

const styles = cva('flex', {
  variants: {
    variant: {
      primary: 'text-blue-200 gap-3 text-sm',
      secondary: 'text-gray-500 gap-2 text-xs',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

const TempRange = ({ min, max, variant = 'primary' }: TempRangeProps) => {
  return (
    <div className={styles({ variant })}>
      <span>↓ {min}°</span>
      <span>↑ {max}°</span>
    </div>
  )
}

export default TempRange
