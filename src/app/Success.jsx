import React, { useState } from "react";
import { useLocation } from "react-router";
import { Footer } from "./Footer";

export const Success = () => {

    const { state } = useLocation()
    const [end, setEnd] = useState(false)

    const hideNextLoc = () => {
        setEnd(true)
    }

    return(<>
        <div className="success-obj">
            <h3>¡Enhorabuena!</h3>
            <p>Has conseguido acertar el acertijo de la localización.</p> 
            <p>Datos importantes para continuar el juego:</p>
            <hr/>
            <div className="input-wrapper shrink" style={{marginTop: 0}}>
                <p>Pista obtenida en esta localización:</p>
                <input value={state?.hint} disabled></input>
                {!end && <>
                    <p>Siguiente localización:</p>
                    <input value={state?.next} disabled></input>
                </>}
            </div>
            {end && <>
                <hr/>
                <p>Ya has terminado las localizaciones de esta escena, vuelve al <u>punto de inicio</u> para adivinar qué escena es.</p>
            </>}
        </div>
        <div className="footer">
            <Footer teamId={state?.team} sceneId={state?.scene} endCallback={hideNextLoc}/>
        </div></>
    )
}