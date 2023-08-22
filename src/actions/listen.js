import { ref, onValue } from "firebase/database";

export const mountProgressListener = (db, callback) => {
    const progressRef = ref(db, 'progress/');
    const listener = onValue(progressRef, (snapshot) => {
        const data = snapshot.val()
        callback(data)
    })
    return listener
}

export const mountStatusListener = (db, callback) => {
    const progressRef = ref(db, 'enabled/');
    const listener = onValue(progressRef, (snapshot) => {
        const data = snapshot.val()
        callback(data)
    })
    return listener
}