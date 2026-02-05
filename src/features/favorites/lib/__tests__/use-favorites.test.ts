import useFavorites from '@/features/favorites/lib/use-favorites'
import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

const cleanupFavorites = () => {
  const { result } = renderHook(() => useFavorites())
  const ids = result.current.favorites.map((f) => f.id)
  ids.forEach((id) => {
    act(() => {
      result.current.removeFavorite(id)
    })
  })
}

describe('useFavorites', () => {
  beforeEach(() => {
    localStorage.clear()
    cleanupFavorites()
  })

  it('초기 상태는 빈 즐겨찾기 목록이다', () => {
    const { result } = renderHook(() => useFavorites())

    expect(result.current.favorites).toEqual([])
    expect(result.current.isFull).toBe(false)
  })

  it('장소를 즐겨찾기에 추가할 수 있다', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addFavorite('서울특별시-종로구')
    })

    expect(result.current.favorites).toHaveLength(1)
    expect(result.current.favorites[0].name).toBe('서울특별시-종로구')
    expect(result.current.favorites[0].alias).toBeNull()
  })

  it('중복 장소는 추가되지 않는다', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addFavorite('서울특별시-종로구')
    })
    act(() => {
      result.current.addFavorite('서울특별시-종로구')
    })

    expect(result.current.favorites).toHaveLength(1)
  })

  it('빈 문자열이나 공백은 추가되지 않는다', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addFavorite('')
    })
    act(() => {
      result.current.addFavorite('   ')
    })
    act(() => {
      result.current.addFavorite(undefined)
    })

    expect(result.current.favorites).toHaveLength(0)
  })

  it('최대 6개까지만 추가할 수 있다', () => {
    const { result } = renderHook(() => useFavorites())

    for (let i = 0; i < 7; i++) {
      act(() => {
        result.current.addFavorite(`장소-${i}`)
      })
    }

    expect(result.current.favorites).toHaveLength(6)
    expect(result.current.isFull).toBe(true)
  })

  it('즐겨찾기를 삭제할 수 있다', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addFavorite('서울특별시-종로구')
    })

    const id = result.current.favorites[0].id

    act(() => {
      result.current.removeFavorite(id)
    })

    expect(result.current.favorites).toHaveLength(0)
  })

  it('별칭을 수정할 수 있다', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addFavorite('서울특별시-종로구')
    })

    const id = result.current.favorites[0].id

    act(() => {
      result.current.updateAlias(id, '우리집')
    })

    expect(result.current.favorites[0].alias).toBe('우리집')
  })

  it('빈 별칭은 null로 저장된다', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addFavorite('서울특별시-종로구')
    })

    const id = result.current.favorites[0].id

    act(() => {
      result.current.updateAlias(id, '우리집')
    })
    act(() => {
      result.current.updateAlias(id, '')
    })

    expect(result.current.favorites[0].alias).toBeNull()
  })

  it('공백만 있는 별칭은 null로 저장된다', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addFavorite('서울특별시-종로구')
    })

    const id = result.current.favorites[0].id

    act(() => {
      result.current.updateAlias(id, '우리집')
    })
    act(() => {
      result.current.updateAlias(id, '   ')
    })

    expect(result.current.favorites[0].alias).toBeNull()
  })

  it('getFavorite으로 특정 장소를 조회할 수 있다', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addFavorite('서울특별시-종로구')
    })

    expect(result.current.getFavorite('서울특별시-종로구')).toBeDefined()
    expect(result.current.getFavorite('없는장소')).toBeUndefined()
  })
})
