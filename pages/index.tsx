import { Rubik_Beastly } from 'next/font/google'
import React from 'react'
import { HomePage } from '@/features/home/home'

const rubikBeastly = Rubik_Beastly({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap'
})

export default function Home() {
  return (
    <div className={rubikBeastly.className}>
      <style jsx global>{`
        html {
          //font-family: var(--font-rubik-beastly);
        }
        html {
          //font-family: ${rubikBeastly.style.fontFamily};
        }
      `}</style>
      <HomePage />
    </div>
  )
}
