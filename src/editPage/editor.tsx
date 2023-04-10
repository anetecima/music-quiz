import React, { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { CategoryEditor } from './category'
import styled from 'styled-components'
import { gameObject, TypeCategory } from '../quiz/gameObject'

const BackgroundStyle = styled.div`
  min-height: 100vh;
  background-size: cover;
`
export type TypeFormValues = { gameObject: TypeCategory[] }
export const GameEditor = () => {
  const [state, setState] = useState(() => {
    const gameObj = localStorage.getItem('gameObject') || ''

    if (gameObj) {
      return JSON.parse(gameObj)
    }
    return null
  })

  const onSubmit: SubmitHandler<TypeFormValues> = data => {
    let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data))
    let downloadAnchorNode = document.createElement('a')

    downloadAnchorNode.setAttribute('href', dataStr)
    downloadAnchorNode.setAttribute('download', 'my_amazing_game.json')
    document.body.appendChild(downloadAnchorNode) // required for firefox
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  const handleBlur = () => {
    const formValues = methods.getValues()

    localStorage.setItem('gameObject', JSON.stringify(formValues))
  }

  const methods = useForm<TypeFormValues>({ defaultValues: state })

  return (
    <BackgroundStyle className="t-center p-0-48 fl fl-col">
      <FormProvider {...methods}>
        <form onBlur={handleBlur} className="stretch" onSubmit={methods.handleSubmit(onSubmit)}>
          <CategoryEditor />
        </form>
      </FormProvider>
    </BackgroundStyle>
  )
}
