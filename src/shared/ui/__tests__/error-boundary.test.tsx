import { FallbackError } from '@/shared/lib/fallback-error'
import ErrorBoundary from '@/shared/ui/error-boundary'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterAll, describe, expect, it, vi } from 'vitest'

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) throw new Error('Test error')
  return <div>정상 렌더링</div>
}

const ThrowFallbackError = ({ type }: { type: 'page' | 'location' }) => {
  throw new FallbackError(type)
}

const renderWithRouter = (ui: React.ReactNode) =>
  render(<MemoryRouter>{ui}</MemoryRouter>)

describe('ErrorBoundary', () => {
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

  afterAll(() => consoleSpy.mockRestore())

  it('에러 없으면 children을 렌더링한다', () => {
    renderWithRouter(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )

    expect(screen.getByText('정상 렌더링')).toBeInTheDocument()
  })

  it('에러 발생 시 fallback UI를 렌더링한다', () => {
    renderWithRouter(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('문제가 발생했어요')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /홈으로 돌아가기/i })
    ).toBeInTheDocument()
  })

  it('다시 시도 버튼이 표시된다', () => {
    renderWithRouter(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(
      screen.getByRole('button', { name: /다시 시도/i })
    ).toBeInTheDocument()
  })

  it('커스텀 title과 description을 표시할 수 있다', () => {
    renderWithRouter(
      <ErrorBoundary title="커스텀 에러" description="커스텀 설명">
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('커스텀 에러')).toBeInTheDocument()
    expect(screen.getByText('커스텀 설명')).toBeInTheDocument()
  })

  it('다시 시도 버튼 클릭이 가능하다', async () => {
    const user = userEvent.setup()

    renderWithRouter(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const retryButton = screen.getByRole('button', { name: /다시 시도/i })

    // 버튼이 클릭 가능한지 확인
    await user.click(retryButton)

    // 클릭 후에도 UI가 정상 동작 (에러가 다시 발생해서 여전히 에러 UI)
    expect(screen.getByText('문제가 발생했어요')).toBeInTheDocument()
  })

  it('FallbackError(page) 발생 시 페이지 not found UI를 표시한다', () => {
    renderWithRouter(
      <ErrorBoundary>
        <ThrowFallbackError type="page" />
      </ErrorBoundary>
    )

    expect(screen.getByText('페이지를 찾을 수 없습니다')).toBeInTheDocument()
  })

  it('FallbackError(location) 발생 시 장소 not found UI를 표시한다', () => {
    renderWithRouter(
      <ErrorBoundary>
        <ThrowFallbackError type="location" />
      </ErrorBoundary>
    )

    expect(
      screen.getByText('해당 장소의 정보가 제공되지 않습니다')
    ).toBeInTheDocument()
  })
})
