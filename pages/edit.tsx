import { useEffect, useState } from 'react'
import { Editor } from '@/features/editor/components/editor'

export default function Edit() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  // do not render on server
  return <Editor />
}
