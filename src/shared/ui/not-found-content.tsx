import { Link } from 'react-router-dom'

const NotFoundContent = () => {
  return (
    <section className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <p className="mb-4 text-6xl">🌧️</p>
      <p className="mb-2 text-xl font-medium text-white">
        페이지를 찾을 수 없습니다
      </p>
      <p className="mb-6 text-sm text-gray-500">
        요청하신 페이지가 존재하지 않거나 이동되었어요
      </p>
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
