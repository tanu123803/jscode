import React, { useEffect, useMemo, useState } from 'react'
import { fetchAllCountries } from '../services/api'
import CountryList from '../components/CountryList'
import Filters from '../components/Filters'

export default function Home() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('')
  const [sortBy, setSortBy] = useState('')

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchAllCountries()
      .then(data => { if (mounted) setCountries(data) })
      .catch(err => { if (mounted) setError(err) })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])

  const filtered = useMemo(() => {
    let res = countries.slice()
    if (region) res = res.filter(c => c.region === region)
    if (search) {
      const s = search.toLowerCase()
      res = res.filter(c => (c.name?.common || '').toLowerCase().includes(s) || (c.capital && c.capital.join(' ').toLowerCase().includes(s)))
    }
    if (sortBy === 'population') res.sort((a, b) => (b.population || 0) - (a.population || 0))
    if (sortBy === 'area') res.sort((a, b) => (b.area || 0) - (a.area || 0))
    return res
  }, [countries, region, search, sortBy])

  if (loading) return <div>Loading countries...</div>
  if (error) return <div>Failed to load countries. Try again later.</div>

  return (
    <div>
      <Filters search={search} setSearch={setSearch} region={region} setRegion={setRegion} sortBy={sortBy} setSortBy={setSortBy} />
      <CountryList countries={filtered} />
    </div>
  )
}
