import type { IGameCategory } from '@/types/Types'
import type { PropsWithChildren } from 'react'
import { useRouter } from 'next/router'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'
import { cn } from '@/helpers/cn'
import { updateStorage } from '@/helpers/helpers.storage'
import { GAME_KEY } from '@/features/editor/editor.const'
import { SimpleButton } from '@/components/ux/Button'
import { newCategory } from '../editor.utils'

const NavItem = ({ categoryIndex, move }: { categoryIndex: number; move: any }) => {
  const categoryName = useWatch({ name: `gameObject.${categoryIndex}.categoryName` })
  const { getValues } = useFormContext()
  const categories = getValues()[GAME_KEY] as IGameCategory[]

  function onDownClick() {
    move(categoryIndex, categoryIndex - 1)
  }

  function onUpClick() {
    move(categoryIndex, categoryIndex + 1)
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        <button
          type="button"
          className={cn(categoryIndex === categories.length - 1 && ' text-gray-200')}
          disabled={categoryIndex === categories.length - 1}
          onClick={onUpClick}
        >
          <ChevronDown width={18} />
        </button>
        <button
          type="button"
          className={cn(categoryIndex === 0 && ' text-gray-200')}
          disabled={categoryIndex === 0}
          onClick={onDownClick}
        >
          <ChevronUp width={18} />
        </button>
      </div>
      <h4>{categoryName || 'Empty'}</h4>
    </div>
  )
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
  append,
  move
}: {
  activeTab: number
  setActiveTab: (T: number) => void
  isVertical?: boolean
  append: any
  move: any
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
                label={<NavItem categoryIndex={categoryIndex} move={move} />}
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
