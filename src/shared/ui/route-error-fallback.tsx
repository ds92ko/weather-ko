import ErrorFallbackUI from '@/shared/ui/error-fallback-ui'
import { useRouteError } from 'react-router-dom'

const RouteErrorFallback = () => {
  const error = useRouteError()
  const message = error instanceof Error ? error.message : String(error)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 p-4 text-white md:p-8">
      <div className="w-full max-w-5xl">
        <ErrorFallbackUI
          message={message}
          onRetry={() => window.location.reload()}
        />
      </div>
    </div>
  )
}

export default RouteErrorFallback
