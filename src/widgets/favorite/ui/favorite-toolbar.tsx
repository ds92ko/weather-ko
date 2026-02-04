import useAliasEditor from '@/features/favorites/lib/use-alias-editor'
import useFavorites from '@/features/favorites/lib/use-favorites'
import AliasEditor from '@/features/favorites/ui/alias-editor'
import { cva } from 'class-variance-authority'
import { BiArrowBack } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const styles = cva(
  'rounded-lg px-4 py-2 text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      isFavorite: {
        true: '',
        false:
          'border border-gray-700/50 bg-gray-800 text-gray-400 enabled:hover:text-white',
      },
      isEditing: {
        true: 'border border-gray-700/50 bg-gray-800 text-gray-400 enabled:hover:text-white',
        false: '',
      },
    },
    compoundVariants: [
      {
        isFavorite: true,
        isEditing: false,
        class: 'border border-yellow-500/30 bg-yellow-500/20 text-yellow-400',
      },
    ],
    defaultVariants: {
      isFavorite: false,
      isEditing: false,
    },
  }
)

interface FavoriteToolbarProps {
  location: string
}

const FavoriteToolbar = ({ location }: FavoriteToolbarProps) => {
  const { isFull, getFavorite, addFavorite, removeFavorite, updateAlias } =
    useFavorites()
  const favorite = getFavorite(location)
  const { inputRef, isEditing, handleSave, handleCancel, startEditing } =
    useAliasEditor((alias) => {
      if (!favorite) return
      updateAlias(favorite.id, alias)
    })
  const handleToggleFavorite = () => {
    if (favorite) {
      if (isEditing) handleCancel()
      else removeFavorite(favorite.id)
    } else addFavorite(location)
  }

  return (
    <section className="flex flex-wrap items-center justify-between gap-4">
      <Link
        to="/"
        className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
      >
        <BiArrowBack className="h-4 w-4" />
        <span>뒤로</span>
      </Link>
      {isEditing ? (
        <div className="flex-grow">
          <AliasEditor
            ref={inputRef}
            defaultValue={favorite?.alias || ''}
            onSave={handleSave}
            onCancel={handleCancel}
            size="lg"
          />
        </div>
      ) : (
        favorite?.alias && (
          <p className="text-md flex-grow truncate font-medium text-white/90">
            📍 {favorite.alias}
          </p>
        )
      )}
      <div className="flex flex-wrap items-center gap-2">
        {favorite && (
          <button
            onClick={() => {
              if (isEditing) handleSave()
              else startEditing()
            }}
            className="rounded-lg border border-gray-700/50 bg-gray-800 px-3 py-2 text-sm text-gray-400 transition-colors hover:text-white"
          >
            {isEditing
              ? '✅ 저장'
              : `✏️ 별칭 ${favorite?.alias ? '수정' : '추가'}`}
          </button>
        )}
        <button
          onClick={handleToggleFavorite}
          disabled={!favorite && isFull}
          className={styles({ isFavorite: !!favorite, isEditing })}
        >
          {favorite
            ? isEditing
              ? '❌ 취소'
              : '⭐ 즐겨찾기 해제'
            : '☆ 즐겨찾기 추가'}
        </button>
      </div>
    </section>
  )
}

export default FavoriteToolbar
