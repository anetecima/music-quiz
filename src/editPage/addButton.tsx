import React from 'react'
import { UseFieldArrayAppend } from 'react-hook-form'
import { Button } from '@material-ui/core'
import styled from 'styled-components'

const ButtonStyled = styled(Button)`
  background-color: #d5ffff;
  margin-top: 20px;
`
export const AddButton = ({ append }: { append: UseFieldArrayAppend<any> }) => {
  const handleAppend = () => {
    append({
      categoryName: 'Untitled',
      image: '',
      options: [
        {
          points: 0,
          extraPoints: 0,
          songTitle: '',
          question: 'artist',
          track: '',
          start: 0,
          answer: '',
          active: true
        }
      ]
    })
  }

  return (
    <ButtonStyled
      variant="outlined"
      className="t-bold"
      type="button"
      color="secondary"
      onClick={handleAppend}
    >
      + pievienot kategoriju
    </ButtonStyled>
  )
}
