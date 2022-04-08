import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'
import { gameObject, TypeCategory } from './gameObject'
import { CategoryCard } from './categoryCard'
import { reducer } from './store'
import { Answers } from './answersStyle'

const TitleStyle = styled.h1`
    font-size: 80px;
    text-transform: uppercase;
    color: #000;
`
const BackgroundStyle = styled.div`
    
    min-height: 100vh;
    background: url('https://i.pinimg.com/originals/03/87/ef/0387ef0acdf21d21eaa8f2302608c183.jpg')
        no-repeat center;
    background-size: cover;
`

export const GameContext = React.createContext<any>(null)

export const MainPage = () => {
    const [state, dispatch] = useReducer(reducer, { gameObject, roundQuestions: [] })

    useEffect(() => {
        const gameObj = localStorage.getItem('gameObject') || ''

        if (gameObj) {
            dispatch({ type: 'SET_STATE', payload: JSON.parse(gameObj) })
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('gameObject', JSON.stringify(state))
    }, [state])

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            <BackgroundStyle className="t-center p-0-48 fl fl-col fl-j-c">
                <TitleStyle className="uppercase c-black">Kategorijas</TitleStyle>

                <div className="fl fl-wrap fl-j-c fl-a-c stretch" style={{ gap: 48 }}>
                    {state.gameObject.map((item: TypeCategory, index: number) => (
                        <CategoryCard {...item} categoryIndex={index} key={index} />
                    ))}
                </div>

                <Answers key={state.roundQuestions.length} />
            </BackgroundStyle>
        </GameContext.Provider>
    )
}
