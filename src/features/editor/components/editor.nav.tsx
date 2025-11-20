import type { IGameCategory } from '@/types/Types'
import type { PropsWithChildren } from 'react'
import { useRouter } from 'next/router'
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { Grip } from 'lucide-react'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useFormContext, useWatch } from 'react-hook-form'
import { updateStorage } from '@/helpers/helpers.storage'
import { GAME_KEY } from '@/features/editor/editor.const'
import { SimpleButton } from '@/components/ux/Button'
import { newCategory } from '../editor.utils'

function SortableItem(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} className="flex items-center gap-4">
      {props.children}
      <div style={style} {...attributes} {...listeners}>
        <Grip />
      </div>
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

const MuiTabLabel = ({ categoryIndex }: { categoryIndex: number }) => {
  const categoryName = useWatch({ name: `gameObject.${categoryIndex}.categoryName` })

  return (
    <SortableItem id={categoryIndex}>
      <h4>{categoryName || 'Empty'}</h4>
    </SortableItem>
  )
}

export const EditorNav = ({
  activeTab,
  setActiveTab,
  append,
  replace
}: {
  activeTab: number
  setActiveTab: (T: number) => void
  append: any
  replace: any
}) => {
  const router = useRouter()
  const { getValues } = useFormContext()
  const categories = getValues()[GAME_KEY] as IGameCategory[]

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const [activeId, setActiveId] = useState(null)
  const items = categories.map((_, index) => index)

  function handleDragStart(event: any) {
    const { active } = event
    setActiveId(active.id)
  }

  function handleDragEnd(event: any) {
    const { active, over } = event

    if (active.id !== over.id) {
      const newOrder = arrayMove(categories, active.id, over.id)
      replace(newOrder)
    }

    setActiveId(null)
  }

  function addCategory(category: any) {
    append(newCategory())
    setActiveTab(categories?.length)
  }

  function goHomeScreen() {
    updateStorage(getValues())
    router.push('/')
  }

  return (
    <nav className="w-[300px] pr-2">
      <div onClick={goHomeScreen}>
        <NavBtn>Back</NavBtn>
      </div>

      <div className="my-2">
        {categories?.length > 0 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              <Tabs
                classes={{ scrollableY: 'max-h-[55vh]' }}
                variant="scrollable"
                value={activeTab}
                orientation="vertical"
                onChange={(_e, val) => {
                  setActiveTab(val)
                }}
              >
                {items.map(id => (
                  <Tab key={id} label={<MuiTabLabel categoryIndex={id} />} />
                ))}
              </Tabs>
            </SortableContext>
            {createPortal(
              <DragOverlay>
                {activeId ? <Tab label={<MuiTabLabel categoryIndex={activeId} />} /> : null}
              </DragOverlay>,
              document.body
            )}
          </DndContext>
        )}
      </div>

      <NavBtn onClick={addCategory}>Pievienot kategoriju</NavBtn>
      {categories?.length > 0 && <NavBtn type="submit">Lejupielādēt spēles failu</NavBtn>}
    </nav>
  )
}
