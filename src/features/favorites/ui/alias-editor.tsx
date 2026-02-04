import { cva } from 'class-variance-authority'
import { useId, type KeyboardEvent, type RefObject } from 'react'

const styles = cva(
  'w-full rounded border text-white outline-none border-blue-500/50 bg-gray-700',
  {
    variants: {
      size: {
        sm: 'px-2 py-1 text-xs',
        lg: 'px-3 py-2 text-sm',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  }
)

interface AliasEditorProps {
  ref?: RefObject<HTMLInputElement | null>
  defaultValue: string
  onSave: (value: string | null) => void
  onCancel: () => void
  size?: 'sm' | 'lg'
}

const AliasEditor = ({
  ref,
  defaultValue,
  onSave,
  onCancel,
  size = 'sm',
}: AliasEditorProps) => {
  const id = useId()
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSave(e.currentTarget.value.trim() || null)
    if (e.key === 'Escape') onCancel()
  }

  return (
    <input
      ref={ref}
      id={id}
      name="alias-editor"
      defaultValue={defaultValue}
      placeholder="별칭 입력 (선택사항)"
      className={styles({ size })}
      autoFocus
      onKeyDown={handleKeyDown}
    />
  )
}

export default AliasEditor
