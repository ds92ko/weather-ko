/**
 * ErrorFallbackUI / FallbackError 에서 쓰는 폴백 프리셋
 * 키 추가 / 삭제 시 FallbackType이 자동으로 갱신됨
 */
export const ERROR_FALLBACK_PRESETS = {
  error: {
    title: '문제가 발생했어요',
    description: '잠시 후 다시 시도해 주세요',
    icon: '⚠️',
  },
  page: {
    title: '페이지를 찾을 수 없습니다',
    description: '요청하신 페이지가 존재하지 않거나 이동되었어요',
    icon: '🔍',
  },
  location: {
    title: '해당 장소의 정보가 제공되지 않습니다',
    description: '홈으로 돌아가 지원되는 장소를 검색해보세요',
    icon: '📍',
  },
} as const

export type FallbackType = keyof typeof ERROR_FALLBACK_PRESETS
