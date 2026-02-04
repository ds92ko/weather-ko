import useFavorites from '@/features/favorites/lib/use-favorites'
import FavoriteCard from '@/features/favorites/ui/favorite-card'

interface FavoriteListProps {
  onSearchFocus: () => void
}

const FavoriteList = ({ onSearchFocus }: FavoriteListProps) => {
  const { favorites, isFull, updateAlias, removeFavorite } = useFavorites()

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
          즐겨찾기
        </h2>
        <span className="text-xs text-gray-600">{favorites.length}/6</span>
      </div>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((fav) => (
            <FavoriteCard
              key={fav.id}
              favorite={fav}
              onUpdateAlias={updateAlias}
              onRemove={removeFavorite}
            />
          ))}
          {!isFull && (
            <button
              onClick={onSearchFocus}
              className="flex min-h-[170px] cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-700/50 text-gray-600 transition-colors hover:border-gray-600 hover:text-gray-500"
            >
              <span className="text-2xl">+</span>
            </button>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-700/30 bg-gray-800/50 px-6 py-12 text-center">
          <p className="mb-3 text-3xl">⭐</p>
          <p className="mb-1 text-sm text-gray-400">즐겨찾기가 없습니다</p>
          <p className="mb-4 text-xs text-gray-600">
            장소를 검색해서 즐겨찾기에 추가해보세요
          </p>
          <button
            onClick={onSearchFocus}
            className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-500"
          >
            🔍 장소 검색하기
          </button>
        </div>
      )}
    </section>
  )
}

export default FavoriteList
