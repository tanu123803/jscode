import React, { useMemo, useState } from 'react'
import CountryCard from './CountryCard'

export default function CountryList({ countries }) {
  const [page, setPage] = useState(1)
  const perPage = 12
  const total = countries.length
  const pages = Math.max(1, Math.ceil(total / perPage))
  const current = useMemo(() => countries.slice((page - 1) * perPage, page * perPage), [countries, page])

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {current.map(c => <CountryCard key={c.cca3} country={c} />)}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 border rounded">Prev</button>
        <div className="px-3 py-1">{page} / {pages}</div>
        <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages} className="px-3 py-1 border rounded">Next</button>
      </div>
    </div>
  )
}
