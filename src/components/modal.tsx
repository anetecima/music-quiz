import IcoClose from '@/assets/icons/close.svg'
import React, { ReactNode } from 'react'

export const Modal = ({
  isOpened,
  onClose,
  children,
  className = ''
}: {
  isOpened: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}) => {
  return isOpened ? (
    <div className={'fixed inset-0 z-[9999999] bg-[#d6c5ff] p-12 ' + className}>
      <button
        className="absolute right-0 top-0 z-[999] rounded-full bg-[#d6c5ff] p-5"
        onClick={onClose}
      >
        <IcoClose className="h-6 w-6 text-[#000] " />
      </button>
      {children}
    </div>
  ) : null
}
