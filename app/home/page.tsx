import { Pen,Send,MessageCircleCode,Heart,Mail,Star } from 'lucide-react';
import React from 'react'

import { Cookie } from 'next/font/google';

const cookie = Cookie({
  subsets: ["latin"],
  weight: "400",
});
const page = () => {

  return (
    <>
      {/* HERO */}
      <section
        id="about"
        className="flex flex-col items-center justify-center py-32 text-center px-4 relative bg-secondary/10 "
      >
        <div className="hidden md:block absolute bottom-10 right-10 opacity-40 text-primary">
          <Heart size={60} />
        </div>

        <div className="hidden md:block absolute top-10 left-10 opacity-50 text-accent ">
          {" "}
          <Mail size={60} />
        </div>
        <div className="hidden md:block absolute top-36 right-1/4 text-secondary ">
          {" "}
          <Star size={40} />
        </div>

        <h1
          className={`${cookie.className} text-5xl md:text-7xl font-bold mb-6 text-black `}
        >
          Welcome to Stranger Letters
        </h1>
        <p className="text-lg md:text-xl text-black max-w-xl">
          A slow, anonymous, heartfelt messaging platform — write to a stranger
          and receive a letter back.
        </p>

        <div className="mt-10 space-x-4">
          <a
            href="/login"
            className="py-3 px-3 md:px-8 md:py-4 bg-primary hover:bg-accent text-white rounded-lg shadow-lg transition transform md:hover:scale-105 inline-flex items-center"
          >
            <Pen size={18} className="mr-2" />
            Get Started
          </a>
          <a
            href="#how-it-works"
            className="py-3 px-3 md:px-8 md:py-4 bg-white hover:bg-gray-100 text-primary border border-primary rounded-lg shadow transition transform md:hover:scale-105"
          >
            Learn More
          </a>
        </div>
      </section>
      {/* ABOUT */}
      <section  className="py-20 bg-gray-50 px-6 text-center ">
        <div className="border-2 border-gray-300 mx-auto py-8 max-w-3xl shadow-black shadow-sm rounded-xl">
          <h2 className=" text-2xl  md:text-3xl text-gray-800 font-semibold mb-4 ">
            Why We Built <span className="text-primary">Stranger Letter</span>
          </h2>
          <p className="text-sm md:max-w-2xl mx-auto text-gray-600 md:text-lg leading-relaxed">
            In a world full of noise, Stranger Letter is a peaceful corner to
            say what you feel without judgment. We believe small acts of
            kindness— like writing a letter to someone you’ll never meet—can
            create real moments of connection. Whether you're sharing hope,
            comfort, or a simple reminder that someone matters, these letters
            are proof that empathy still exists—and it starts with you.
          </p>
          <div className="mt-6 flex justify-center">
            <Heart size={32} className="text-red-400" />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-secondary/10 text-center">
        <h2 className="text-4xl font-semibold mb-2 text-gray-800 fade-in">
          How It Works
        </h2>
        <p className="text-gray-600 mb-16 max-w-xl mx-auto fade-in">
          Three simple steps to spread kindness through written words
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 relative max-w-6xl mx-auto">
          {/* Step connector lines (visible on md screens and up) */}
          {/* <div className="hidden md:block absolute top-1/3 left-1/3 w-1/3 h-0.5 bg-primary"></div> */}
          <div className="hidden md:block absolute top-1/3 right-1/3 w-1/3 h-0.5 z-0 bg-primary"></div>

          {/* Step 1 */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl fade-in z-10">
            <div className="bg-primary/10 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
              <Pen size={28} strokeWidth={2.25} className="text-primary" />
            </div>
            <h3 className="mb-3 mt-4 text-xl font-bold text-gray-800">
              Step 1: Write
            </h3>
            <p className="text-gray-600">
              Share a kind message from the heart. It could be advice,
              encouragement, or a simple reminder that someone cares. Keep it
              real, kind, and honest.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl fade-in z-10">
            <div className="bg-accent/10 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
              <Send size={28} strokeWidth={2.25} className="text-accent" />
            </div>
            <h3 className="mb-3 mt-4 text-xl font-bold text-gray-800">
              Step 2: Send
            </h3>
            <p className="text-gray-600">
              Leave your letter where someone might find it— a bench, café, bus
              stop, or even mailed anonymously. Small gestures can make a big
              impact.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl fade-in">
            <div className="bg-secondary/10 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
              <MessageCircleCode
                size={28}
                strokeWidth={2.25}
                className="text-secondary"
              />
            </div>
            <h3 className="mb-3 mt-4 text-xl font-bold text-gray-800">
              Step 3: Reflect
            </h3>
            <p className="text-gray-600">
              Take a moment to notice how it felt to write. Sometimes, giving to
              others reminds us what we need to hear too.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl text-center mb-12 font-semibold text-gray-800">
            Letters That Made a Difference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
            {/* FIRST */}
            <div className="border-2 bg-gray-50 p-6 rounded-xl shadow-sm border-gray-100">
              <div className="mb-4 text-primary">
                <Star size={24} fill="pink" className="inline" />
                <Star size={24} fill="pink" className="inline" />
                <Star size={24} fill="pink" className="inline" />
                <Star size={24} fill="pink" className="inline" />
                <Star size={24} fill="pink" className="inline" />
              </div>
              <p className="italic text-gray-600 mb-6">
                "Finding that letter on my windshield on what was one of my
                hardest days... it was like the universe knew exactly what I
                needed. That small act of kindness from a stranger changed
                everything for me."
              </p>
              <p className="font-semibold text-gray-800">- Sarah M.</p>
            </div>
            <div className="border-2 bg-gray-50 p-6 rounded-xl shadow-sm border-gray-100">
              <div className="mb-4 text-primary">
                <Star size={24} fill="pink" className="inline" />
                <Star size={24} fill="pink" className="inline" />
                <Star size={24} fill="pink" className="inline" />
                <Star size={24} fill="pink" className="inline" />
                <Star size={24} fill="pink" className="inline" />
              </div>
              <p className="italic text-gray-600 mb-6">
                "Writing letters to strangers has become my weekly therapy.
                There's something deeply healing about putting your thoughts on
                paper, knowing they might help someone else feel less alone."
              </p>
              <p className="font-semibold text-gray-800">- Michael D.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent/30 text-white text-center">
        <div className="relative z-10 max-w-4xl mx-auto px-6 fade-in">
          <h2 className="text-4xl font-bold mb-6 text-gray-700">Start Writing Today</h2>
          <p className="text-gray-800 mb-10 text-lg max-w-xl mx-auto">
            Your words could be exactly what someone needs to hear. Join our
            community of letter-writers and make a difference, one message at a
            time.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/login"
              className="px-8 py-4 bg-primary hover:bg-accent text-white rounded-lg shadow-lg transition transform hover:scale-105 w-64"
            >
              Write a Letter
            </a>
            <a
              href="#about"
              className="px-8 py-4 bg-white  text-black hover:bg-gray-200 hover:text-black rounded-lg transition transform hover:scale-105 w-64"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default page