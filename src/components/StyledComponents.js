// import React from 'react'
import styled from 'styled-components'

export const RoundContainer = styled.div`
    border-radius: 5px;
    padding: 1em;
    border: ${props => props.bordered ? '1px solid ' + props.borderColor : 'none'};
    background: ${props => props.background ? props.background : 'inherit'}
    cursor: ${props => props.cursor ? props.cursor : 'default'}
    margin: ${props => props.margin ? 0 : '20px'}
    @media (max-width: 425px) {
        padding: 0.5em 1em;

        font-size: 12px;
    }
`