import { useIsClient } from '@/hooks/useIsClient'
import { Editor } from '@/features/editor/components/editor'

export default function Edit() {
  const isClient = useIsClient()

  // do not render on server
  return isClient ? <Editor /> : null
}
