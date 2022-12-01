import { firestore } from "firebase-admin";
import * as admin from 'firebase-admin';
export const firebaseTimestampsConverter = {
    toFirestore: function(doc: any) {
        return  {
                ...doc,
                registered_at: doc.registered_at ? 
                    firestore.Timestamp.fromDate(doc.registered_at instanceof Date ? doc.registered_at :  new Date(doc.registered_at))
                    :
                    firestore.Timestamp.now(),
                updatedAt: firestore.Timestamp.now(),
                created: doc.created ? 
                    firestore.Timestamp.fromDate(doc.created instanceof Date ? doc.created :  new Date(doc.created))
                    :
                    firestore.Timestamp.now(),
            }
    },
    fromFirestore: function(snapshot: firestore.DocumentSnapshot){
        const data = snapshot.data();
        if(data){
            if(data.registered_at)
                data.registered_at = data.registered_at.toDate();
            if(data.created)
                data.created = data.created.toDate();
            if(data.updatedAt)
                data.updatedAt = data.updatedAt.toDate();
        }
        return data;
    }
}

export const setUpdatedTimestamp = (doc: any)=> {
    doc.updatedAt = firestore.Timestamp.now()
    return doc;
}

export const setTimestampToISO = (doc: any) =>{
    if(doc.registered_at)
        doc.registered_at = doc.registered_at.toDate().toISOString()
    if(doc.updatedAt)
        doc.updatedAt = doc.updatedAt.toDate().toISOString()
}

type claimType = "membership" | "userName" | "superadmin"; 
export const updateCustomUserClaim = async (uid: string, claim: claimType, value: number | string) => {
    const user = await admin.auth().getUser(uid);
    const currentClaims: any = {...user.customClaims} || {};
    currentClaims[claim] = value;
    await admin.auth().setCustomUserClaims(uid,currentClaims);
}

export const removeCustomUserClaim = async (uid: string, claim: claimType) => {
    const user = await admin.auth().getUser(uid);
    const currentClaims: any = {...user.customClaims} || {};
    const newClaims: any = {};
    Object.keys(currentClaims).forEach(current_claim => {
        if(current_claim !== claim){
            newClaims[current_claim] = currentClaims[current_claim];
        }
    })
    await admin.auth().setCustomUserClaims(uid,newClaims);
}

export const getCustomUserClaim = async (user: string | admin.auth.UserRecord, claim: claimType) => {
    let currentClaims: any = {};
    if(typeof user === "string"){
        const currentUser = await admin.auth().getUser(user);
        currentClaims =  currentUser.customClaims;
    } else {
        currentClaims =  user.customClaims || {};
    }
    return currentClaims[claim] || null;
}