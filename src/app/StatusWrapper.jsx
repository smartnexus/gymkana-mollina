import { useContext, useEffect, useRef, useState } from "react"
import { mountStatusListener } from "../actions/listen"
import { DbContext } from "../contexts/DbContext"

export const StatusWrapper = ({ children }) => {
    const [db, status] = useContext(DbContext)
    const [online, setOnline] = useState(undefined)
    let obs = useRef(() => {})

    useEffect(() => {
        if(!status) {
            setOnline(status)
            obs.current()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    useEffect(() => {
        if (status) {
            obs.current = mountStatusListener(db, content => {
                setOnline(content)
            }, () => setOnline(undefined));
        }

        return () => {
            obs.current()
            setOnline(undefined)
        }
    }, [db, status])

    return(
        /* online state */
        online !== undefined && ( 
            /* online true-false */
            online ? children : <div>
                <h3 className="blinking">El juego ha sido pausado</h3>
                <p>Por favor vuelve al <u>punto de inicio</u> para recibir las instrucciones de los organizadores del juego.</p>
            </div>
        )
    )
}