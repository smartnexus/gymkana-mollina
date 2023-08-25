import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import { suspensify } from "../utils";
import { deleteCurrentScene } from "../actions/write";
import { DbContext } from "../contexts/DbContext";
import { StatusWrapper } from "./StatusWrapper";
import { Variables } from "../config/const";

export const Success = () => {
    const { state } = useLocation()

    const [db] = useContext(DbContext)
    const [end, setEnd] = useState(false)

    const hideNextLoc = () => {
        setEnd(true)
    }

    const valid = state?.team && state?.scene && state?.hint && state?.next; 

    useEffect(() => {
        if(end)
            suspensify(deleteCurrentScene(db, state?.team, state?.scene))
    }, [db, end, state])

    return(state?.scene === Variables.demoLocationId ? <SucessContent state={state} valid={valid} end={end} hideNextLoc={hideNextLoc}/> :
        <StatusWrapper>
            <SucessContent state={state} valid={valid} hideNextLoc={hideNextLoc} end={end}/>
        </StatusWrapper>
    )
}

const SucessContent = ({ valid, state, hideNextLoc, end }) => (
    valid ? <>
    <div className="success-obj">
        <h3>¡Enhorabuena!</h3>
        <p>Has conseguido acertar el acertijo de la localización.</p> 
        <p>Datos importantes para continuar el juego:</p>
        <hr/>
        <div className="input-wrapper shrink" style={{marginTop: 0}}>
            <p>Pista obtenida en esta localización:</p>
            <input value={state?.hint} readOnly></input>
            {!end && <>
                <p>Siguiente localización:</p>
                <input value={state?.next} readOnly></input>
            </>}
        </div>
        {end && <>
            <hr/>
            <p>Ya has terminado las localizaciones de esta escena, vuelve al <u>punto de inicio</u> para adivinar qué escena es.</p>
        </>}
    </div>
    <Footer teamId={state?.team} sceneId={state?.scene} endCallback={hideNextLoc}/>
    </> : null
)