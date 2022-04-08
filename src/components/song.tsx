import React from 'react'
import { TypeOption } from '../quiz/gameObject'

export const Song = ({ track, isVideo = false }: { track: string; isVideo?: boolean }) => (
    <div className="fl fl-a-c fl-j-c stretch pos-rlt t-center" style={{ width: 1000, height: 500 }}>
        <svg viewBox="0 0 24 24" width="100px" height="100px">
            <path
                transform="scale(0.5, 0.5)"
                d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 29V15l12 9-12 9z"
            />
        </svg>

        <iframe
            className="pos-abt top-0 bottom-0 left-0 right-0"
            width="100%"
            height="100%"
            src={track}
            // style={{ opacity: isVideo ? 1 : 0 }}
            allow="autoplay"
        />
    </div>
)
