import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDtVC3VQ1Z8XzQYDkWwnTOC_NFo8ny5c90",
    authDomain: "todomanager-5444a.firebaseapp.com",
    databaseURL: "https://todomanager-5444a.firebaseio.com",
    projectId: "todomanager-5444a",
    storageBucket: "todomanager-5444a.appspot.com",
    messagingSenderId: "254572727152"
};

export const initializeFirebaseApi = () => {
    return firebase.initializeApp(config);
}

export const currentFirebaseUser = () => {
    return new Promise((resolve, reject) => {
        debugger;
        var unsubscribe = null;
        unsubscribe = firebase.auth()
            .onAuthStateChanged((user) => {
                debugger;
                resolve(user);
            }, (error) => {
                reject(error);
            }, () => {
                unsubscribe();
            });
    });
}

export const createUserOnFirebaseAsync = async (email, password) => {
    const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    return user;
}

export const signInOnFirebaseAsync = async (email, password) => {
    const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    return user;
}

export const writeTaskOnFirebaseAsync = async (task) => {
    const user = await currentFirebaseUser();

    var taskReference = firebase
        .database()
        .ref(user.uid);

    const key = taskReference
        .child('tasks')
        .push()
        .key;

    return await taskReference
        .child(`tasks/${key}`)
        .update(task);
}

export const readTasksFromFirebaseAsync = async (listener) => {
    const user = await currentFirebaseUser();

    var tasksReference = firebase
        .database()
        .ref(user.uid)
        .child('tasks');

    tasksReference
        .on('value', (snapshot) => {
            var listOfTasks = [];
            snapshot.forEach((element) => {
                var task = element.val();
                task.key = element.key;

                listOfTasks.push(task);
            });
            listener(listOfTasks);
        });
}
