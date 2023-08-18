import { ref, onValue } from "firebase/database";

export const mountListener = (db, callback) => {
    const progressRef = ref(db, 'progress/');
    const listener = onValue(progressRef, (snapshot) => {
        const data = snapshot.val()
        callback(data)
    })
    return listener
}