import { MAX_FAVORITES, STORAGE_KEY } from '@/features/favorites/config'
import createLocalStore from '@/shared/lib/create-local-store'
import { useCallback, useSyncExternalStore } from 'react'

export interface Favorite {
  id: string
  name: string
  alias: string | null
}

const isFavoriteShape = (v: unknown): v is Favorite =>
  typeof v === 'object' &&
  v !== null &&
  typeof (v as Favorite).id === 'string' &&
  typeof (v as Favorite).name === 'string' &&
  ((v as Favorite).alias === null || typeof (v as Favorite).alias === 'string')

const store = createLocalStore<Favorite>({
  key: STORAGE_KEY,
  validate: (parsed) => parsed.filter(isFavoriteShape),
})

const useFavorites = () => {
  const favorites = useSyncExternalStore(store.subscribe, store.getState)

  const addFavorite = useCallback((name: string) => {
    const trimmed = name.trim()
    if (!trimmed) return false
    const current = store.getState()
    if (current.length >= MAX_FAVORITES) return false
    if (current.some((f) => f.name === trimmed)) return false

    store.setState([
      ...current,
      { id: crypto.randomUUID(), name: trimmed, alias: null },
    ])
    return true
  }, [])

  const removeFavorite = useCallback((id: string) => {
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

  const isFavorite = useCallback(
    (name: string) => favorites.some((f) => f.name === name.trim()),
    [favorites]
  )

  return {
    favorites,
    isFull: favorites.length >= MAX_FAVORITES,
    addFavorite,
    removeFavorite,
    updateAlias,
    isFavorite,
  } as const
}

export default useFavorites
