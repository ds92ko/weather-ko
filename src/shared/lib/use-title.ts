import { useEffect } from 'react'

const useTitle = (title?: string) => {
  useEffect(() => {
    document.title = title ? `${title} | 오늘의 날씨` : '오늘의 날씨'
  }, [title])
}

export default useTitle
