import React from 'react'
import { useState, useEffect } from 'react'

export function useContacts(searchTerm) {
    const [contacts, setContacts] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!searchTerm) return
        let delay;
        const delayDebounceFn = setTimeout(() => {
            console.log(searchTerm)
            setLoading(() => true)     
            fetch(`/search?username=${searchTerm}`).then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("response not ok")
            }).then(response => {
                setContacts(() => response) 
            }).catch(error => {
                console.log(error)
                setContacts({error: "not found"})
            }).finally(() => {
                delay = setTimeout(() => {
                    setLoading(() => false)   
                }, 100)
                
            }) 
        }, 100)

        return () => {
            clearTimeout(delayDebounceFn)
            clearTimeout(delay)
        }
    }, [searchTerm])

   return [contacts, loading]
  
}

