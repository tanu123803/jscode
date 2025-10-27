import { useEffect, useState } from 'react'

export default function useFetch(asyncFn, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)
    asyncFn()
      .then(res => { if (mounted) setData(res) })
      .catch(err => { if (mounted) setError(err) })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, deps) 

  return { data, loading, error }
}
