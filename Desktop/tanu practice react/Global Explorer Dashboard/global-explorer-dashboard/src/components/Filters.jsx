import React from 'react'

export default function Filters({ search, setSearch, region, setRegion, sortBy, setSortBy }) {
  return (
    <div className="mb-4 flex gap-2 flex-col md:flex-row items-center justify-between">
      <div className="flex gap-2">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by country or capital" className="px-3 py-2 border rounded w-64" />
        <select value={region} onChange={e => setRegion(e.target.value)} className="px-3 py-2 border rounded">
          <option value="">All regions</option>
          <option>Africa</option>
          <option>Americas</option>
          <option>Asia</option>
          <option>Europe</option>
          <option>Oceania</option>
          <option>Antarctic</option>
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-2 border rounded">
          <option value="">Sort</option>
          <option value="population">Population (desc)</option>
          <option value="area">Area (desc)</option>
        </select>
      </div>
    </div>
  )
}
