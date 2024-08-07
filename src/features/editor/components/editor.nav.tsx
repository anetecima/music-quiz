import type { IGameCategory } from '@/types/Types'
import { useRouter } from 'next/router'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import React, { PropsWithChildren } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { updateStorage } from '@/helpers/helpers.storage'
import { GAME_KEY } from '@/features/editor/editor.const'
import { SimpleButton } from '@/components/ux/Button'
import { newCategory } from '../editor.utils'

const MuiTabLabel = ({ categoryIndex }: { categoryIndex: number }) => {
  const categoryName = useWatch({ name: `gameObject.${categoryIndex}.categoryName` })
  return <h4>{categoryName || 'Empty'}</h4>
}

const NavBtn = ({ children, ...props }: PropsWithChildren<any>) => {
  return (
    <SimpleButton
      className="mb-2 block w-full whitespace-nowrap bg-cta px-4 py-2 text-sm font-semibold text-white"
      {...props}
    >
      {children}
    </SimpleButton>
  )
}

export const EditorNav = ({
  activeTab,
  setActiveTab,
  append
}: {
  activeTab: number
  setActiveTab: (T: number) => void
  append: any
}) => {
  const router = useRouter()
  const { getValues } = useFormContext()
  const categories = getValues()[GAME_KEY] as IGameCategory[]

  return (
    <nav className="w-[300px] pr-2">
      <div
        onClick={() => {
          updateStorage(getValues())
          router.push('/')
        }}
      >
        <NavBtn>Back</NavBtn>
      </div>

      <div className="my-2">
        {categories?.length > 0 && (
          <Tabs
            classes={{ scrollableY: 'max-h-[55vh]' }}
            variant="scrollable"
            value={activeTab}
            orientation="vertical"
            onChange={(_e, val) => setActiveTab(val)}
          >
            {categories?.map((category, categoryIndex) => (
              <Tab key={categoryIndex} label={<MuiTabLabel categoryIndex={categoryIndex} />} />
            ))}
          </Tabs>
        )}
      </div>

      <NavBtn
        onClick={() => {
          append(newCategory())
          setActiveTab(categories.length)
        }}
      >
        Pievienot kategoriju
      </NavBtn>

      {categories?.length > 0 && <NavBtn type="submit">Lejupielādēt spēles failu</NavBtn>}
    </nav>
  )
}
