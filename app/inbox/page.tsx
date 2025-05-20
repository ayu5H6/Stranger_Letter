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
import { useRouter } from "next/navigation";
interface Letter {
  id: string;
  content: string;
  createdAt: any; // Firestore Timestamp
  senderId: string;
  recipientId: string;
  matched: boolean;
  matchedWith?: string;
}
import Link from "next/link";
export default function InboxPage() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [sentReplies, setSentReplies] = useState<Set<string>>(new Set());
   const router=useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        console.log("User is logged in:", user.uid);
        fetchInbox(user); // pass user object here
      } else {
        console.log("No user is logged in.");
    router.push("/login")
        setLetters([]);
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

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
    // <section className="max-w-2xl mx-auto py-10 px-4 min-h-screen">
    //   <h1 className="text-3xl font-bold mb-6">📬 Your Inbox</h1>

    //   {loading ? (
    //     <p>Loading...</p>
    //   ) : letters.length === 0 ? (
    //     <p>No recent letters. Write one to get matched!</p>
    //   ) : (
    //     <ul className="">
    //       {letters.map((letter) => (
    //         <li key={letter.id} className="bg-red-200 p-6 border-4 mt-4">
    //           <p className="">{letter.content}</p>
    //           <small>{letter.createdAt?.toDate().toLocaleString()}</small>

    //           {sentReplies.has(letter.id) ? (
    //             <p className="text-green-600">Replied ✅</p>
    //           ) : (
    //             <>
    //               {replyingTo === letter.id ? (
    //                 <>
    //                   <textarea className="bg-gray-300"
    //                     value={replyContent}
    //                     onChange={(e) => setReplyContent(e.target.value)}
    //                     rows={3}
    //                     placeholder="Write your reply..."
    //                   />
    //                   <button onClick={() => sendReply(letter)}>Send</button>
    //                   <button onClick={() => setReplyingTo(null)}>
    //                     Cancel
    //                   </button>
    //                 </>
    //               ) : (
    //                 <button className="ml-4 bg-blue-300 p-2" onClick={() => setReplyingTo(letter.id)}>
    //                   Reply
    //                 </button>
    //               )}
    //             </>
    //           )}
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </section>

    <section className="max-w-3xl mx-auto py-12 px-6 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <span className="mr-2">📬</span> Your Inbox
        </h1>
        <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium border border-blue-100">
          Anonymous Letters
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-gray-200 h-16 w-16 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      ) : letters.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
          <div className="text-5xl mb-4">📝</div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            Your inbox is empty
          </h3>
          <p className="text-gray-500 mb-6">
            Write a letter to get matched with someone!
          </p>
          <Link href="/write">
            {" "}
            <button className="bg-accent/60 hover:bg-accent/80 cursor-pointer text-white font-medium px-6 py-3 rounded-lg transition-colors">
              Write a New Letter
            </button>
          </Link>
        </div>
      ) : (
        <ul className="space-y-6">
          {letters.map((letter) => (
            <li
              key={letter.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <div className="prose">
                  <p className="text-gray-800 whitespace-pre-line">
                    {letter.content}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <small className="text-gray-500 font-medium">
                    {letter.createdAt?.toDate().toLocaleString()}
                  </small>

                  {sentReplies.has(letter.id) ? (
                    <span className="flex items-center text-green-600 font-medium">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Replied
                    </span>
                  ) : null}
                </div>
              </div>

              {!sentReplies.has(letter.id) && (
                <div className="bg-gray-50 px-6 py-4">
                  {replyingTo === letter.id ? (
                    <div className="space-y-4">
                      <textarea
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        rows={4}
                        placeholder="Write your thoughtful reply..."
                      />
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => setReplyingTo(null)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => sendReply(letter)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                        >
                          Send Reply
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setReplyingTo(letter.id)}
                      className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                        />
                      </svg>
                      Reply to this letter
                    </button>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
