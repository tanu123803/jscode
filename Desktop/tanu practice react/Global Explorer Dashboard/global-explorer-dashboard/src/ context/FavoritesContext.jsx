import React, { createContext, useContext, useEffect, useState } from 'react'
import { loadFromStorage, saveToStorage } from '../utils/storage'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => loadFromStorage('favorites', []))

  useEffect(() => {
    saveToStorage('favorites', favorites)
  }, [favorites])

  const toggleFavorite = (country) => {
    setFavorites(prev => {
      const found = prev.find(c => c.cca3 === country.cca3)
      if (found) return prev.filter(c => c.cca3 !== country.cca3)
      return [country, ...prev]
    })
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
