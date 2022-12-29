import {useState, useEffect} from 'react'

export interface AnimatedScaleProps {
    scale : number, 
    start : () => void 
}
export const useAnimatedScale = (scGap : number = 0.01, delay : number = 20, n : number = 4) : AnimatedScaleProps => {
    const [scale, setScale] = useState<number>(0)
    const [animated, setAnimated] = useState<boolean>(false)
    const [i, setI] = useState<number>(0)
    const [dir, setDir] = useState<number>(1)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) : number => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            setI((prevI : number) : number => {
                                if (prevI === n) {
                                    setDir(-1)
                                    return n - 1
                                }
                                if (prevI == 0) {
                                    setDir(1)
                                    return 1 
                                }
                                return prevI + dir 
                            })
                            return 0 
                        }
                        return prev + scGap 
                    })
                
                }, delay)
            }
        }
    }
}