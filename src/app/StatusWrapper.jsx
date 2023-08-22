import { useContext, useEffect, useState } from "react"
import { mountStatusListener } from "../actions/listen"
import { DbContext } from "../contexts/DbContext"

export const StatusWrapper = ({ children }) => {
    const db = useContext(DbContext)
    const [online, setOnline] = useState(undefined)

    useEffect(() => {
        const obs = mountStatusListener(db, content => {
            setOnline(content)
        });

        return () => {
            obs()
            setOnline(undefined)
        }
    }, [db])

    return(
        /* online state */
        online !== undefined && ( 
            /* online true-false */
            online ? children : <div>
                <h3>El juego ha sido deshabilitado</h3>
                <p>Por favor vuelve al <u>punto de inicio</u> para continuar.</p>
            </div>
        )
    )
}