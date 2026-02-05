import { displayLocation, formatHourlyTime } from '@/shared/lib/format'
import { describe, expect, it } from 'vitest'

describe('displayLocation', () => {
  it('하이픈을 공백으로 변환한다', () => {
    expect(displayLocation('서울특별시-종로구-청운동')).toBe(
      '서울특별시 종로구 청운동'
    )
  })

  it('하이픈이 없는 문자열은 그대로 반환한다', () => {
    expect(displayLocation('서울특별시')).toBe('서울특별시')
  })

  it('빈 문자열은 빈 문자열을 반환한다', () => {
    expect(displayLocation('')).toBe('')
  })
})

describe('formatHourlyTime', () => {
  it('index가 0이면 "지금"을 반환한다', () => {
    expect(formatHourlyTime(1700000000, 0)).toBe('지금')
  })

  it('index가 0이 아니면 시간을 반환한다', () => {
    // UTC 기준 15:00 → 한국 시간 00:00 (다음날)
    // 테스트 환경에 따라 다를 수 있으므로 시간 형식만 확인
    const result = formatHourlyTime(1700000000, 1)
    expect(result).toMatch(/^\d{1,2}시$/)
  })
})
