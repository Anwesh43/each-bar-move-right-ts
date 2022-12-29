import React from 'react'
import { useAnimatedScale, useDimension } from './hooks'

export interface MainComponentProps {
    w? : number, 
    h? : number, 
    scale? : number, 
    onClick? : () => void, 
    n : number 
}

type HOCType = (a : React.FC<MainComponentProps>) => React.FC<MainComponentProps>


const withContext : HOCType = (MainComponent : React.FC<MainComponentProps>) : React.FC<MainComponentProps> => {
    return (props : MainComponentProps) => {
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