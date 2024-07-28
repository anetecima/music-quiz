import { createContext, PropsWithChildren, useContext } from 'react'

type EditorProvider = {
  cIndex: number
  qIndex: number
}

const EditorProvider = createContext<EditorProvider>({
  cIndex: 0,
  qIndex: 0
})

export const EditorCategoryProvider = ({
  children,
  qIndex,
  cIndex
}: PropsWithChildren<EditorProvider>) => {
  return <EditorProvider.Provider value={{ qIndex, cIndex }}>{children}</EditorProvider.Provider>
}

export const useSelectCategoryIndex = () => useContext(EditorProvider).cIndex
export const useSelectQuestionIndex = () => useContext(EditorProvider).qIndex
