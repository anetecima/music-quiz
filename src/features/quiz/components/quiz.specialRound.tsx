import { IGameCategory, IQuestion } from '@/types/Types'
import IcoClose from '@/assets/icons/close.svg'
import { PropsWithChildren, useState } from 'react'
import { cn } from '@/helpers/cn'
import { QuizQuestion } from '@/features/quiz/components/quiz.question'
// import { Modal } from '@/components/modal'
import { gameQuestions, QuestionType } from '../../../const'

export const Modal = ({ isOpened, onClose, children, className = '' }: any) => {
  return isOpened ? (
    <div className={'pa-12 fixed inset-0 z-[100] bg-[#d6c5ff] ' + className}>
      <button
        className="absolute right-0 top-0 z-[999] rounded-full bg-[#d6c5ff] p-5"
        onClick={onClose}
      >
        <IcoClose className="h-6 w-6 text-[#000]" />
      </button>
      {children}
    </div>
  ) : null
}

function Wrapper({ children }: PropsWithChildren) {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="absolute flex h-screen items-center justify-center ">
        <div className="relative flex flex-1 items-center justify-center">
          <div className="absolute top-0  rounded-md  bg-pink-200 p-5 px-8 text-2xl">YES</div>
          <img alt="add category" src="/anete-yes.heic" />
        </div>
        <div className="atop-[20px]  relative flex flex-1  items-center justify-center">
          <div className="absolute top-2  rounded-md  bg-pink-200 p-5 px-8 text-2xl">No</div>
          <img className="" alt="add category" src="/anete-no.heic" height="50%" />
        </div>
      </div>
      <div className="m-auto flex h-screen w-[500px] items-center justify-center">{children}</div>
    </div>
  )
}

export const QuizSpecialRoundModal = ({
  item,
  categoryIndex
}: {
  categoryIndex: number
  item: IGameCategory
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false)
  // const { typeOfQuestion, extraPoints, bonusQuestion } = question
  // console.log('item', item)

  function onClose() {
    setIsOpened(false)
  }

  function onOpen() {
    setIsOpened(true)
  }

  return (
    <>
      <div
        className={cn(
          'relative overflow-y-hidden rounded-xl p-4 text-center shadow-xl',
          'cursor-pointer border-8 border-pink-600 bg-pink-200'
        )}
        onClick={onOpen}
      >
        <h2 className="relative z-[1] inline-flex p-1 text-3xl font-bold">{item.categoryName}</h2>
      </div>

      {isOpened && (
        <Modal isOpened className="flex items-center justify-center" onClose={onClose}>
          <Wrapper>
            <h2 className="text-2xl lg:text-7xl"></h2>
            <div className="z-[1] flex items-center justify-between gap-4">
              {item.options.map((item, index) => (
                <QuizQuestion
                  key={index}
                  question={item}
                  questionIndex={index}
                  categoryIndex={categoryIndex}
                />
              ))}
            </div>
          </Wrapper>
        </Modal>
      )}
    </>
  )
}
