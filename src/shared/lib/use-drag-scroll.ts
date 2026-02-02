import { useCallback, useRef, type MouseEvent } from 'react'

interface DragState {
  isDragging: boolean
  startX: number
  scrollLeft: number
}

const useDragScroll = () => {
  const ref = useRef<HTMLDivElement>(null)
  const drag = useRef<DragState>({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
  })

  const updateCursor = (el: HTMLDivElement, dragging: boolean) => {
    el.style.cursor = dragging ? 'grabbing' : 'grab'
    if (dragging) el.style.userSelect = 'none'
    else el.style.removeProperty('user-select')
  }

  const onMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return

    drag.current = {
      isDragging: true,
      startX: e.pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
    }
    updateCursor(el, true)
  }, [])

  const onMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!drag.current.isDragging || !el) return

    e.preventDefault()
    const x = e.pageX - el.offsetLeft
    el.scrollLeft = drag.current.scrollLeft - (x - drag.current.startX)
  }, [])

  const onMouseUpOrLeave = useCallback(() => {
    const el = ref.current
    if (!el) return

    drag.current.isDragging = false
    updateCursor(el, false)
  }, [])

  return {
    ref,
    dragScrollProps: {
      onMouseDown,
      onMouseMove,
      onMouseUp: onMouseUpOrLeave,
      onMouseLeave: onMouseUpOrLeave,
      style: { cursor: 'grab' } as const,
    },
  }
}

export default useDragScroll
