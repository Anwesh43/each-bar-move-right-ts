import React, { CSSProperties } from 'react'
import withContext, { MainComponentProps } from './withContext'
import { useStyle } from './hooks'

interface BarProps {
    i : number, 
    barStyle : (i : number) => CSSProperties
}
const Bar : React.FC<BarProps>  = (props : BarProps) => {
    return <div style = {props.barStyle(props.i)}></div>
}

const getArr = (n : number) : Array<number> => {
    const arr = []
    for (var i = 0; i < n; i++) {
        arr.push(i)
    }
    return arr 
}

const EachBarMoveRight : React.FC<MainComponentProps> = (props : MainComponentProps) => {
    const { barStyle, parentStyle } = useStyle(props.w || 0, props.h || 0, props.scale || 0, props.n)
    const arr : Array<number> = getArr(props.n)

    return (
        <div style = {parentStyle()}>
            {arr.map((i : number) => (<Bar barStyle = {barStyle} i = {i} key = {`bar_${i}`}/>))}
        </div>
    )   
}

export default withContext(EachBarMoveRight)