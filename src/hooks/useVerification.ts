import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { Options, Status } from "@/interfaces/onboardingInterface"

//Debouncing set for 600ms
export const useVerification = ({ value, urlBuilder, delay = 600, enabled = true}: Options) => {
    const [status, setStatus] = useState<Status>("idle")
    const controllerRef = useRef<AbortController | null>(null)
    const cacheRef = useRef<Record<string, Status>>({})

    useEffect(() => {
        if(!enabled) return
        const trimmed = value.trim()
        if(!trimmed){
            setStatus("idle")
            return
        }
        //Already cached
        if(cacheRef.current[trimmed]){
            setStatus(cacheRef.current[trimmed])
            return
        }
        setStatus("checking")
        const timer = setTimeout(async () => {
            try {
                //Cancel previous request
                controllerRef.current?.abort()
                controllerRef.current = new AbortController()

                const response = await axios.get(urlBuilder(trimmed), {
                    signal: controllerRef.current.signal,
                })
              
                if(response.status === 200){
                    cacheRef.current[trimmed] = "valid"
                    setStatus("valid")
                }

            } 
            catch(err: any){
                if(axios.isCancel(err)) return
                if(err.response?.status === 404){
                    cacheRef.current[trimmed] = "invalid"
                    setStatus("invalid")
                }
                else {
                    cacheRef.current[trimmed] = "idle"
                    setStatus("idle")
                }
            }
        }, delay)

        return () => {
            clearTimeout(timer)
            controllerRef.current?.abort()
        }
    }, [value, enabled])
    return status
}