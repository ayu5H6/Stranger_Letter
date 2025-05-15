"use client";

import { useState } from "react";
import { submitLetter } from "@/lib/letterActions";
import { auth} from "@/lib/firebase";

export default function WriteLetterPage() {
  const [letter, setLetter] = useState("");
  const [status, setStatus] = useState("");
  const [received, setReceived] = useState("");

  const handleSubmit = async () => {
    setStatus("submitting...");
    

    try {
        console.log("Current Firebase user:", auth.currentUser);
      const result = await submitLetter(letter);

      if (result.status === "matched") {
        setReceived(result.receivedContent);
        setStatus("You got a letter back!");
      } else {
        setStatus("Letter sent! We'll match you soon.");
      }
    } catch (err: any) {
      console.error("Letter submission failed:", err.message);
      setStatus("Error submitting letter: " + err.message);
    }
  };

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

      {received && (
        <div className="mt-6 p-4 border bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-2">You received a letter:</h2>
          <p className="italic">{received}</p>
        </div>
      )}
    </section>
  );
}
