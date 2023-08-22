import { Location } from "./Location";
import { useContext, useEffect } from "react";
import { DbContext } from "../contexts/DbContext";
import { useState } from "react";
import { suspensify } from "../utils";
import { checkLocation, getTeams } from "../actions/read";
import { Variables } from "../config/const";

export const TeamSelection = ({ id, scene }) => {

    const db = useContext(DbContext);
    const [promise, setPromise] = useState()
    const [team, setTeam] = useState()
    
    const locationDone = promise ? promise.read() : undefined;

    const handleTeamSelection = (teamId) => {
        setPromise(suspensify(checkLocation(db, teamId, scene, id)))
        setTeam(teamId)
    }

    return(locationDone === undefined ?
        <TeamsForm id={id} teamCallback={handleTeamSelection}/> : <Result trigger={locationDone} id={id} team={team}/>
    )
}

const TeamsForm = ({ id, teamCallback }) => {
    const db = useContext(DbContext);
    const [promise, setPromise] = useState()
    const [err, setErr] = useState()

    const teamList = promise ? promise.read() : undefined;
    const [staffTeam] = teamList ? Object.keys(teamList).filter(o => teamList[o] === Variables.staffTeam) : [null];

    useEffect(() => {
        setPromise(suspensify(getTeams(db)))
    }, [db])

    const checkAnswer = (typed) => {
        if (Object.keys(teamList).includes(typed)) {
            if (id === Variables.demoLocationId) {
                if (typed === staffTeam)
                    teamCallback(typed)
                else
                    setErr('⚠️ Esta prueba no esta disponible para este equipo')
            } else {
                teamCallback(typed)
            }                 
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
        </div> 
    )
}

const Result = ({ trigger, id, team }) => (
    /* Team has not completed this location */
    trigger?.available ? (
        /* Location scene and team current scene are the same */
        trigger?.sceneMatch ? 
            <Location id={id} team={team}/> :
            <div>
                <h3>Esta localización no se encuentra desbloqueada aún</h3>
                <p>Recuerda que tenéis que completar todas las localizaciones de una escena para desbloquear las demás.</p>
            </div>
        ) : 
    <div>
        <h3>Este equipo ya ha realizado esta prueba</h3>
        <p>Recuerda que tenéis que ir a la siguiente localización que aparecía en el mensaje que salió al acertar la pregunta.</p>
    </div>
)
