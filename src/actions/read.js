import { ref, child, get } from "firebase/database";

export const getLocation = async (db, locationId) => {
    const snapshot = await get(child(ref(db), `locations/${locationId}`)).catch(err => {
        console.error(err)
    });
    
    return snapshot.val()
}

export const checkLocation = async (db, teamId, sceneId, locationId) => {
    const snapshot = await get(child(ref(db), `progress/${teamId}`)).catch(err => {
        console.error(err)
    });
    const value = snapshot.val()

    /* True if team has done already this location */
    const passedLoc = value?.[sceneId]?.[locationId]; 
    let sceneMatch = true;
    const current = value?.current;
    if (current !== undefined && current !== sceneId)
       sceneMatch = false; 

    return { available: !passedLoc, sceneMatch }
}

export const getTeams = async (db) => {
    const snapshot = await get(child(ref(db), `teams`)).catch(err => {
        console.error(err)
    });

    return snapshot.val()
}

export const getLocations = async (db, teamId, sceneId) => {
    const snapshot = await get(child(ref(db), `progress/${teamId}/${sceneId}`)).catch(err => {
        console.error(err)
    });

    return snapshot.val()
}

