import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import {auth,db} from "./firebase";

export async function submitLetter(content: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const q = query(collection(db, "letters"), where("matched", "==", false));
  const snapshot = await getDocs(q);

  
  if (!snapshot.empty) {
    const match = snapshot.docs[0];
    const matchId = match.id;
    const matchData = match.data();

    const newLetterRef = await addDoc(collection(db, "letters"), {
      senderId: user.uid,
      content,
      createdAt: serverTimestamp(),
      matched: true,
      matchedWith: matchId,
      recipientId: matchData.senderId,
    });

    await updateDoc(doc(db, "letters", matchId), {
      matched: true,
      matchedWith: newLetterRef.id,
      recipientId: user.uid,
    });

    return {
      status: "matched",
      receivedContent: matchData.content,
    };
  } else {
    await addDoc(collection(db, "letters"), {
      senderId: user.uid,
      content,
      createdAt: serverTimestamp(),
      matched: false,
    });

    return { status: "waiting" };
  }
}