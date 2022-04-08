import styled from 'styled-components'
import { cDarkGrey, cGreen } from 'theme/variables'
import { mixinPosition } from 'theme/mixin'

type LabelProps = {
    isSelected: boolean
    isError?: boolean
}

export const RadioLabelStyle = styled.label<LabelProps>`
    padding-left: 36px !important;
    ${props => props.isError && 'color: #ff0000'};

    &::before {
        ${mixinPosition({ w: '20px', h: '20px', t: '50%', l: '0px' })};
        transform: translateY(-50%);
        border: 1px solid
            ${props => (props.isError ? '#ff0000' : props.isSelected ? cGreen : cDarkGrey)};
        border-radius: 100%;

        &:hover {
            border-color: ${cGreen};
        }
    }

    &::after {
        ${props =>
            mixinPosition({
                w: props.isSelected ? '10px' : '0',
                h: props.isSelected ? '10px' : '0',
                t: '50%',
                l: '5px'
            })};
        transform: translateY(-50%);
        background: ${cGreen};
        border-radius: 100%;
    }
`
