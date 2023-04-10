import React, { useContext, useState } from 'react'
import { TypeOption } from './gameObject'
import styled from 'styled-components'
import { ModalContext } from './optionModalContext'
import { GameContext } from './index'

const PointsOptionStyle = styled.div<{ isActive: boolean }>`
  width: 70px;
  height: 70px;
  background-color: ${props => (props.isActive ? '#f9c7ff' : 'grey')};
  border-radius: 100%;
  font-family: 'Rubik Beastly', serif;
  font-size: 40px;
  &:hover {
    background-color: ${props => (props.isActive ? '#e400ff' : 'grey')};
  }
`

export const Option = ({
  points,
  active,
  question,
  track,
  start,
  categoryIndex,
  optionIndex,
  length = 15
}: TypeOption & { categoryIndex: number; optionIndex: number }) => {
  const [isOpened, setIsOpened] = useState(false)
  const { state, dispatch } = useContext(GameContext)

  const onClose = () => {
    dispatch({
      type: 'VALUE_ON_CHANGE',
      payload: { categoryIndex, optionIndex, active: false }
    })

    dispatch({
      type: 'ADD_ANSWER',
      payload: {
        ...state.gameObject[categoryIndex].options[optionIndex],
        category: state.gameObject?.[categoryIndex]?.categoryName
      }
    })

    setIsOpened(false)
  }

  return (
    <>
      <PointsOptionStyle
        className={'fl fl-j-c fl-a-c transition ' + (active && 'pointer')}
        isActive={active}
        onClick={() => setIsOpened(true)}
      >
        {points}
      </PointsOptionStyle>

      <ModalContext
        isOpened={isOpened}
        onCancel={() => setIsOpened(false)}
        onClose={onClose}
        question={question}
        track={track}
        start={typeof start === 'string' ? parseInt(start) : start}
        length={typeof length === 'string' ? parseInt(length) : length}
      />
    </>
  )
}
