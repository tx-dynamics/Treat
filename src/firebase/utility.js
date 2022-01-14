import firestore from '@react-native-firebase/firestore';
import { setCover } from 'src/redux/actions/authAction';
import { useDispatch } from "react-redux";

export async function saveData(collection, doc, jsonObject) {
    firestore().collection(collection).doc(doc).set(jsonObject, {merge: true})
    .then(function() {
      async () => {
        console.log('Document successfully written!');
        return true;
      };
    })
    .catch(function(error) {
      console.log("received", collection, doc,jsonObject)
      console.error('Error writing document: ', error);

    });
}

export async function saveFvrtsData(collection, doc, jsonObject) {
  
  firestore().collection(collection).doc(doc).set({media: firestore.FieldValue.arrayUnion(jsonObject)}, {merge: true})
  .then(function() {
    async () => {
      console.log('Document successfully written!');
      return true;
    };
  })
  .catch(function(error) {
    console.log("received", collection, doc,jsonObject)
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
        .then(function(doc) {
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
        .then(function(doc) {
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
    querySnapshot.forEach(function(doc) {
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
    let data = await firestore().collection(collection).doc(doc1).get().then(function(doc){
      if (doc.exists) {
        return doc.data();
      } else {
        return false;
      }
    });
     return data;
    // dispatch(setCover(data))
  }