import useFavorites from '@/features/favorites/lib/use-favorites'
import FavoriteCard from '@/widgets/favorite/ui/favorite-card'

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
        <span
          className="text-xs text-gray-400"
          aria-label={`즐겨찾기 ${favorites.length}개, 최대 6개`}
        >
          {favorites.length}/6
        </span>
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
              type="button"
              onClick={onSearchFocus}
              aria-label="즐겨찾기 추가"
              className="flex min-h-[170px] cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-700/50 text-gray-400 transition-colors hover:border-gray-500 hover:text-gray-300"
            >
              <span className="text-2xl" aria-hidden="true">
                +
              </span>
            </button>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-700/30 bg-gray-800/50 px-6 py-12 text-center">
          <p className="mb-3 text-3xl" aria-hidden="true">
            ⭐
          </p>
          <p className="mb-1 text-sm text-gray-400">즐겨찾기가 없습니다</p>
          <p className="mb-4 text-xs text-gray-400">
            장소를 검색해서 즐겨찾기에 추가해보세요
          </p>
          <button
            type="button"
            onClick={onSearchFocus}
            aria-label="장소 검색하기"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-500"
          >
            <span aria-hidden="true">🔍</span>
            <span>장소 검색하기</span>
          </button>
        </div>
      )}
    </section>
  )
}

export default FavoriteList
