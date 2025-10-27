import axios from 'axios'

const RESTCOUNTRIES_BASE = 'https://restcountries.com/v3.1'
export const fetchAllCountries = async () => {
  const res = await axios.get(`${RESTCOUNTRIES_BASE}/all`)
  return res.data
}
export const fetchCountryByName = async (name) => {
  // use fullText=true to match exact name when possible
  const res = await axios.get(`${RESTCOUNTRIES_BASE}/name/${encodeURIComponent(name)}?fullText=true`)
  return res.data[0]
}
export const fetchCountryByAlpha = async (alpha) => {
  const res = await axios.get(`${RESTCOUNTRIES_BASE}/alpha/${encodeURIComponent(alpha)}`)
  return res.data[0]
}

export const fetchWeatherByCity = async (city) => {
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${key}`
  const res = await axios.get(url)
  return res.data
}

export const fetchNewsByCountryCode = async (countryCode) => {
  const key = import.meta.env.VITE_NEWSAPI_KEY
  if (!countryCode) return { articles: [] }
  const url = `https://newsapi.org/v2/top-headlines?country=${countryCode.toLowerCase()}&pageSize=3&apiKey=${key}`
  const res = await axios.get(url)
  return res.data
}
