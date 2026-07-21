export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: string
}

export const STORAGE_KEY = 'js-todo-app.todos'

export function loadTodos(): Todo[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Todo[]
  } catch {
    return []
  }
}

export function saveTodos(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}
