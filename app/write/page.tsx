"use client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import { submitLetter } from "@/lib/letterActions";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
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

  async function submitLetter(content:string): Promise<{status:string}>{
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in.");
    const isAbusive = await containsBadLanguage(content);
    if (isAbusive) {
      throw new Error("Your letter contains abusive or harmful language");
    }
    // Proceed with Firestore logic
    await addDoc(collection(db, "letters"), {
      content,
      senderId: user.uid,
      recipientId: null, // matching logic to be handled separately
      createdAt: serverTimestamp(),
      matched: false,
    });

    return { status: "waiting" };
  }

  return (
    <section className="max-w-xl mx-auto py-20 px-4 text-center">
      <h1 className="text-3xl font-bold mb-6">Write Your Letter</h1>
      <textarea
        className="w-full h-40 p-4 border rounded mb-4"
        placeholder="Write from the heart..."
        value={letter}
        onChange={(e) => setLetter(e.target.value)}
      />
      <br />
      <button
        className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
        onClick={handleSubmit}
      >
        Send Letter
      </button>
      <p className="mt-4 text-gray-600">{status}</p>

      {/* {received && (
        <div className="mt-6 p-4 border bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-2">You received a letter:</h2>
          <p className="italic">{received}</p>
        </div>
      )} */}
    </section>
  );
}
