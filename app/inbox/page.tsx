"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  addDoc,
  serverTimestamp,
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
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [sentReplies, setSentReplies] = useState<Set<string>>(new Set());

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
        where("recipientId", "==", user.uid),
        orderBy("createdAt", "desc")
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

  async function sendReply(letter: Letter) {
    if (!replyContent.trim()) return;

    const user = auth.currentUser;
    if (!user) return alert("User not logged in");

    try {
      await addDoc(collection(db, "letters"), {
        senderId: user.uid,
        recipientId: letter.senderId,
        content: replyContent,
        createdAt: serverTimestamp(),
        matched: false, // or true if needed
      });

      // Mark this letter as replied
      setSentReplies(new Set(sentReplies).add(letter.id));
      setReplyingTo(null);
      setReplyContent("");
    } catch (e) {
      console.error("Error sending reply:", e);
    }
  }
  return (
    <section className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">📬 Your Inbox</h1>

      {loading ? (
        <p>Loading...</p>
      ) : letters.length === 0 ? (
        <p>No recent letters. Write one to get matched!</p>
      ) : (
        <ul className="">
          {letters.map((letter) => (
            <li key={letter.id} className="bg-red-200 p-6 border-4 mt-4">
              <p className="">{letter.content}</p>
              <small>{letter.createdAt?.toDate().toLocaleString()}</small>

              {sentReplies.has(letter.id) ? (
                <p className="text-green-600">Replied ✅</p>
              ) : (
                <>
                  {replyingTo === letter.id ? (
                    <>
                      <textarea className="bg-gray-300"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        rows={3}
                        placeholder="Write your reply..."
                      />
                      <button onClick={() => sendReply(letter)}>Send</button>
                      <button onClick={() => setReplyingTo(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button className="ml-4 bg-blue-300 p-2" onClick={() => setReplyingTo(letter.id)}>
                      Reply
                    </button>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
