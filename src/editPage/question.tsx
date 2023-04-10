import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { TypeOption } from '../quiz/gameObject'
import TextField from '@material-ui/core/TextField'
import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import YouTube from 'react-youtube'
import { DeleteIcon } from './deleteIcon'
import { TypeFormValues } from './editor'

const QuestionStyle = styled.div`
  border-radius: 12px;
  padding: 20px;
  background-color: aqua;
  max-width: 900px;
`

export const QuestionEditor = ({ categoryIndex }: { categoryIndex: number }) => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray<TypeFormValues, `gameObject.${number}.options`>({
    //@ts-ignore
    name: `gameObject.${categoryIndex}.options` // unique name for your Field Array
  })

  const handleAppend = (value: TypeOption) => {
    append(value)
  }

  const handleRemove = (index: number) => {
    remove(index)
  }

  return (
    <div>
      {fields.map((option, index: number) => (
        <QuestionStyle key={option.id} className="fl m-b-12">
          <div className="fl fl-col p-8-8 stretch">
            <div className="fl m-b-4">
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="filled"
                    type="number"
                    label="punkti par jautājumu"
                    className="m-r-4"
                    {...field}
                  />
                )}
                defaultValue={option.points}
                name={`gameObject[${categoryIndex}].options[${index}].points`}
                control={control}
              />
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="filled"
                    label="papildus punkti"
                    type="number"
                    className="m-b-4"
                    {...field}
                  />
                )}
                defaultValue={option.extraPoints}
                name={`gameObject[${categoryIndex}].options[${index}].extraPoints`}
                control={control}
              />
            </div>

            <Controller
              render={({ field }) => (
                <TextField variant="filled" label="jautājums" className="m-b-4" {...field} />
              )}
              defaultValue={option.question}
              name={`gameObject[${categoryIndex}].options[${index}].question`}
              control={control}
            />
            <Controller
              render={({ field }) => (
                <TextField
                  variant="filled"
                  label="youtube track kods"
                  className="m-b-4"
                  {...field}
                />
              )}
              rules={{ required: true }}
              defaultValue={option.track}
              name={`gameObject[${categoryIndex}].options[${index}].track`}
              control={control}
            />
            <Controller
              render={({ field }) => (
                <TextField
                  variant="filled"
                  label="sākums (sekundes no video sākuma)"
                  type="number"
                  className="m-b-4"
                  {...field}
                />
              )}
              defaultValue={option.start}
              name={`gameObject[${categoryIndex}].options[${index}].start`}
              control={control}
            />
            <Controller
              render={({ field }) => (
                <TextField variant="filled" label="izpildītājs" className="m-b-4" {...field} />
              )}
              defaultValue={option.answer}
              name={`gameObject[${categoryIndex}].options[${index}].answer`}
              control={control}
            />
            <Controller
              render={({ field }) => (
                <TextField
                  variant="filled"
                  label="dziesmas nosaukums"
                  className="m-b-4"
                  {...field}
                />
              )}
              defaultValue={option.songTitle}
              name={`gameObject[${categoryIndex}].options[${index}].songTitle`}
              control={control}
            />

            <Button
              variant="outlined"
              color="secondary"
              type="button"
              onClick={() => handleRemove(index)}
            >
              <DeleteIcon /> Dzēst jautājumu <DeleteIcon />
            </Button>
          </div>

          <div className="fl fl-a-c fl-j-c stretch pos-rlt t-center" key={JSON.stringify(option)}>
            {option?.track && (
              <YouTube
                videoId={option?.track}
                // @ts-ignore
                opts={{
                  width: '100%',
                  height: '100%',
                  playerVars: {
                    start: typeof option.start === 'string' ? parseInt(option.start) : option.start,
                    autoplay: 0
                  }
                }}
              />
            )}
          </div>
        </QuestionStyle>
      ))}

      {fields.length < 8 ? (
        <Button
          variant="outlined"
          type="button"
          onClick={() =>
            handleAppend({
              points: 0,
              extraPoints: 0,
              songTitle: '',
              question: 'artist',
              track: '',
              start: 0,
              answer: '',
              active: true
            })
          }
        >
          + Pievienot jautājumu
        </Button>
      ) : null}
    </div>
  )
}
