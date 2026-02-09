import React from 'react'
import { useState, useEffect } from 'react'
import { Api } from '../../Api'

export function useDebouncedGet({
  query,
  fn,
  debounceMs = 100,
}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  

  useEffect(() => {
    const startTime = Date.now()
    let api = new Api()
    if (!query)  return

    let loadTimeout;

    const debounceTimeout = setTimeout(async () => {
      setLoading(true)

      try {
       
        const result = await api.get(fn(query))

        const elapsedTime = Date.now() - startTime
        const remainingTime = Math.max(0 , 200 - elapsedTime)

        loadTimeout = setTimeout(() => {
          setData(result ?? [])
          setLoading(false)
        }, remainingTime)
      } catch (e) {
        if (api.aborted()) return
        setData([])
      }
    }, debounceMs)

    return () => {
      api.abort()
      clearTimeout(debounceTimeout)
      clearTimeout(loadTimeout)
    }
  }, [query, debounceMs, fn])

  return [ data, loading, setData ]
}
