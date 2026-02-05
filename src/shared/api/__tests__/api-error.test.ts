import { ApiError } from '@/shared/api/api-error'
import { describe, expect, it } from 'vitest'

describe('ApiError', () => {
  it('status와 메시지를 포함한다', () => {
    const error = new ApiError(404)

    expect(error.status).toBe(404)
    expect(error.message).toBe('API Error: 404')
    expect(error.name).toBe('ApiError')
  })

  it('Error를 상속한다', () => {
    const error = new ApiError(500)

    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(ApiError)
  })
})
