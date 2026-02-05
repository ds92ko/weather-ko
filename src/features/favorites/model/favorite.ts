export interface Favorite {
  id: string
  name: string
  alias: string | null
}

export const isFavoriteShape = (v: unknown): v is Favorite =>
  typeof v === 'object' &&
  v !== null &&
  typeof (v as Favorite).id === 'string' &&
  typeof (v as Favorite).name === 'string' &&
  ((v as Favorite).alias === null || typeof (v as Favorite).alias === 'string')
