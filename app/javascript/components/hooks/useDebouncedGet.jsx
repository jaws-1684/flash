import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { api } from '../../Api'

export function useDebouncedGet({
  key,
  query,
  fn,
  debounceMs = 100,
}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const path = fn(query)

  const loadTimeoutRef = useRef(null)

  useEffect(() => {
    const startTime = Date.now()
    
    if (!query)  return

    const debounceTimeout = setTimeout(async () => {
      setLoading(true)

      try {
        const result = await api.get({path: path, key: key})
        const elapsedTime = Date.now() - startTime
        const remainingTime = Math.max(0 , 200 - elapsedTime)

        loadTimeoutRef.current = setTimeout(() => {
          setData(result ?? [])
          setLoading(false)
        }, remainingTime)
      } catch (e) {
        if (api.isAborted(path)) return
        setData([])
      }
    }, debounceMs)

    return () => {
      api.abort(path)
      clearTimeout(debounceTimeout)
      clearTimeout(loadTimeoutRef.current)
    }
  }, [query, debounceMs, fn])

  return [ data, loading, setData ]
}
