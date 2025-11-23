import type { IGameCategory } from '@/types/Types'
import { useRouter } from 'next/router'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import React, { PropsWithChildren } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { cn } from '@/helpers/cn'
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
  isVertical,
  append
}: {
  activeTab: number
  setActiveTab: (T: number) => void
  isVertical?: boolean
  append: any
}) => {
  const router = useRouter()
  const { getValues } = useFormContext()
  const categories = getValues()[GAME_KEY] as IGameCategory[]

  function onBackBtnClick() {
    updateStorage(getValues())
    router.push('/')
  }

  function onCategoryAdd() {
    append(newCategory())
    setActiveTab(categories.length)
  }

  return (
    <nav className={cn(isVertical ? 'w-full' : 'min-w-[250px]')}>
      <NavBtn onClick={onBackBtnClick}>Atpakal uz galveno</NavBtn>

      {/*<h3 className="mx-auto flex justify-center pb-2 text-lg font-bold text-cta">
        Saraksts ar kategorijam
      </h3>*/}

      <div>
        {categories?.length > 0 && (
          <Tabs
            classes={{ scrollableY: 'max-h-[55vh]' }}
            variant="scrollable"
            orientation={isVertical ? 'horizontal' : 'vertical'}
            value={activeTab}
            onChange={(_e, val) => setActiveTab(val)}
          >
            {categories?.map((category, categoryIndex) => (
              <Tab
                key={categoryIndex}
                className={'flex items-start justify-start'}
                label={<MuiTabLabel categoryIndex={categoryIndex} />}
              />
            ))}
          </Tabs>
        )}
      </div>

      <div className={cn('flex', isVertical ? 'mt-2 flex-row gap-8' : 'flex-col ')}>
        <NavBtn onClick={onCategoryAdd}>Pievienot kategoriju</NavBtn>
        {categories?.length > 0 && <NavBtn type="submit">Lejupielādēt spēles failu</NavBtn>}
      </div>
    </nav>
  )
}
