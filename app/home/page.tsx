
import React from 'react'
const page = () => {

  return (
    <>
      {/* HERO */}
      <section className="flex flex-col items-center justify-center py-20 text-center px-4 hero">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-200">
          💌 Welcome to Stranger Letters
        </h1>
        <p className="text-lg text-gray-600 max-w-xl">
          A slow, anonymous, heartfelt messaging platform — write to a stranger
          and receive a letter back.
        </p>

        <div className="mt-8">
          <a
            href="/login"
            className="px-6 py-3 bg-black text-white rounded-lg shadow hover:bg-gray-800 transition"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 bg-gray-100 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Why We Built Stranger Letter
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          In a world full of noise, Stranger Letter is a peaceful corner to say
          what you feel without judgment. We believe small acts of kindness—
          like writing a letter to someone you’ll never meet—can create real
          moments of connection. Whether you're sharing hope, comfort, or a
          simple reminder that someone matters, these letters are proof that
          empathy still exists—and it starts with you.
        </p>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-white text-center ">
        <h2 className="text-3xl font-semibold mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6  py-7">
          <div className="bg-pink-300 rounded-lg shadow-2xl p-6">
            <h2>Step 1: Write</h2>
            <p>
              Share a kind message from the heart. It could be advice,
              encouragement, or a simple reminder that someone cares. Keep it
              real, kind, and honest.
            </p>
          </div>
          <div>
            {" "}
            <h2>Step 2: Send</h2>
            <p>
              Leave your letter where someone might find it— a bench, café, bus
              stop, or even mailed anonymously. Small gestures can make a big
              impact.
            </p>
          </div>
          <div>
            {" "}
            <h2>Step 3: Reflect</h2>
            <p>
              Take a moment to notice how it felt to write. Sometimes, giving to
              others reminds us what we need to hear too.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Start Writing Now</h2>
        <button className="bg-white text-black px-5 py-3 rounded">
          Write a Letter
        </button>
      </section>
    </>
  );
}

export default page