import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import CountryDetails from './routes/CountryDetails'
import Header from './components/Header'
import FavoritesPanel from './components/FavoritesPanel'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:name" element={<CountryDetails />} />
          <Route path="/favorites" element={<FavoritesPanel />} />
        </Routes>
      </main>
    </div>
  )
}
