import { useEffect } from "react"
import { api } from "../../config/api"


export function Panico(){
    
    async function fetachData(){
        api.get('/panico/')
    }
    
    useEffect(() => {

    }, [])
    return(
        <div>Pânico</div>
    )
}