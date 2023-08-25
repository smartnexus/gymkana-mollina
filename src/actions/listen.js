import { ref, onValue } from "firebase/database";

export const mountProgressListener = (db, callback, cancel) => {
    const progressRef = ref(db, 'progress/', cancel);
    const listener = onValue(progressRef, (snapshot) => {
        const data = snapshot.val()
        callback(data)
    })
    return listener
}

export const mountStatusListener = (db, callback, cancel) => {
    const progressRef = ref(db, 'enabled/', cancel);
    const listener = onValue(progressRef, (snapshot) => {
        const data = snapshot.val()
        callback(data)
    })
    return listener
}