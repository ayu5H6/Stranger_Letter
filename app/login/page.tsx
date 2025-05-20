"use client";
import { useState } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { Span } from "next/dist/trace";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let userCredential;

      if (isRegistering) {
      userCredential=  await createUserWithEmailAndPassword(auth, email, password);
      if(auth.currentUser){
        await updateProfile(auth.currentUser,{
          displayName:userName
        })
        await auth.currentUser?.reload();
      }
      } else {
    userCredential= await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/write");
    } catch (error) {
      alert("Error: " + (error as Error).message);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/letter");
    } catch (error) {
      alert("Google Login Error: " + (error as Error).message);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center   bg-primary/10">
      <form
        className="bg-gray-50 py-20 px-6   border border-black md:rounded-xl  shadow-sm shadow-black"
        onSubmit={handleAuth}
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">
          {isRegistering ? "REGISTER" : "LOGIN"}
        </h1>
        {isRegistering && (
          <input
            type="text"
            className="w-full mb-6 p-2 border rounded "
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          className="w-full mb-6 p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full mb-8 p-2 border rounded "
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-accent/70 text-white mb-4 py-2 rounded cursor-pointer hover:scale-105 hover:bg-accent/80">
          {isRegistering ? "Sign Up" : "Login"}
        </button>
        <button
          className="w-full bg-gray-100 border text-black py-2 rounded cursor-pointer hover:scale-105 hover:bg-gray-200"
          onClick={handleGoogleLogin}
          type="button"
        >
          Sign in with Google
        </button>
        <p
          className="mt-4 text-sm text-center cursor-pointer"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </p>
      </form>
    </section>
  );
}
