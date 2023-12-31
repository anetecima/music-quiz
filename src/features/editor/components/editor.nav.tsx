import type { IGameCategory } from '@/types/types.game'
import IcoBack from '@/assets/icons/back.svg'
import IcoDownload from '@/assets/icons/download.svg'
import Link from 'next/link'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import React from 'react'
import { useWatch } from 'react-hook-form'
import { SimpleButton } from '@/components/ux/Button'
import { newCategory } from '../../../Entities'

const MuiTabLabel = ({ categoryIndex }: { categoryIndex: number }) => {
  const categoryName = useWatch({ name: `gameObject.${categoryIndex}.categoryName` })
  return <h4>{categoryName || 'Empty'}</h4>
}

export const EditorNav = ({
  activeTab,
  setActiveTab,
  fields,
  append
}: {
  activeTab: number
  setActiveTab: (T: number) => void
  fields: IGameCategory[]
  append: any
}) => (
  <nav>
    <Link href="/">
      <div className="mb-2 flex justify-center rounded bg-purple-400 py-2 text-center text-white hover:opacity-90">
        <IcoBack />
      </div>
    </Link>

    <div>
      {fields?.length > 0 && (
        <Tabs
          classes={{
            scrollableY: 'max-h-[55vh]'
          }}
          variant="scrollable"
          value={activeTab}
          orientation="vertical"
          onChange={(_e, val) => setActiveTab(val)}
        >
          {fields?.map((category, categoryIndex) => (
            <Tab key={categoryIndex} label={<MuiTabLabel categoryIndex={categoryIndex} />} />
          ))}
        </Tabs>
      )}
    </div>

    <div className="my-2 rounded text-white">
      <SimpleButton
        className="w-full whitespace-nowrap bg-teal-400 p-4 text-xs font-bold"
        onClick={() => {
          append(newCategory())
          setActiveTab(fields.length)
        }}
      >
        + Pievienot kategoriju
      </SimpleButton>
    </div>

    {fields?.length > 0 && (
      <button className="flex w-full flex-col items-center justify-center rounded-2xl p-5 transition hover:bg-[#d5fff2]">
        <IcoDownload width={60} height={60} />
        <div>lejupielādēt spēles failu</div>
      </button>
    )}
  </nav>
)
