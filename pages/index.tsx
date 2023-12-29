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
      <HomePage />
    </div>
  )
}
