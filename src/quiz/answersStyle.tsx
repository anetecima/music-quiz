import React, { useCallback, useContext, useEffect, useState } from 'react'
import { GameContext } from './index'
import styled from 'styled-components'
import { Modal } from '../components/modal'
import YouTube from 'react-youtube'
import { gameQuestions } from './optionModalContext'

const ItemStyle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  line-height: 50px;
  font-family: 'Rubik Beastly', serif;
`
const AnswerStyle = styled.div`
  font-size: 50px;
  margin-bottom: 50px;
  font-family: 'Rubik Beastly', serif;
  transition: opacity linear 1s;
`
const ButtonStyle = styled.button`
  font-size: 30px;
  margin-bottom: 50px;
  font-family: 'Rubik Beastly', serif;
  transition: opacity linear 1s;
  color: white;
  background-color: black;
  border-radius: 8px;
  opacity: ${props => (props.disabled ? 0.3 : 1)};
`

export const Answers = () => {
  const { state, dispatch } = useContext(GameContext)
  const [isOpened, setIsOpened] = useState(false)
  const [step, setStep] = useState(0)
  const [play, setPlay] = useState(false)
  const gameItem = state?.roundQuestions?.[step]

  const totalSteps = state?.roundQuestions?.length

  console.log(state)
  console.log(step)

  const start = gameItem?.start || 0

  const onNext = useCallback(() => {
    if (step >= totalSteps - 1) {
      setIsOpened(false)
      setStep(0)
      dispatch({ type: 'RESET_ANSWERS' })
    } else {
      setStep(prev => prev + 1)
    }
    setPlay(false)
  }, [step, totalSteps])

  const closeHandler = () => {
    if (step >= totalSteps - 1 && play) {
      dispatch({ type: 'RESET_ANSWERS' })
      setIsOpened(false)
    } else {
      setIsOpened(false)
    }
  }

  useEffect(() => {
    setPlay(false)
  }, [isOpened])

  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      startSeconds: start,
      start: start,
      modestBranding: 1,
      autoplay: 1
    }
  }

  return (
    <>
      <div className="fl fl-c m-t-40">
        <div className="fl fl-c pointer">
          {[...Array(totalSteps)].map((item, index) => (
            <ItemStyle
              className="f-s-36 m-r-4 m-l-8"
              key={index}
              onClick={() => {
                setIsOpened(true)
                setStep(index)
              }}
              style={{
                backgroundColor: state.roundQuestions?.[index] ? 'yellow' : 'grey'
              }}
            >
              {index + 1}
            </ItemStyle>
          ))}
        </div>
      </div>

      <Modal className="fl fl-j-c" isOpened={isOpened} onClose={closeHandler}>
        <div key={step}>
          <h2 className="m-t-0" style={{ fontSize: 40 }}>
            {/*@ts-ignore*/}
            {gameQuestions?.[gameItem?.question]}
            <br /> {gameItem?.category} {gameItem?.points}
          </h2>

          <AnswerStyle
            className="stretch"
            style={{ opacity: play ? 1 : 0, transitionDelay: play ? '8s' : '0' }}
          >
            {gameItem?.answer}
            <div className="f-s-18">{gameItem?.songTitle}</div>
          </AnswerStyle>

          <div
            className="fl fl-a-c fl-j-c stretch pos-rlt t-center"
            style={{ width: 1000, height: 500 }}
          >
            <div
              style={{
                opacity: play ? 1 : 0,
                transition: 'opacity linear 1s',
                transitionDelay: play ? '5s' : '0'
              }}
            >
              {play && (
                <YouTube
                  videoId={gameItem?.track}
                  // @ts-ignore
                  opts={opts}
                  className="pos-abt top-0 bottom-0 left-0 right-0"
                />
              )}
            </div>

            {!play && (
              <div onClick={() => setPlay(true)} className="pointer">
                <svg viewBox="0 0 24 24" width="400px" height="400px">
                  <path
                    transform="scale(0.5, 0.5)"
                    d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 29V15l12 9-12 9z"
                  />
                </svg>
              </div>
            )}
          </div>

          <div>
            <ButtonStyle
              disabled={step === 0}
              className="m-t-40 p-20-20 m-r-12"
              onClick={() => step !== 0 && setStep(prev => prev + 1)}
            >
              Iepriekšējā
            </ButtonStyle>

            <ButtonStyle className="m-t-40 p-20-20" onClick={onNext}>
              {step >= totalSteps - 1 ? 'Aizvērt' : 'Nākamā'}
            </ButtonStyle>
          </div>
        </div>
      </Modal>
    </>
  )
}
