import DISTRICTS from '@/shared/data/korea_districts.json' with { type: 'json' }
import { displayLocation } from '@/shared/lib/format'
import { useId, useState, type ChangeEvent, type Ref } from 'react'
import { Link } from 'react-router-dom'

interface LocationSearchProps {
  ref?: Ref<HTMLInputElement>
}

const NO_RESULTS_MESSAGES = {
  empty: {
    title: '시, 구, 동 단위로 검색해보세요',
    description: '예: 서울특별시, 종로구, 청운동',
  },
  notFound: {
    title: '검색 결과가 없습니다',
    description: '다른 검색어를 입력해보세요',
  },
} as const

interface NoResultsProps {
  type: keyof typeof NO_RESULTS_MESSAGES
}

const NoResultsMessage = ({ type }: NoResultsProps) => {
  const { title, description } = NO_RESULTS_MESSAGES[type]

  return (
    <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-xl border border-gray-700/50 bg-gray-800 px-4 py-5 text-center shadow-xl">
      <p className="text-xs text-gray-500">{title}</p>
      <p className="mt-1 text-xs text-gray-600">{description}</p>
    </div>
  )
}

const LocationSearch = ({ ref }: LocationSearchProps) => {
  const id = useId()
  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const filtered = value
    ? DISTRICTS.filter((s) => displayLocation(s).includes(value.trim()))
    : []

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)
  const handleClear = () => setValue('')

  return (
    <div className="relative">
      <div className="flex items-center rounded-xl border border-gray-700/50 bg-gray-800 px-4 py-3 transition-colors focus-within:border-blue-500/50">
        <span className="mr-3 text-lg text-gray-500">🔍</span>
        <input
          ref={ref}
          id={id}
          name="location-search"
          type="search"
          placeholder="장소 검색 (시, 구, 동)"
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none"
        />
        {value && (
          <button
            onClick={handleClear}
            className="ml-2 text-gray-500 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>
      {isFocused && !value && <NoResultsMessage type="empty" />}
      {value && !filtered.length ? (
        <NoResultsMessage type="notFound" />
      ) : (
        <ul className="absolute left-0 right-0 top-full z-20 mt-2 max-h-80 overflow-y-auto rounded-xl border border-gray-700/50 bg-gray-800 shadow-xl">
          {filtered.map((place) => (
            <li key={`location-search-${place}`}>
              <Link
                to={`/weather/${place}`}
                className="flex w-full items-center gap-2 border-b border-gray-700/30 px-4 py-3 text-left text-sm text-gray-300 transition-colors last:border-0 hover:bg-gray-700/50 hover:text-white"
              >
                <span className="text-gray-600">📍</span>
                {displayLocation(place)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LocationSearch
