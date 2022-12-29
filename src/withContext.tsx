import React from 'react'
import { useAnimatedScale, useDimension } from './hooks'

export interface MainComponentProps {
    w? : number, 
    h? : number, 
    scale? : number, 
    onClick? : () => void, 
    i? : number, 
    n : number 
}

type HOCType = (a : React.FC<MainComponentProps>) => React.FC<MainComponentProps>


const withContext : HOCType = (MainComponent : React.FC<MainComponentProps>) : React.FC<MainComponentProps> => {
    return (props : MainComponentProps) => {
        const {scale, start : onClick, i} = useAnimatedScale(0.01, 20, props.n)
        const {w, h} = useDimension()
        const newProps = {
            ...props,
            w, 
            h, 
            scale, 
            i,
            onClick 
        }
        return <MainComponent {...newProps}>

        </MainComponent>
    }
}

export default withContext 