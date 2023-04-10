import React, { useState } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import { QuestionEditor } from './question'
import { Button, Tab, Tabs } from '@material-ui/core'
import styled from 'styled-components'
import { AddButton } from './addButton'
import { DeleteIcon } from './deleteIcon'
import { DownloadGameFile } from './downloadGameFile'
import { TypeFormValues } from './editor'

const CategoryStyle = styled.div`
  border-radius: 12px;
  width: 860px;
  .MuiFormControl-root,
  .MuiButtonBase-root {
    margin: 5px;
  }
`

const CategoryTabLabel = ({ categoryIndex }: { categoryIndex: number }) => {
  const { watch } = useFormContext()

  return watch(`gameObject[${categoryIndex}].categoryName`)
}

export const CategoryEditor = () => {
  const [activeTab, setActiveTab] = useState(0)

  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray<TypeFormValues, 'gameObject'>({
    name: 'gameObject' // unique name for your Field Array
  })

  const handleRemove = (index: number) => {
    if (index > fields.length - 2) {
      setActiveTab(0)
    }
    remove(index)
  }

  return (
    <div className="fl fl-j-sb p-20-20 stretch">
      <div>
        <Tabs
          className="fl-shrink-0"
          value={activeTab}
          orientation="vertical"
          onChange={(_e, val) => setActiveTab(val)}
        >
          {fields.map((category, categoryIndex) => (
            <Tab key={category.id} label={<CategoryTabLabel categoryIndex={categoryIndex} />} />
          ))}

          {fields.length < 12 ? <AddButton append={append} /> : null}
        </Tabs>

        <DownloadGameFile />
      </div>

      <div className="stretch fl fl-j-c">
        {fields.length > 0 ? (
          <CategoryStyle key={`${activeTab} ${fields.length}`} className="m-b-40 p-20-20">
            <div className="fl m-b-8 b-radius bg-grey p-12-12">
              <Controller
                render={({ field }) => (
                  <TextField
                    variant="filled"
                    className="stretch"
                    label="kategorijas noasukums"
                    {...field}
                  />
                )}
                defaultValue={fields?.[activeTab]?.categoryName}
                name={`gameObject[${activeTab}].categoryName`}
                control={control}
              />

              <Button
                className="f-s-12 fl-shrink-0"
                // color="error"
                variant="outlined"
                onClick={() => handleRemove(activeTab)}
              >
                <DeleteIcon /> dzēst kategoriju <DeleteIcon />
              </Button>
            </div>

            <QuestionEditor categoryIndex={activeTab} />
          </CategoryStyle>
        ) : (
          <div className="p-40-40">
            <div className="f-s-22 t-semi m-b-20">Pievieno kategoriju lai sāktu veidot spēli</div>

            <AddButton append={append} />
          </div>
        )}
      </div>
    </div>
  )
}
