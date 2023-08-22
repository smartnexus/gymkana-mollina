import { useContext, useEffect, useState } from "react";
import { DbContext } from "../contexts/DbContext";
import { useParams } from "react-router";
import { suspensify } from "../utils";
import { getLocation } from "../actions/read";
import { TeamSelection } from "./TeamSelection";
import { StatusWrapper } from "./StatusWrapper";

export const Scene = () => {
    const { id } = useParams();

    const db = useContext(DbContext);
    const [promise, setPromise] = useState();

    useEffect(() => {
        setPromise(suspensify(getLocation(db, id)))
    }, [db, id])
    
    const location = promise ? promise.read() : undefined;

    return(
        <StatusWrapper>
            {/* Loading state */
            location !== undefined && ( 
                /* Location exists */
                location !== null ? (
                    /* Location has valid info */ 
                    location?.scene ? 
                    <TeamSelection scene={location?.scene} id={id}/>:<InvalidLocation/>
                ):<NotFound/>
            )}
        </StatusWrapper>
    )
}

const InvalidLocation = () => (
    <div>
        <h3>Este localización no es válida</h3>
        <p>Por favor avisa a alguno de los organizadores del juego antes de continuar.</p>
    </div>
)

const NotFound = () => (
    <div>
        <h3>Esta localización no existe</h3>
        <p>Si esto es un error, avisa a alguno de los organizadores del juego antes de continuar.</p>
    </div>
)