import React, { ReactNode } from 'react'
import { IconClose } from './close'

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
        <div
            className={'pos-fixed top-0 bottom-0 left-0 right-0 p-48-48 bg-white ' + className}
            style={{ zIndex: 9999999, backgroundColor: '#d6c5ff' }}
        >
            <button
                className="bg-white p-20-20 pos-abt top-0 right-0"
                style={{ backgroundColor: '#d6c5ff' }}
                onClick={onClose}
            >
                <IconClose />
            </button>

            {children}
        </div>
    ) : null
}
