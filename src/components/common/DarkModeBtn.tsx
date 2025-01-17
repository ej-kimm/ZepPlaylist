'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { HiOutlineStar, HiOutlineSun } from 'react-icons/hi'

export const DarkModeBtn = () => {
  const { theme, setTheme } = useTheme()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(true)
  }, [setLoaded])
  return (
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          dark Mode
      {loaded ? (
        <>
          {theme === 'dark' ? (
            <HiOutlineStar className="text-2xl text-yellow-400" />
          ) : (
            <HiOutlineSun className="text-2xl" />
          )}
        </>
      ) : null}
    </button>
  )
}
