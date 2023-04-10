import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { gameObject } from '../quiz/gameObject'
import { useRouter } from 'next/router'

const BackgroundStyle = styled.div`
  min-height: 100vh;
  background: url('https://i.pinimg.com/originals/03/87/ef/0387ef0acdf21d21eaa8f2302608c183.jpg')
    no-repeat center;
  background-size: cover;
`

const LinkStyle = styled.a`
  display: block;
  padding: 50px;
  font-size: 30px;
  max-width: 400px;
  text-transform: uppercase;
  color: #000;
  font-family: 'Rubik Beastly', serif;
  cursor: pointer;
  border-radius: 100%;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    background-color: #c68aff;
  }
`

export const MainMenu = () => {
  const [hasGame, setHasGame] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const gameObj = localStorage.getItem('gameObject') || ''

    if (gameObj) {
      setHasGame(true)
    }
  }, [])

  //@ts-ignore
  const onReaderLoad = event => {
    let obj = JSON.parse(event.target.result)

    localStorage.setItem('gameObject', JSON.stringify({ roundQuestions: [], ...obj }))
    router.push('/quiz')
  }

  //@ts-ignore
  const onFileUpload = event => {
    let reader = new FileReader()
    reader.onload = onReaderLoad
    reader.readAsText(event.target.files[0])
  }

  return (
    <BackgroundStyle className="t-center p-0-48 fl fl-col fl-j-c">
      <div className="fl fl-c stretch">
        <Link href="/edit">
          <LinkStyle>Rediģēt vai izveidot spēles failu</LinkStyle>
        </Link>

        <LinkStyle className="pos-rlt">
          Augšupielādēt failu un spēlēt
          <input
            className="pos-abt top-0 bottom-0 left-0 right-0 bg-green z-i-3 transparent transparent"
            type="file"
            onChange={onFileUpload}
          />
        </LinkStyle>

        {hasGame && (
          <Link href="/quiz">
            <LinkStyle>Turpināt spēli</LinkStyle>
          </Link>
        )}
      </div>
    </BackgroundStyle>
  )
}
