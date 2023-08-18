import { useContext, useEffect, useState } from "react";
import { DbContext } from "../contexts/DbContext";
import { suspensify } from "../utils";
import { getLocations } from "../actions/read";

const sceneMap = (id) => {
    switch (id) {
        case 's1':
            return 'Escena 1';
        case 's2':
            return 'Escena 2';
        case 's3':
            return 'Escena 3';
        case 's4':
            return 'Escena 4';
        default:
            return 'Escena inválida';
    }
}

export const Footer = ({ teamId, sceneId, endCallback = () => {} }) => {
    const db = useContext(DbContext);
    const [promise, setPromise] = useState()

    const progress = promise ? promise.read() : undefined
    const step = progress ? Object.keys(progress).filter(o => progress?.[o] === true).length : 0

    useEffect(() => {
        setPromise(suspensify(getLocations(db, teamId, sceneId)))
    }, [db, teamId, sceneId])

    useEffect(() => {
        if (step === 3) 
            endCallback()
    }, [step, endCallback])

    return(
        <div className="footer-body">
            { (sceneId !== 's1' && sceneId !== 's2' && sceneId !== 's3' && sceneId !== 's4') ?
                <div className="footer-text">
                    <p>⚠️ Error al obtener la escena</p>
                </div>:
                <>
                    <div className="footer-text">
                        <p><b>Progreso</b></p>
                        <p>{sceneMap(sceneId)}</p>
                    </div>
                    <ProgressBar step={step}/>
                </>
            }
        </div>
    )
}

const ProgressBar = ({ step = 0 }) => {

    const widthCalculator = (step) => {
        switch (step) {
            case 2:
                return '50%';
            case 3:
                return '100%';
            default:
                return '0%'
        }
    }

    return(
        <div className="container">
            <div className="progress-container">
                <div className="progress" id="progress" style={{width: `${widthCalculator(step)}`}}> </div>
                <div className={`circle ${step>=1?'active':''}`}>1</div>
                <div className={`circle ${step>=2?'active':''}`}>2</div>
                <div className={`circle ${step>=3?'active':''}`}>3</div>
            </div>
        </div>
    )
}