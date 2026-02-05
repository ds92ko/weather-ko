import { isFavoriteShape } from '@/features/favorites/model/favorite'
import { describe, expect, it } from 'vitest'

describe('isFavoriteShape', () => {
  it('유효한 Favorite 객체를 통과시킨다', () => {
    expect(isFavoriteShape({ id: '1', name: '서울', alias: null })).toBe(true)

    expect(isFavoriteShape({ id: '2', name: '부산', alias: '우리집' })).toBe(
      true
    )
  })

  it('id가 string이 아니면 거부한다', () => {
    expect(isFavoriteShape({ id: 123, name: '서울', alias: null })).toBe(false)

    expect(isFavoriteShape({ id: null, name: '서울', alias: null })).toBe(false)
  })

  it('name이 string이 아니면 거부한다', () => {
    expect(isFavoriteShape({ id: '1', name: 123, alias: null })).toBe(false)

    expect(isFavoriteShape({ id: '1', name: undefined, alias: null })).toBe(
      false
    )
  })

  it('alias가 null도 string도 아니면 거부한다', () => {
    expect(isFavoriteShape({ id: '1', name: '서울', alias: 123 })).toBe(false)

    expect(isFavoriteShape({ id: '1', name: '서울', alias: undefined })).toBe(
      false
    )
  })

  it('객체가 아니면 거부한다', () => {
    expect(isFavoriteShape(null)).toBe(false)
    expect(isFavoriteShape(undefined)).toBe(false)
    expect(isFavoriteShape('string')).toBe(false)
    expect(isFavoriteShape(123)).toBe(false)
    expect(isFavoriteShape([])).toBe(false)
  })
})
