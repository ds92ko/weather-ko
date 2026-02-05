import { FallbackError } from '@/shared/lib/fallback-error'

const NotFound = () => {
  throw new FallbackError('page')
}

export default NotFound
