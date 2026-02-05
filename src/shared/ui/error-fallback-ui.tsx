import {
  ERROR_FALLBACK_PRESETS,
  type FallbackType,
} from '@/shared/config/error-fallback-presets'
import useTitle from '@/shared/lib/use-title'
import { cva } from 'class-variance-authority'
import { Link } from 'react-router-dom'

const styles = cva(
  'inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 hover:bg-blue-500',
        secondary: 'border border-gray-600 bg-gray-800 hover:bg-gray-700',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)

interface ErrorFallbackUIProps {
  type?: FallbackType
  title?: string
  description?: string
  message?: string
  onRetry?: () => void
}

const ErrorFallbackUI = ({
  type: fallbackType = 'error',
  title,
  description,
  message,
  onRetry,
}: ErrorFallbackUIProps) => {
  const preset = ERROR_FALLBACK_PRESETS[fallbackType]
  const isError = fallbackType === 'error'
  const resolvedTitle = title ?? preset.title
  useTitle(resolvedTitle)

  return (
    <section
      className="flex min-h-[400px] flex-col items-center justify-center text-center"
      aria-labelledby="fallback-title"
      {...(isError && { role: 'alert' as const })}
    >
      <p className="mb-4 text-6xl" aria-hidden="true">
        {preset.icon}
      </p>
      <h2 id="fallback-title" className="mb-2 text-xl font-medium text-white">
        {resolvedTitle}
      </h2>
      <p className="mb-6 text-sm text-gray-400">
        {description ?? preset.description}
      </p>
      {isError && message && import.meta.env.DEV && (
        <pre className="mb-6 max-h-32 max-w-full overflow-auto whitespace-pre-wrap break-words rounded bg-gray-800 p-3 text-left text-xs text-red-300">
          {message}
        </pre>
      )}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {isError && onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className={styles({ variant: 'secondary' })}
            aria-label="다시 시도"
          >
            <span aria-hidden="true">🔄</span>
            <span>다시 시도</span>
          </button>
        )}
        <Link
          to="/"
          className={styles({ variant: 'primary' })}
          aria-label="홈으로 돌아가기"
        >
          <span aria-hidden="true">🏠</span>
          <span>홈으로 돌아가기</span>
        </Link>
      </div>
    </section>
  )
}

export default ErrorFallbackUI
