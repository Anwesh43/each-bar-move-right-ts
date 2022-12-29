import {useState, useEffect, CSSProperties, useCallback} from 'react'

const SIZE_FACTOR : number = 7 
export interface AnimatedScaleProps {
    scale : number, 
    start : () => void, 
    i : number 
}

type UASProps = (a : number, b : number, c : number) => AnimatedScaleProps 

export const useAnimatedScale : UASProps = (scGap : number = 0.01, delay : number = 20, n : number = 4) : AnimatedScaleProps => {
    const [scale, setScale] = useState<number>(0)
    const [animated, setAnimated] = useState<boolean>(false)
    const [i, setI] = useState<number>(0)
    const [dir, setDir] = useState<number>(1)
    const updateI = useCallback(setI, [scale])
    const updateDir = useCallback(setDir, [dir])
    return {
        scale, 
        i, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) : number => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            if (i == n - 1 && dir == 1) {
                                updateI(n - 1)
                                updateDir(-1)
                            } else if (i == 0 && dir == -1) {
                                updateI(0)
                                updateDir(1)
                            } else {
                                updateI(i + dir)
                            }
                            return 0 
                        }
                        return prev + scGap 
                    })
                
                }, delay)
            }
        }
    }
}

export interface DimensionProps {
    w : number, 
    h : number 
}

export type UDType = () => DimensionProps

export const useDimension : UDType = () : DimensionProps => {
    const [w, setW] = useState<number>(window.innerWidth)
    const [h, setH] = useState<number>(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
    })
    return {
        w, 
        h
    }
}

export interface CustomStyleProps {
    barStyle : (i : number) => CSSProperties,
    parentStyle : () => CSSProperties
}

export type USType = (a : number, b : number, c : number, d : number, e : number) => CustomStyleProps 

export const useStyle : USType = (w : number, h : number, scale : number, n : number, mainI : number) : CustomStyleProps => {
    const sf : number = Math.sin(scale * Math.PI)
    const size : number = Math.min(w, h) / SIZE_FACTOR
    const background : string = "#42a5f5"
    const position = 'absolute'
    return {
        parentStyle() : CSSProperties {
            const top = `${h / 2}px`
            const left = `${0}px`
            return {
                position, 
                top, 
                left 
            }
        },
        barStyle(i : number) : CSSProperties {
            const top : string = `${-size * (n - 1) * 0.5 + i * size * 0.5}px`
            const left : string = `${(w - size) * sf * (i == mainI ? 1 : 0)}px`
            const width = `${size}px`
            const height = `${size / 2}px`
            return {
                background, 
                width, 
                height, 
                top, 
                left,
                position
            }
        }
    }
}