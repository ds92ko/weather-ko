import { cva } from 'class-variance-authority'

const styles = {
  skeleton: cva('animate-pulse', {
    variants: {
      variant: {
        square: 'rounded',
        circle: 'rounded-full',
      },
      theme: {
        light: 'bg-white/30',
        dark: 'bg-gray-700',
      },
    },
    defaultVariants: {
      variant: 'square',
      theme: 'dark',
    },
  }),
}

interface SkeletonProps {
  variant?: 'square' | 'circle'
  theme?: 'light' | 'dark'
  className?: string
}

const Skeleton = ({
  variant = 'square',
  theme = 'dark',
  className,
}: SkeletonProps) => {
  return <div className={styles.skeleton({ variant, theme, className })} />
}

export default Skeleton
