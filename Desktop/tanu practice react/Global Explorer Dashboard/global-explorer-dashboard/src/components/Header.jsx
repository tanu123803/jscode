import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === 'true')
  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    localStorage.setItem('dark', dark)
  }, [dark])
  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">Global Explorer</Link>
        <div className="flex items-center gap-4">
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
          <button
            onClick={() => setDark(d => !d)}
            className="ml-2 px-3 py-1 border rounded"
          >
            {dark ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
    </header>
  )
}
