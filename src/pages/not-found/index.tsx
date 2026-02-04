import useTitle from '@/shared/lib/use-title'
import NotFoundContent from '@/shared/ui/not-found-content'

const NotFound = () => {
  useTitle('페이지를 찾을 수 없습니다')

  return <NotFoundContent />
}

export default NotFound
