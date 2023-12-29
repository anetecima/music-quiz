import { Button } from '@material-ui/core'
import React from 'react'
import { Question } from '../Entities'

export const AddQuestionButton = ({ append }: { append: any }) => (
  <Button
    className="h-14 w-full rounded-xl border-2 border-dashed border-white bg-purple-500 text-white shadow-xl"
    variant="outlined"
    type="button"
    onClick={() => {
      append({
        ...Question
      })
    }}
  >
    <div className="inline">+ Pievienot jautājumu</div>
  </Button>
)
