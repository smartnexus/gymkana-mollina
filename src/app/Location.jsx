import React, { useContext, useEffect, useState } from "react"

import { DbContext } from "../contexts/DbContext"
import { getLocation } from "../actions/read";
import { updateTeam } from "../actions/write"
import { suspensify } from "../utils";
import { useNavigate } from "react-router";
import { Footer } from "./Footer";

export const Location = ({ id, team }) => {
    const [db] = useContext(DbContext);
    const [promise, setPromise] = useState()
    const navigate = useNavigate()

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
                <CustomInput answer={loc.answer} successCallback={listener}/>
            </>:
            <>
                <h3>Ha ocurrido un error con esta localización</h3>
                <p>Por favor ponte en contacto con los organizadores del evento</p>
            </>}
        </div>
        <Footer teamId={team} sceneId={loc?.scene}/></>
    )
}

const CustomInput = ({ answer = '', successCallback }) => {

    const checkAnswer = (typed) => {
        if(typed.toLowerCase() === answer.toLowerCase())
            successCallback()
    }

    const inputObserver = ({ target }) => {
        const { value = '' } = target;
        if (value.length === answer.length) 
            checkAnswer(value)
    }

    return(
        <div className="input-wrapper">
            <input autoFocus={true} onChange={inputObserver} placeholder={`${answer.length} letras`} maxLength={answer.length}></input>
        </div>
    )
}
