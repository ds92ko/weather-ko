import type { FallbackType } from '@/shared/config/error-fallback-presets'

export class FallbackError extends Error {
  readonly type: FallbackType

  constructor(type: FallbackType) {
    super('')
    this.name = 'FallbackError'
    this.type = type
  }
}
