import useDebounce from '@/shared/lib/use-debounce'
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('초기값을 즉시 반환한다', () => {
    const { result } = renderHook(() => useDebounce('initial', 300))

    expect(result.current).toBe('initial')
  })

  it('delay 이전에는 이전 값을 유지한다', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'first' } }
    )

    rerender({ value: 'second' })

    expect(result.current).toBe('first')
  })

  it('delay 이후에 새 값으로 업데이트된다', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'first' } }
    )

    rerender({ value: 'second' })

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(result.current).toBe('second')
  })

  it('delay 내에 값이 연속 변경되면 마지막 값만 반영된다', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'first' } }
    )

    rerender({ value: 'second' })
    act(() => {
      vi.advanceTimersByTime(100)
    })

    rerender({ value: 'third' })
    act(() => {
      vi.advanceTimersByTime(100)
    })

    rerender({ value: 'fourth' })
    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(result.current).toBe('fourth')
  })
})
