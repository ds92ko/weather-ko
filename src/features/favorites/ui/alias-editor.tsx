import { cva } from 'class-variance-authority'
import { useId, type KeyboardEvent, type RefObject } from 'react'

const styles = cva(
  'w-full rounded border px-2 py-1 text-xs text-white outline-none',
  {
    variants: {
      theme: {
        light: 'border-blue-400/50 bg-white/10',
        dark: 'border-blue-500/50 bg-gray-700',
      },
    },
    defaultVariants: {
      theme: 'dark',
    },
  }
)

interface AliasEditorProps {
  ref?: RefObject<HTMLInputElement | null>
  defaultValue: string
  onSave: (value: string | null) => void
  onCancel: () => void
  theme?: 'light' | 'dark'
}

const AliasEditor = ({
  ref,
  defaultValue,
  onSave,
  onCancel,
  theme = 'dark',
}: AliasEditorProps) => {
  const id = useId()
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
      id={id}
      name="alias-editor"
      defaultValue={defaultValue}
      placeholder="별칭 입력 (선택사항)"
      className={styles({ theme })}
      autoFocus
      onKeyDown={handleKeyDown}
    />
  )
}

export default AliasEditor
