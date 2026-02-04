import { useRef, useState } from 'react'

const useAliasEditor = (onUpdate: (alias: string | null) => void) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)

  const startEditing = () => setIsEditing(true)
  const handleCancel = () => setIsEditing(false)
  const handleSave = () => {
    onUpdate(inputRef.current?.value.trim() || null)
    handleCancel()
  }

  return { inputRef, isEditing, handleSave, handleCancel, startEditing }
}

export default useAliasEditor
