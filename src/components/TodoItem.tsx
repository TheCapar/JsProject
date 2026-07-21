import { useState } from 'react'
import type { Todo } from '../interfaces/todo'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onUpdate: (id: string, text: string) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)

  function handleSave() {
    const trimmed = draft.trim()
    if (trimmed) onUpdate(todo.id, trimmed)
    setIsEditing(false)
  }

  return (
    <li className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-5 w-5 shrink-0 accent-indigo-600"
      />

      {isEditing ? (
        <input
          type="text"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          className="flex-1 rounded border border-slate-300 px-2 py-1"
        />
      ) : (
        <span
          className={`flex-1 ${todo.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}
        >
          {todo.text}
        </span>
      )}

      {isEditing ? (
        <button
          onClick={handleSave}
          className="rounded bg-emerald-600 px-3 py-1 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Kaydet
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="rounded bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-200"
        >
          Düzenle
        </button>
      )}

      <button
        onClick={() => onDelete(todo.id)}
        className="rounded bg-red-50 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-100"
      >
        Sil
      </button>
    </li>
  )
}
