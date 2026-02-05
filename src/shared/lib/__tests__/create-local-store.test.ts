import createLocalStore from '@/shared/lib/create-local-store'
import { beforeEach, describe, expect, it } from 'vitest'

interface TestItem {
  id: string
  name: string
}

const isTestItem = (v: unknown): v is TestItem =>
  typeof v === 'object' &&
  v !== null &&
  typeof (v as TestItem).id === 'string' &&
  typeof (v as TestItem).name === 'string'

const createTestStore = (key: string) =>
  createLocalStore<TestItem>({
    key,
    validate: (parsed) => parsed.filter(isTestItem),
  })

describe('createLocalStore', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('초기 상태는 빈 배열이다', () => {
    const store = createTestStore('test-1')
    expect(store.getState()).toEqual([])
  })

  it('setState로 아이템을 저장하고 getState로 조회할 수 있다', () => {
    const store = createTestStore('test-2')
    const items = [{ id: '1', name: 'test' }]

    store.setState(items)

    expect(store.getState()).toEqual(items)
  })

  it('localStorage에 JSON 형태로 저장된다', () => {
    const store = createTestStore('test-3')
    const items = [{ id: '1', name: 'test' }]

    store.setState(items)

    const raw = localStorage.getItem('test-3')
    expect(raw).toBe(JSON.stringify(items))
  })

  it('localStorage에 기존 데이터가 있으면 초기 로드 시 복원한다', () => {
    const items = [{ id: '1', name: 'existing' }]
    localStorage.setItem('test-4', JSON.stringify(items))

    const store = createTestStore('test-4')

    expect(store.getState()).toEqual(items)
  })

  it('유효하지 않은 데이터는 validate에서 필터링된다', () => {
    localStorage.setItem(
      'test-5',
      JSON.stringify([
        { id: '1', name: 'valid' },
        { id: 123, name: 'invalid-id' },
        'not-an-object',
      ])
    )

    const store = createTestStore('test-5')

    expect(store.getState()).toEqual([{ id: '1', name: 'valid' }])
  })

  it('깨진 JSON이 있으면 빈 배열을 반환한다', () => {
    localStorage.setItem('test-6', 'not-json{{{')

    const store = createTestStore('test-6')

    expect(store.getState()).toEqual([])
  })

  it('subscribe로 상태 변경을 구독할 수 있다', () => {
    const store = createTestStore('test-7')
    let notified = false

    store.subscribe(() => {
      notified = true
    })

    store.setState([{ id: '1', name: 'new' }])

    expect(notified).toBe(true)
  })

  it('unsubscribe 후에는 알림을 받지 않는다', () => {
    const store = createTestStore('test-8')
    let count = 0

    const unsubscribe = store.subscribe(() => {
      count++
    })

    store.setState([{ id: '1', name: 'first' }])
    expect(count).toBe(1)

    unsubscribe()
    store.setState([{ id: '2', name: 'second' }])
    expect(count).toBe(1)
  })
})
