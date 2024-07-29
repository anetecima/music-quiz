import type { IQuestion } from '@/types/Types'
import { useWatch } from 'react-hook-form'
import {
  EditorInputControl,
  EditorPointsControl,
  EditorSelectControl
} from '@/features/editor/components/editor.controls'
import { SectionContainer } from '@/components/ux/SectionContainer'
import { QuestionType } from '../../../const'

const Questions = ({
  question,
  categoryIndex,
  index
}: {
  index: number
  categoryIndex: number
  question: IQuestion
}) => {
  const fields = useWatch({ name: `gameObject[${categoryIndex}].options[${index}].typeOfQuestion` })

  if (fields !== QuestionType.quiz) {
    return (
      <div className="flex flex-col gap-4">
        <EditorInputControl value={question.answer} label="Pareiza atbilde" name="answer" />
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-2">
      <EditorInputControl value={question.quiz?.question} label="Jautajums" name="quiz.question" />
      <EditorInputControl value={question.answer} label="Pareiza atbilde" name="answer" />
      {[0, 1, 2, 3].map(val => (
        <EditorInputControl
          key={val}
          value={question?.quiz?.variants?.[val] || ''}
          label={`Variant ${val + 1}`}
          name={`quiz.variants[${val}]`}
        />
      ))}
    </div>
  )
}

export const QuestionFields = ({
  question,
  categoryIndex,
  index
}: {
  index: number
  categoryIndex: number
  question: IQuestion
}) => {
  return (
    <>
      <SectionContainer className="">
        <aside className="flex flex-1 flex-col gap-4">
          <EditorSelectControl
            value={question.typeOfQuestion}
            name="typeOfQuestion"
            label="Kas jauzmin"
          />
          <EditorPointsControl
            checkEmpty
            value={question.points}
            name="points"
            label="punkti par jautājumu"
          />
        </aside>
        <aside className="flex-1">
          <Questions question={question} categoryIndex={categoryIndex} index={index} />
        </aside>
      </SectionContainer>
      <SectionContainer className="flex justify-between gap-2">
        <div className="flex-1">
          <EditorInputControl name="bonusQuestion" label="Bonus jautājums" />
        </div>
        <div className="flex-1">
          <EditorPointsControl
            label="papildus punkti"
            name="extraPoints"
            value={question.extraPoints}
          />
        </div>
      </SectionContainer>
    </>
  )
}
