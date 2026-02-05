import { Link } from 'react-router-dom'

const ERROR_MESSAGES = {
  page: {
    title: '페이지를 찾을 수 없습니다',
    description: '요청하신 페이지가 존재하지 않거나 이동되었어요',
  },
  location: {
    title: '해당 장소의 정보가 제공되지 않습니다',
    description: '홈으로 돌아가 지원되는 장소를 검색해보세요',
  },
} as const

interface NotFoundContentProps {
  type?: keyof typeof ERROR_MESSAGES
}

const NotFoundContent = ({ type = 'page' }: NotFoundContentProps) => {
  const { title, description } = ERROR_MESSAGES[type]

  return (
    <section className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <p className="mb-4 text-6xl">🌧️</p>
      <p className="mb-2 text-xl font-medium text-white">{title}</p>
      <p className="mb-6 text-sm text-gray-500">{description}</p>
      <Link
        to="/"
        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
      >
        🏠 홈으로 돌아가기
      </Link>
    </section>
  )
}

export default NotFoundContent
