import { MAX_FAVORITES, STORAGE_KEY } from '@/features/favorites/config'
import { isFavoriteShape, type Favorite } from '@/features/favorites/model/favorite'
import createLocalStore from '@/shared/lib/create-local-store'
import { useCallback, useSyncExternalStore } from 'react'

const store = createLocalStore<Favorite>({
  key: STORAGE_KEY,
  validate: (parsed) => parsed.filter(isFavoriteShape),
})

const useFavorites = () => {
  const favorites = useSyncExternalStore(store.subscribe, store.getState)

  const addFavorite = useCallback((name?: string) => {
    const trimmed = name?.trim()
    if (!trimmed) return
    const current = store.getState()
    if (current.length >= MAX_FAVORITES) return
    if (current.some((f) => f.name === trimmed)) return

    store.setState([
      ...current,
      { id: crypto.randomUUID(), name: trimmed, alias: null },
    ])
  }, [])

  const removeFavorite = useCallback((id?: string) => {
    if (!id) return
    const current = store.getState()
    store.setState(current.filter((f) => f.id !== id))
  }, [])

  const updateAlias = useCallback((id: string, alias: string | null) => {
    const current = store.getState()
    store.setState(
      current.map((f) =>
        f.id === id ? { ...f, alias: alias?.trim() || null } : f
      )
    )
  }, [])

  const getFavorite = useCallback(
    (name?: string) =>
      name ? favorites.find((f) => f.name === name.trim()) : undefined,
    [favorites]
  )

  return {
    favorites,
    isFull: favorites.length >= MAX_FAVORITES,
    addFavorite,
    removeFavorite,
    updateAlias,
    getFavorite,
  } as const
}

export default useFavorites
