import { useEffect, useState } from 'react'

export const Timer = ({ length }: { length: number }) => {
  const [timer, setTimer] = useState(length)

  useEffect(() => {
    const timeout = setInterval(() => {
      setTimer(seconds => seconds - 1)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return <>{timer}</>
}
