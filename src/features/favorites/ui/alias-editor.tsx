import { useRef } from 'react'

interface AliasEditorProps {
  defaultValue: string
  onSave: (value: string | null) => void
  onCancel: () => void
}

const AliasEditor = ({ defaultValue, onSave, onCancel }: AliasEditorProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSave = () => {
    onSave(inputRef.current?.value.trim() || null)
  }

  return (
    <input
      ref={inputRef}
      defaultValue={defaultValue}
      placeholder="별칭 입력 (선택사항)"
      className="w-full rounded border border-blue-500/50 bg-gray-700 px-2 py-1 text-xs text-white outline-none"
      autoFocus
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleSave()
        if (e.key === 'Escape') onCancel()
      }}
    />
  )
}

export default AliasEditor
