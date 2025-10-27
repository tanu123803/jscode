import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchCountryByName, fetchWeatherByCity, fetchNewsByCountryCode, fetchCountryByAlpha } from '../services/api'

export default function CountryDetails() {
  const { name } = useParams()
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchCountryByName(name)
      .then(async c => {
        if (!mounted) return
        setCountry(c)
        const capital = c.capital && c.capital[0]
        if (capital) {
          try {
            const w = await fetchWeatherByCity(capital)
            if (mounted) setWeather(w)
          } catch (e) { /* ignore weather error */ }
        }
        const code = c.cca2
        if (code) {
          try {
            const n = await fetchNewsByCountryCode(code)
            if (mounted) setNews(n)
          } catch (e) { /* ignore news error */ }
        }
      })
      .catch(e => { if (mounted) setErr(e) })
      .finally(() => { if (mounted) setLoading(false) })

    return () => { mounted = false }
  }, [name])

  if (loading) return <div>Loading...</div>
  if (err) return <div>Failed to load country details.</div>
  if (!country) return <div>No country found</div>

  const languages = country.languages ? Object.values(country.languages).join(', ') : '—'
  const currencies = country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol||''})`).join(', ') : '—'

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={country.flags?.svg || country.flags?.png} alt="flag" className="w-full md:w-1/3 rounded" />
        <div className="flex-1 space-y-3">
          <h2 className="text-2xl font-bold">{country.name?.official}</h2>
          <div>Region: {country.region} — {country.subregion}</div>
          <div>Capital: {country.capital?.join(', ') || '—'}</div>
          <div>Languages: {languages}</div>
          <div>Currencies: {currencies}</div>
          <div>Borders: {country.borders ? country.borders.map(b => <BorderCountry key={b} code={b} />) : '—'}</div>
          <div>Population: {country.population.toLocaleString()}</div>
          <div>Coordinates: {country.latlng?.join(', ')}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded p-4">
          <h3 className="font-semibold mb-2">Weather — {country.capital?.[0] || '—'}</h3>
          {weather ? (
            <div>
              <div className="capitalize">{weather.weather?.[0]?.description}</div>
              <div>Temp: {weather.main.temp} °C</div>
              <div>Feels: {weather.main.feels_like} °C</div>
            </div>
          ) : (
            <div>No weather data</div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded p-4">
          <h3 className="font-semibold mb-2">Top news</h3>
          {news && news.articles && news.articles.length ? (
            <ul className="space-y-2">
              {news.articles.map(a => (
                <li key={a.url}>
                  <a href={a.url} target="_blank" rel="noreferrer" className="underline">{a.title}</a>
                </li>
              ))}
            </ul>
          ) : (
            <div>No news available</div>
          )}
        </div>
      </div>
    </div>
  )

  function BorderCountry({ code }) {
    const [name, setName] = useState(code)
    useEffect(() => {
      let mounted = true
      fetchCountryByAlpha(code)
        .then(c => { if (mounted && c) setName(c.name?.common || code) })
        .catch(() => {})
      return () => { mounted = false }
    }, [code])
    return <Link to={`/country/${encodeURIComponent(name)}`} className="mr-2 underline">{name}</Link>
  }
}
