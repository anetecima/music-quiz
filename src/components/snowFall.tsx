import { useEffect, useState } from 'react'
import Snowfall from 'react-snowfall'

export const SnowFall = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div
      style={{
        pointerEvents: 'none',
        zIndex: '1',
        height: '100vh',
        width: '100%',
        background: 'transparent',
        position: 'absolute'
      }}
    >
      <Snowfall />
    </div>
  )
}
