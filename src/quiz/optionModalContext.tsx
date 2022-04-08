import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import YouTube from 'react-youtube'

const TimeStyle = styled.div`
    font-size: 150px;
    background-color: blueviolet;
    width: 400px;
    height: 400px;
    border-radius: 100%;
    line-height: 400px;
    text-align: center;
    color: white;
`

export const gameQuestions = {
    artist: 'Nosauciet izpildītāju',
    song: 'Nosauciet dziesmu',
    video: 'Nosauciet izpildītāju'
} as const

type Friday = keyof typeof gameQuestions

const Timer = ({ length }: { length: number }) => {
    const [timer, setTimer] = useState(length)

    useEffect(() => {
        const timeout = setInterval(() => {
            setTimer(seconds => seconds - 1)
        }, 1000)

        return () => {
            clearTimeout(timeout)
        }
    }, [])

    return <TimeStyle>{timer}</TimeStyle>
}

export const ModalContext = ({
    onClose,
    track,
    question,
    start = 0,
    length = 15
}: {
    onClose: () => void
    track: string
    question: Friday
    start?: number
    length?: number
}) => {
    const [play, setPlay] = useState(false)
    const [showTimer, setShowTimer] = useState(false)

    const opts = {
        width: '100%',
        height: '100%',
        playerVars: {
            startSeconds: start,
            start: start,
            end: start + length,
            autoplay: 1
        }
    }

    return (
        <div>
            <h2 style={{ fontSize: 80 }}>{gameQuestions[question]}</h2>

            <div
                className="fl fl-a-c fl-j-c stretch pos-rlt t-center"
                style={{ width: 1000, height: 500 }}
            >
                {showTimer && <Timer length={length} />}

                {play ? (
                    <div style={{ transform: 'translateY(-10000px)' }}>
                        <YouTube
                            videoId={track}
                            onEnd={onClose}
                            onPlay={() => setShowTimer(true)}
                            // @ts-ignore
                            opts={opts}
                            className="pos-abt top-0 bottom-0 left-0 right-0"
                        />
                    </div>
                ) : (
                    <div onClick={() => setPlay(true)} className="pointer">
                        <svg viewBox="0 0 24 24" width="400px" height="400px">
                            <path
                                transform="scale(0.5, 0.5)"
                                d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 29V15l12 9-12 9z"
                            />
                        </svg>
                    </div>
                )}
            </div>
        </div>
    )
}
