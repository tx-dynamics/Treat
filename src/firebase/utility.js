import firestore from '@react-native-firebase/firestore';
import { setCover } from 'src/redux/actions/authAction';
import { useDispatch } from "react-redux";
import auth from '@react-native-firebase/auth';

// import storage from '@react-native-firebase/storage';


export async function uploadImage(uri) {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref =  storage()
      .ref('profile')
      .child(uuid.v4());
    const task = ref.put(blob);
    return new Promise((resolve, reject) => {
      task.on(
        'state_changed',
        () => {},
        err => {
          reject(err);
        },

        async () => {
          const url = await task.snapshot.ref.getDownloadURL();
          resolve(url);
        },
      );
    });
  } catch (err) {
    console.log('uploadImage error: ' + err.message);
  }
}


export async function saveData(collection, doc, jsonObject) {
  firestore().collection(collection).doc(doc).set(jsonObject, { merge: true })
    .then(function () {
      async () => {
        console.log('Document successfully written!');
        return true;
      };
    })
    .catch(function (error) {
      console.log("received", collection, doc, jsonObject)
      console.error('Error writing document: ', error);

    });
}

export function getData(collection, doc, objectKey) {
  // check if data exists on the given path
  if (objectKey === undefined) {
    return firestore()
      .collection(collection)
      .doc(doc)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          return doc.data();
        } else {
          return false;
        }
      });
  } else {
    return firestore()
      .collection(collection)
      .doc(doc)
      .get()
      .then(function (doc) {
        if (doc.exists && doc.data()[objectKey] != undefined) {
          return doc.data()[objectKey];
        } else {
          return false;
        }
      });
  }
}

export async function getAllOfCollection(collection) {

  // let data = [];
  let data = "";

  // let querySnapshot = await firestore().collection(collection).get();
  let querySnapshot = await firestore().collection(collection).get();

  // console.log("QuerySnapshot", querySnapshot)
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      // data.push(doc.data());
      data = doc.data()
    } else {
      console.log('No document found!');
    }
  });
  // console.log(data);
  return data;
  // dispatch(setCover(data))
}

export async function getListing(collection, doc1) {
  console.log(collection, doc1)
  let data = await firestore().collection(collection).doc(doc1).get().then(function (doc) {
    if (doc.exists) {
      return doc.data() ;
    } else {
      return false;
    }
  });
  return data;
}

export async function getFvrtsListing(collection, doc1) {

  console.log(collection, doc1)
  let data = [];
  await firestore().collection(collection).doc(doc1).get().then(function (doc) {
    if (doc.exists) {
     doc.data().media.forEach(function(doc) {
      data.push(doc)
      })
      // data = doc.data().media;
      // return doc.data().media.randomNumber ;
    } else {
      return false;
    }
  });
  return data;
}

export async function getAllOptions(collection) {
  console.log(collection)
  let data = [];
  let querySnapshot = await firestore().collection(collection).get();
    // console.log("QuerySnapshot", querySnapshot)
  querySnapshot.forEach(function(doc) {
    if (doc.exists) {
      //console.log(doc.data());
      data.push(doc.data().pageHeading);
    } else {
      console.log('No document found!');
    }
  });
  return data;
}

export async function passwordReset(email) {
  return auth().sendPasswordResetEmail(email);
}

export async function saveFvrtsData(collection, doc, jsonObject, cond) {
  console.log("jsonObject",cond)
  
  if (cond === "update" ) {
    console.log("Update")
    console.log(jsonObject)
  }
  else{
    console.log("Insert")
    firestore().collection(collection).doc(doc).set({media:jsonObject}, { merge: true })
    .then(function () {
      async () => {
        console.log('Document successfully written!');
        return true;
      };
    })
  }
  }

  
export async function addToArray(collection, doc, array, value) {
  console.log(collection,doc,array,value)
      await firestore().collection(collection)
      .doc(doc)
      .set({
        [array]: firestore.FieldValue.arrayUnion(value),
      },{merge: true});
}