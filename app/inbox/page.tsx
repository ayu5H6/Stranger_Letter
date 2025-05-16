"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";

interface Letter {
  id: string;
  content: string;
  createdAt: any; // Firestore Timestamp
  senderId: string;
  recipientId: string;
  matched: boolean;
  matchedWith?: string;
}

export default function InboxPage() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        console.log("User is logged in:", user.uid);
        fetchInbox(user); // pass user object here
      } else {
        console.log("No user is logged in.");
        setLetters([]);
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  async function fetchInbox(user: User) {
    setLoading(true);
    const now = new Date();
    const cutoff = new Date(now.getTime() - 48 * 60 * 60 * 1000);

    try {
      const q = query(
        collection(db, "letters"),
        where("recipientId", "==", user.uid)
      );
      const snapshot = await getDocs(q);

      const receivedLetters: Letter[] = snapshot.docs
        .map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Letter, "id">) }))
        .filter((letter) => letter.createdAt?.toDate() >= cutoff);

      setLetters(receivedLetters);
    } catch (error) {
      console.error("Error fetching letters:", error);
    }
    setLoading(false);
  }
  return (
    <section className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">📬 Your Inbox</h1>

      {loading ? (
        <p>Loading...</p>
      ) : letters.length === 0 ? (
        <p>No recent letters. Write one to get matched!</p>
      ) : (
        <ul className="space-y-4">
          {letters.map((letter) => (
            <li key={letter.id} className="bg-white p-4 rounded shadow">
              <p className="italic text-gray-700">{letter.content}</p>
              <span className="text-sm text-gray-400">
                Received: {letter.createdAt?.toDate().toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
