import React from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { DownloadIcon } from './downloadIcon'

const ButtonStyled = styled.button`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #d5fff2;
  }

  svg {
    font-size: 60px;
  }
`

export const DownloadGameFile = () => {
  const {
    handleSubmit,
    formState: { isValid }
  } = useFormContext()

  return (
    <ButtonStyled
      //@ts-ignore
      onClick={handleSubmit}
      disabled={!isValid}
    >
      <DownloadIcon className="m-b-12" />
      <div>lejupielādēt spēles failu</div>
    </ButtonStyled>
  )
}
