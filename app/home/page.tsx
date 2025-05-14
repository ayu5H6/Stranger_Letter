import React from 'react'

const page = () => {
  return (
    <section className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
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
  );
}

export default page