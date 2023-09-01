import React, { useContext, useEffect, useState } from "react"

import { DbContext } from "../contexts/DbContext"
import { getLocation } from "../actions/read";
import { updateTeam } from "../actions/write"
import { suspensify } from "../utils";
import { useNavigate } from "react-router";
import { Footer } from "./Footer";
import { Variables } from "../config/const";

export const Location = ({ id, team }) => {
    const [db] = useContext(DbContext);
    const [promise, setPromise] = useState()
    const navigate = useNavigate()

    const [helper, setHelper] = useState(false)

    useEffect(() => {
        setPromise(suspensify(getLocation(db, id)))
    }, [db, id])
    
    const loc = promise ? promise.read() : undefined

    const listener = () => {
        suspensify(updateTeam(db, team, loc.scene, id))
        navigate('/success', {state: { hint: loc?.hint, next: loc?.next, scene: loc?.scene, team }})
    }

    return(loc !== undefined && <>
        <div className="question-obj">
            {loc !== null ? 
            <>
                <h3>{loc.name}</h3>
                <p>{loc.question}</p>
                <hr/>
                <CustomInput answer={loc.answer} successCallback={listener} helperCallback={() => setHelper(true)}/>
                {helper && <button style={{color: '#f2f2f2'}} className="live-button" onClick={() => window.open(encodeURI('https://wa.me/+34665102012?text=Pista para equipo '+team+': '+loc.question), '_blank')}>Pedir ayuda 💬</button>}
            </>:
            <>
                <h3>Ha ocurrido un error con esta localización</h3>
                <p>Por favor ponte en contacto con los organizadores del evento</p>
            </>}
        </div>
        <Footer teamId={team} sceneId={loc?.scene}/></>
    )
}

const CustomInput = ({ answer = '', successCallback, helperCallback }) => {
    const [fails, setFails] = useState(0)

    const checkAnswer = (typed) => {
        if(typed.toLowerCase() === answer.toLowerCase())
            successCallback()
        else 
            setFails(fails+1);
    }

    useEffect(() => {
        if(fails >= 5)
            helperCallback()
    }, [fails, helperCallback])

    const inputObserver = ({ target }) => {
        const { value = '' } = target;
        if (value.length === answer.length) 
            checkAnswer(value)
    }

    const placeholder = (answer) => {
        if(answer.includes(' ')) {
            const [f,s] = answer.split(' ');
            return `2 palabras (${f.length}+${s.length})`
        } else {
            return `${answer.length} letras`
        }
    }

    return(<>
        {fails > 1 && <p style={{fontSize: '1.2rem', margin: 0}}>Llevas {fails} fallos 😔</p>}
        <div className="input-wrapper">
            <input autoFocus={true} onChange={inputObserver} placeholder={placeholder(answer)} maxLength={answer.length}></input>
        </div>
        <StopWatch helperCallback={helperCallback}/>
    </>
    )

}

const StopWatch = ({ helperCallback }) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let intervalId;
        intervalId = setInterval(() => setTime(time + 1), 1000);
        if(time === Variables.cooldown)
            helperCallback()
        return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time]);

    // Minutes calculation
    const minutes = Math.floor((time % 360) / 60);

    // Seconds calculation
    const seconds = Math.floor((time % 60));

    return(
        <p>⏳ Tiempo transcurrido: {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}</p>
    )
}
