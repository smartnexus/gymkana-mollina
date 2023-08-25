import { useContext, useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { mountProgressListener } from "../actions/listen"
import { DbContext } from "../contexts/DbContext"

export const Live = () => {
    const { state } = useLocation()
    const [db, status] = useContext(DbContext)
    const [online, setOnline] = useState(false)
    const [data, setData] = useState({
        list: []
    })
    let obs = useRef(() => {})

    useEffect(() => {
        if(!status) {
            setOnline(status)
            obs.current()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    useEffect(() => {
        if(state?.admin && status) {
            obs.current = mountProgressListener(db, content => {
                setOnline(true)
                setData({
                    list: content ? Object.keys(content) : [],
                    content
                })
            }, () => setOnline(false));
        } 

        return () => {
            obs.current()
            setOnline(false)
        }
    }, [db, status, setData, setOnline, state])

    return (state?.admin ?
        <div className="live-obj">
            <h3 className={`${online?'blinking':''}`}>Progreso en directo</h3>
            <div className={`live-box ${online?'':'blinking'}`}>
                <div className='status-circle' style={{backgroundColor: online?'#92c353':'gray'}}/>
                <span>&nbsp;{online?'En línea':'Conectando...'}</span>
            </div>
            {online && (data?.list.length > 0 ? data.list.sort().map((o,i) => (
                <div className="team-box" key={i}>
                    <p>E-{o}</p>
                    <ProgressBar stepInfo={data.content[o]}/>
                </div>
            )): <p>Todavía no hay equipos que hayan comenzado el juego.</p>)}
        </div> : null
    )
}

const ProgressBar = ({ stepInfo }) => {
    const { current, s1, s2, s3, s4 } = stepInfo;
    const sceneList = [s1, s2, s3, s4];

    const getAmountLocations = (obj) => obj ? Object.keys(obj).filter(o => obj?.[o] === true).length : 0;

    return(
        <div className="container">
            <div className="progress-container" style={{gap: '15px'}}>
                {sceneList.map((o,i) => (
                    <div key={i} className={`live-circle ${getAmountLocations(o)===3?'active':''} ${current==='s'+(i+1)?'current':''}`} style={{zIndex: 0}}>{getAmountLocations(o)}</div>    
                ))}
            </div>
        </div>
    )
}