import React, { useEffect, useState } from 'react'
import { GameEditor } from 'editPage/editor'

export default function Edit() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // do not render on server
  return isClient ? <GameEditor /> : null
}
