import { IM_Fell_DW_Pica, Rubik_Beastly } from 'next/font/google'
import React from 'react'
import { HomePage } from '@/features/home/home'

// const rubikBeastly = Rubik_Beastly({
//   weight: ['400'],
//   subsets: ['latin'],
//   display: 'swap'
// })

const rubikBeastly = IM_Fell_DW_Pica({
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
