import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { mountProgressListener } from "../actions/listen"
import { DbContext } from "../contexts/DbContext"

export const Live = () => {
    const { state } = useLocation()
    const db = useContext(DbContext)
    const [online, setOnline] = useState(false)
    const [data, setData] = useState({
        list: []
    })

    useEffect(() => {
        let obs = () => {}
        if(state?.admin) {
            obs = mountProgressListener(db, content => {
                setOnline(true)
                setData({
                    list: content ? Object.keys(content) : [],
                    content
                })
            });
        } 

        return () => {
            obs()
            setOnline(false)
        }
    }, [db, setData, setOnline, state])

    return (state?.admin ?
        <div className="live-obj">
            <h3 className={`${online?'blinking':''}`}>Progreso en directo</h3>
            <div className={`live-box ${online?'':'blinking'}`}>
                <div className='status-circle' style={{backgroundColor: online?'#92c353':'gray'}}/>
                <span>&nbsp;{online?'En línea':'Conectando...'}</span>
            </div>
            {data?.length > 0 ? data.list.sort().map((o,i) => (
                <div className="team-box" key={i}>
                    <p>E-{o}</p>
                    <ProgressBar stepInfo={data.content[o]}/>
                </div>
            )): <p>Todavía no hay equipos que hayan comenzado el juego.</p>}
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