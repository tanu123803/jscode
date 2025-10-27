import React from 'react'
import { useFavorites } from '../context/FavoritesContext'
import CountryCard from './CountryCard'
import { Link } from 'react-router-dom'

export default function FavoritesPanel() {
  const { favorites } = useFavorites()
  if (!favorites.length) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">Favorites</h2>
        <div>No favorites yet — go add some from the Home page. <Link to="/">Home</Link></div>
      </div>
    )
  }
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Favorites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map(c => <CountryCard key={c.cca3} country={c} />)}
      </div>
    </div>
  )
}
