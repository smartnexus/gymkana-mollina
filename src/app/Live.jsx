import { useState } from "react"
import { useLocation } from "react-router-dom"

const list = [382, 401, 569, 284, 742, 632, 105]

export const Live = () => {
    const { state } = useLocation()
    const [online, setOnline] = useState(false)

    return ( state?.admin &&
        <div className="live-obj">
            <h3 className={`${online?'blinking':''}`}>Progreso en directo</h3>
            <div className={`live-box ${online?'':'blinking'}`}>
                <div className='status-circle' style={{backgroundColor: online?'#92c353':'gray'}}/>
                <span>&nbsp;{online?'En línea':'Conectando...'}</span>
            </div>
            {list.sort().map((o,i) => (
                <div className="team-box" key={i}>
                    <p>E-{o}</p>
                    <ProgressBar step={4}/>
                </div>
            ))}
        </div>
    )
}

const ProgressBar = ({ step = 0 }) => {

const widthCalculator = (step) => {
    switch (step) {
        case 2:
            return '40%';
        case 3:
            return '60%';
        case 4:
            return '90%';
        default:
            return '0%'
    }
}

return(
    <div className="container">
        <div className="progress-container">
            <div className="progress" id="progress" style={{width: `${widthCalculator(step)}`, zIndex: 0}}> </div>
            <div className={`circle ${step>=1?'active':''}`} style={{zIndex: 0}}>1</div>
            <div className={`circle ${step>=2?'active':''}`} style={{zIndex: 0}}>2</div>
            <div className={`circle ${step>=3?'active':''}`} style={{zIndex: 0}}>3</div>
            <div className={`circle ${step>=4?'active':''}`} style={{zIndex: 0}}>4</div>
        </div>
    </div>
)
}