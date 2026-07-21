import { useEffect, useState } from 'react'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { loadTodos, saveTodos, type Todo } from '../interfaces/todo'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos())

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  function addTodo(text: string) {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTodos((prev) => [newTodo, ...prev])
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    )
  }

  function updateTodo(id: string, text: string) {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, text } : todo)))
  }

  function deleteTodo(id: string) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const remaining = todos.filter((t) => !t.completed).length

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto w-full max-w-lg">
        <h1 className="mb-1 text-3xl font-bold text-slate-900">TODO App</h1>
        <p className="mb-6 text-slate-500">React + Tailwind CSS + LocalStorage</p>

        <div className="mb-6 rounded-xl bg-white p-4 shadow">
          <TodoForm onAdd={addTodo} />
        </div>

        <TodoList todos={todos} onToggle={toggleTodo} onUpdate={updateTodo} onDelete={deleteTodo} />

        {todos.length > 0 && (
          <p className="mt-4 text-center text-sm text-slate-400">
            {remaining} görev kaldı / {todos.length} toplam
          </p>
        )}
      </div>
    </div>
  )
}
