import { ref, child, get } from "firebase/database";

export const getLocation = async (db, locationId) => {
    const snapshot = await get(child(ref(db), `locations/${locationId}`)).catch(err => {
        console.error(err)
    });
    
    return snapshot.val()
}

export const checkLocation = async (db, teamId, locationId) => {
    const snapshot = await get(child(ref(db), `progress/${teamId}/${locationId}`)).catch(err => {
        console.error(err)
    });
    
    return snapshot.val()
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

