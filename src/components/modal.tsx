import type { ReactNode } from 'react'
import IcoClose from '@/assets/icons/close.svg'
import { Modal as MuiModal } from '@mui/material'
import { cn } from '@/helpers/cn'
import { rubikBeastlyFont } from '../theme/fonts'

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
  return (
    <MuiModal
      open={isOpened}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        className={cn(
          'font-fuzzy fixed inset-0 z-[9999999] flex justify-center',
          rubikBeastlyFont.className,
          className
        )}
      >
        <button className="absolute right-0 top-0 z-[999] rounded-full p-5" onClick={onClose}>
          <IcoClose className="h-6 w-6" />
        </button>
        {children}
      </div>
    </MuiModal>
  )
}
