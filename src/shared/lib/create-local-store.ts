type Listener = () => void

interface LocalStoreOptions<T> {
  key: string
  validate: (value: unknown[]) => T[]
}

const EMPTY: [] = []

const createLocalStore = <T>({ key, validate }: LocalStoreOptions<T>) => {
  const listeners = new Set<Listener>()
  let cache: T[] = EMPTY
  let initialized = false

  const notify = () => listeners.forEach((listener) => listener())

  const load = () => {
    try {
      const raw = localStorage.getItem(key)
      const parsed = raw ? JSON.parse(raw) : []
      cache = Array.isArray(parsed) ? validate(parsed) : EMPTY
    } catch {
      cache = EMPTY
    }
  }

  const onStorage = (e: StorageEvent) => {
    if (e.key === key) {
      load()
      notify()
    }
  }

  const getState = (): T[] => {
    if (!initialized) {
      initialized = true
      load()
    }
    return cache
  }

  const setState = (items: T[]) => {
    const validated = validate(items)
    const raw = JSON.stringify(validated)
    localStorage.setItem(key, raw)
    cache = validated
    notify()
  }

  const subscribe = (listener: Listener) => {
    listeners.add(listener)

    if (listeners.size === 1) {
      window.addEventListener('storage', onStorage)
    }

    return () => {
      listeners.delete(listener)

      if (listeners.size === 0) {
        window.removeEventListener('storage', onStorage)
      }
    }
  }

  return { getState, setState, subscribe } as const
}

export default createLocalStore
