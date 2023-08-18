import { ref, update } from "firebase/database";

export const updateTeam = async (db, teamId, sceneId, locationId) => {
    const res = await update(ref(db, `/progress/${teamId}/${sceneId}`), {
        [locationId]: true,
    }).catch(err => {
        console.error(err)
    });

    return res;
}