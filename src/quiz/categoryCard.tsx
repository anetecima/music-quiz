import React from 'react'
import { TypeCategory } from './gameObject'
import styled from 'styled-components'
import { Option } from './option'
const CardStyle = styled.div<{ image: string }>`
    width: 30%;
    height: 180px;
    background-color:  white;
    border-radius: 10px;
    font-family: 'Rubik Beastly', serif;
`
const TitleStyle = styled.h2`
    font-size: 30px;
    margin: 0 0 20px;
    color: black;
`

export const CategoryCard = ({
    categoryName,
    options,
    image,
    categoryIndex
}: TypeCategory & { categoryIndex: number }) => (
    <CardStyle className="pos-rlt c-black p-16-16" image={image}>
        <TitleStyle className="">{categoryName}</TitleStyle>

        <div className="fl fl-j-sb fl-a-c">
            {options.map((item, index) => (
                <Option categoryIndex={categoryIndex} optionIndex={index} key={index} {...item} />
            ))}
        </div>
    </CardStyle>
)
