import type { KeyboardEvent, RefObject } from 'react'

interface AliasEditorProps {
  ref?: RefObject<HTMLInputElement | null>
  defaultValue: string
  onSave: (value: string | null) => void
  onCancel: () => void
}

const AliasEditor = ({
  ref,
  defaultValue,
  onSave,
  onCancel,
}: AliasEditorProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = ref?.current?.value.trim() || null
      onSave(value)
    }
    if (e.key === 'Escape') onCancel()
  }

  return (
    <input
      ref={ref}
      defaultValue={defaultValue}
      placeholder="별칭 입력 (선택사항)"
      className="w-full rounded border border-blue-500/50 bg-gray-700 px-2 py-1 text-xs text-white outline-none"
      autoFocus
      onKeyDown={handleKeyDown}
    />
  )
}

export default AliasEditor
