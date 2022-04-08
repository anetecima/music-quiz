import { TypeGameObject, TypeOption, gameObject } from './gameObject'
type TypeDefaultState = {
    gameObject: TypeGameObject
    roundQuestions: (TypeOption & { category: string })[]
}
export type Action =
    | {
          type: 'VALUE_ON_CHANGE'
          payload: { categoryIndex: number; optionIndex: number } & Partial<TypeOption>
      }
    | {
          type: 'SET_STATE'
          payload: TypeDefaultState
      }
    | { type: 'RESET_FORM' }
    | { type: 'ADD_ANSWER'; payload: TypeOption & { category: string } }
    | { type: 'RESET_ANSWERS' }

export function reducer(state: TypeDefaultState, action: Action) {
    if (action.type === 'SET_STATE') {
        return {
            ...action.payload
        }
    }
    if (action.type === 'VALUE_ON_CHANGE') {
        const { categoryIndex, optionIndex, ...props } = action.payload
        const categories = state.gameObject

        const option = categories[categoryIndex].options[optionIndex]
        categories[categoryIndex].options[optionIndex] = { ...option, ...props }

        return {
            ...state,
            gameObject: [...categories]
        }
    }
    if (action.type === 'RESET_FORM') {
        return { gameObject, roundQuestions: [] }
    }

    if (action.type === 'ADD_ANSWER') {
        const questions = state.roundQuestions || []
        questions.push(action.payload)

        return {
            ...state,
            roundQuestions: questions
        }
    }
    if (action.type === 'RESET_ANSWERS') {
        return {
            ...state,
            roundQuestions: []
        }
    }

    return state
}
