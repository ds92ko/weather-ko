import type { Favorite } from '@/features/favorites/lib/use-favorites'
import AliasEditor from '@/features/favorites/ui/alias-editor'
import useLocationWeather from '@/features/weather/lib/use-location-weather'
import Skeleton from '@/shared/ui/skeleton'
import WeatherIcon from '@/shared/ui/weather-icon'
import { cva } from 'class-variance-authority'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface FavoriteCardProps {
  favorite: Favorite
  onUpdateAlias: (id: string, alias: string | null) => void
  onRemove: (id: string) => void
}

const styles = {
  card: cva(
    'flex min-h-[170px] flex-col rounded-xl border border-gray-700/30 bg-gray-800/80 transition-all',
    {
      variants: {
        editing: {
          true: '',
          false: 'cursor-pointer hover:border-gray-600/50 hover:shadow-lg',
        },
      },
      defaultVariants: {
        editing: false,
      },
    }
  ),
  button: cva(
    'flex flex-1 items-center justify-center gap-1 py-2 text-xs transition-colors',
    {
      variants: {
        side: {
          left: 'rounded-bl-xl text-gray-500 hover:bg-gray-700/50 hover:text-white',
          right:
            'rounded-br-xl text-gray-500 hover:bg-red-900/20 hover:text-red-400',
        },
      },
      defaultVariants: {
        side: 'left',
      },
    }
  ),
}

const FavoriteCard = ({
  favorite,
  onUpdateAlias,
  onRemove,
}: FavoriteCardProps) => {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const { placeName, weather, isLoading } = useLocationWeather(favorite.name)

  const handleGoWeather = () => {
    if (isEditing) return
    navigate(`/weather/${favorite.name}`)
  }
  const handleCancel = () => setIsEditing(false)
  const handleSave = () => {
    const value = inputRef.current?.value.trim() || null
    onUpdateAlias(favorite.id, value)
    handleCancel()
  }
  const handleRemove = () => onRemove(favorite.id)

  return (
    <div className={styles.card({ editing: isEditing })}>
      <div onClick={handleGoWeather} className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between">
          <div className="min-w-0 grow pr-2">
            {isEditing ? (
              <AliasEditor
                ref={inputRef}
                defaultValue={favorite.alias || ''}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <p className="text-md truncate py-[1px] font-medium text-white">
                {favorite.alias || placeName}
              </p>
            )}
            {favorite.alias && (
              <p className="mt-1 truncate text-xs text-gray-500">{placeName}</p>
            )}
          </div>
          {isLoading ? (
            <Skeleton variant="circle" className="h-8 w-8" />
          ) : weather ? (
            <WeatherIcon
              code={weather.icon}
              className="h-8 w-8 shrink-0 text-white/80"
            />
          ) : null}
        </div>
        <div className="mt-auto">
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-16" />
              <Skeleton className="mt-1 h-4 w-24" />
            </>
          ) : weather ? (
            <>
              <p className="text-2xl font-light text-white">{weather.temp}°</p>
              <div className="mt-1 flex gap-2 text-xs text-gray-500">
                <span>↓ {weather.min}°</span>
                <span>↑ {weather.max}°</span>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500">날씨 정보 없음</p>
          )}
        </div>
      </div>
      <div className="flex border-t border-gray-700/30">
        <button
          onClick={() => {
            if (isEditing) handleSave()
            else setIsEditing(true)
          }}
          className={styles.button({ side: 'left' })}
        >
          <span>{isEditing ? '✅' : '✏️'}</span>
          <span>{isEditing ? '저장' : '수정'}</span>
        </button>
        <div className="w-px bg-gray-700/30" />
        <button
          onClick={() => {
            if (isEditing) handleCancel()
            else handleRemove()
          }}
          className={styles.button({ side: 'right' })}
        >
          <span>{isEditing ? '❌' : '🗑'}</span>
          <span>{isEditing ? '취소' : '삭제'}</span>
        </button>
      </div>
    </div>
  )
}

export default FavoriteCard
