import { ref, update } from "firebase/database";

export const updateTeam = async (db, teamId, sceneId, locationId) => {
    const res = await update(ref(db, `/progress/${teamId}`), {
        [`/${sceneId}/${locationId}`]: true,
        [`current`]: sceneId,
    }).catch(err => {
        console.error(err)
    });

    return res;
}

export const deleteCurrentScene = async (db, teamId, sceneId) => {
    const res = await update(ref(db, `/progress/${teamId}`), {
        [`current`]: null,
    }).catch(err => {
        console.error(err)
    });

    return res;
}