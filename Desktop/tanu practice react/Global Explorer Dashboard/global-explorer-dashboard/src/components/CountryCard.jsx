import React from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

export default function CountryCard({ country, miniWeather }) {
  const { favorites, toggleFavorite } = useFavorites()
  const isFav = favorites.some(c => c.cca3 === country.cca3)
  const capital = country.capital && country.capital[0]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex gap-4 items-center">
      <img src={country.flags?.svg || country.flags?.png} alt={`${country.name.common} flag`} className="w-20 h-14 object-cover rounded" />
      <div className="flex-1">
        <Link to={`/country/${encodeURIComponent(country.name.common)}`} className="font-semibold text-md">{country.name.common}</Link>
        <div className="text-sm mt-1 text-gray-600 dark:text-gray-300">Capital: {capital || '—'}</div>
        <div className="text-sm text-gray-600 dark:text-gray-300">Region: {country.region}</div>
        <div className="text-sm text-gray-600 dark:text-gray-300">Population: {country.population.toLocaleString()}</div>
      </div>
      <div className="flex flex-col items-end gap-2">
        {miniWeather && (
          <div className="text-xs text-gray-600 dark:text-gray-300">{miniWeather}</div>
        )}
        <button onClick={() => toggleFavorite(country)} className="px-2 py-1 border rounded">
          {isFav ? 'Unfav' : 'Fav'}
        </button>
      </div>
    </div>
  )
}
