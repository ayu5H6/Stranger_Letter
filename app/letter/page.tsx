"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { timeStamp } from "console";

export default function Letter() {
  const [letter, setLetter] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!letter.trim()) {
      alert("Please write something");
      return;
    }

    try {
      await addDoc(collection(db, "letters"), {
        content: letter.trim(),
        timeStamp: serverTimestamp(),
        matched: false,
      });
      setLetter("");
      alert("Letter sent to the universe !");
    } catch (error) {
      console.log("Error sending letter:", error);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-100 flex items-center justify-center p-4 ">
      <form
        onClick={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl"
      >
        <h1 className="text-2xl text-center mb-4">Write a letter</h1>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3  text-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 "
          rows={10}
          placeholder="Dear Stranger..."
          value={letter}
          onChange={(e) => setLetter(e.target.value)}
        />
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Send Letter
        </button>
      </form>
    </main>
  );
}
