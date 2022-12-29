import React from 'react'
import { useAnimatedScale, useDimension } from './hooks'

export interface MainComponentProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : () => void, 
    n : number 
}

export interface OrigComponentProps {
    n : number 
}

type HOCType = (a : React.FC<OrigComponentProps>) => React.FC<MainComponentProps>


const withContext : HOCType = (MainComponent : React.FC<OrigComponentProps>) : React.FC<MainComponentProps> => {
    return (props : OrigComponentProps) => {
        const {scale, start : onClick} = useAnimatedScale(0.01, 20, props.n)
        const {w, h} = useDimension()
        const newProps = {
            ...props,
            w, 
            h, 
            scale, 
            onClick 
        }
        return <MainComponent {...newProps}>

        </MainComponent>
    }
}

export default withContext 