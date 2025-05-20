"use client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import { submitLetter } from "@/lib/letterActions";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp,updateDoc,getDocs,query,where,limit } from "firebase/firestore";
export default function WriteLetterPage() {
  const [letter, setLetter] = useState("");
  const [status, setStatus] = useState("");
  // const [received, setReceived] = useState("");

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

  async function containsBadLanguage(content:string):Promise<boolean> {
    const model=genAI.getGenerativeModel({model:"models/gemini-1.5-flash"});
    const prompt = `Does the following message contain offensive, harmful, or abusive language? Respond with only "yes" or "no":\n\n${content}`;
    const reuslt=await model.generateContent(prompt);
    const text=reuslt.response.text().toLowerCase().trim();
    return text.includes("yes")

  }
  const handleSubmit = async () => {
    setStatus("submitting...");

    try {
      const result = await submitLetter(letter);

      if (result.status === "matched") {
        // setReceived(result.receivedContent);
        setStatus("You got a letter back!");
      } else {
        setStatus("Letter sent! We'll match you soon.");
      }
    } catch (err: any) {
      console.error("Letter submission failed:", err.message);
      setStatus("Error submitting letter: " + err.message);
    }
  };

  async function submitLetter(
    content: string
  ): Promise<{ status: string; receivedContent?: string }> {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in.");

    const isAbusive = await containsBadLanguage(content);
    if (isAbusive) {
      throw new Error("Your letter contains abusive or harmful language");
    }

    // Try to find an unmatched letter that isn't by this user
    const snapshot = await getDocs(
      query(
        collection(db, "letters"),
        where("matched", "==", false),
        where("senderId", "!=", user.uid),
        limit(1)
      )
    );

    if (!snapshot.empty) {
      const docToMatch = snapshot.docs[0];
      const matchedLetter = docToMatch.data();

      // Update matched letter
      await updateDoc(docToMatch.ref, {
        recipientId: user.uid,
        matched: true,
      });

      // Save current letter as matched
      await addDoc(collection(db, "letters"), {
        content,
        senderId: user.uid,
        recipientId: matchedLetter.senderId,
        createdAt: serverTimestamp(),
        matched: true,
      });

      return { status: "matched", receivedContent: matchedLetter.content };
    }

    // No match found — store letter for future match
    await addDoc(collection(db, "letters"), {
      content,
      senderId: user.uid,
      recipientId: null,
      createdAt: serverTimestamp(),
      matched: false,
    });

    return { status: "waiting" };
  }
  
  return (
    <section className="max-w-xl mx-auto py-16 px-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-100">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center justify-center">
            <span className="mr-3 text-2xl">✉️</span>
            Write Your Letter
          </h1>
          <p className="text-gray-600 mt-2 text-center">Share your thoughts anonymously</p>
        </div>

        <div className="p-8">
          <div className="relative mb-6">
            <textarea
              className="w-full min-h-64 p-5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Write from the heart... Your message will be delivered to someone who might need to hear exactly what you have to say."
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              style={{ resize: "vertical" }}
            />

            <div className="absolute bottom-4 right-4 text-gray-400 text-sm">
              {letter.length} characters
            </div>
          </div>

          <div className="flex flex-col items-center">
            <button
              className="bg-accent/60 hover:bg-accent/80 text-white font-medium px-8 py-3 rounded-lg transition-colors transform hover:scale-105 flex items-center justify-center shadow-sm"
              onClick={handleSubmit}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Send My Letter
            </button>

            {status && (
              <div
                className={`mt-6 py-3 px-4 rounded-lg text-sm ${
                  status.includes("sent")
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {status.includes("sent") ? (
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {status}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    {status}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center">
          <p className="text-gray-500 text-sm">
            Your letter will be shared anonymously with another user
          </p>
        </div>
      </div>
    </section>
  );
}
