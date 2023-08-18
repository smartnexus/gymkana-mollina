import { Location } from "./Location";
import { useContext, useEffect } from "react";
import { DbContext } from "../contexts/DbContext";
import { useState } from "react";
import { suspensify } from "../utils";
import { checkLocation, getTeams } from "../actions/read";

export const TeamSelection = ({ id, scene }) => {

    const db = useContext(DbContext);
    const [promise, setPromise] = useState()
    const [request, setRequest] = useState()
    const [team, setTeam] = useState()
    const [err, setErr] = useState()

    useEffect(() => {
        setRequest(suspensify(getTeams(db)))
    }, [db])
    
    const locationDone = promise ? promise.read() : undefined;
    const teamList = request ? request.read() : undefined;

    const checkAnswer = (typed) => {
        if (Object.keys(teamList).includes(typed)) {
            setPromise(suspensify(checkLocation(db, typed, scene, id)))
            setTeam(typed)
        } else 
            setErr('⚠️ Equipo no encontrado')
    }

    const inputObserver = ({ target }) => {
        const { value = '' } = target;
        
        if (value.length === 3) 
            checkAnswer(value)
        else 
            setErr()
    }

    const validation = (event) => {
        if (!/[0-9]/.test(event.key) && event.key !== 'Backspace') {
            event.preventDefault();
        }
    }

    return(teamList !== undefined &&
        (locationDone === undefined ?
        <div className="team-obj">
            <h3>Antes de empezar...</h3>
            <p>Necesitamos que introduzcas el número de tu equipo para guardar vuestro progreso en el juego.</p> 
            <hr/>
            <div className="input-wrapper" style={{marginTop: 0}}>
                <p>Número de tu equipo:</p>
                <input type="tel" maxLength={3} onKeyDownCapture={validation} onChange={inputObserver} autoFocus={true} placeholder="000" style={{width: '33%'}}></input>
            </div>
            {err && <div className="error-box">
                <p>{err}</p>
            </div>}
        </div> : <Result trigger={locationDone} id={id} team={team}/>)
    )
}

const Result = ({ trigger, id, team }) => {
    return(
        !trigger ? <Location id={id} team={team}/> : <div>
            <h3>Este equipo ya ha realizado esta prueba</h3>
            <p>Recuerda que tenéis que ir a la siguiente localización que aparecía en el mensaje que salió al acertar la pregunta.</p>
        </div>
    )
}