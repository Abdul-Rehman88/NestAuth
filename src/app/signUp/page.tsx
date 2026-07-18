"use client"
import  { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import Link from 'next/link';

function SignUp() {

  const route = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  
  const onSigup = async () => {
   
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Response from signup API:", response);
      toast.success("Signup successful");
      route.push("/login");

    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
    
  }
  const setButtonDisabled = !(
        user.username.length > 0 &&
        user.email.length > 0 &&
        user.password.length > 0
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">{loading ? "Processing" : "Sign Up"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
        id="username"
        type="text"
        placeholder="Username"
        value={user.username}
        onChange={(e)=>setUser({...user, username: e.target.value})}
      />
      <label htmlFor="email">Email</label>
      <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
        id="email"
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e)=>setUser({...user, email: e.target.value})}
      />
      <label htmlFor="password">Password</label>
      <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
        id="password"
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e)=>setUser({...user, password: e.target.value})}
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:bg-blue-400 transition duration-300 ease-in-out"
        onClick={onSigup}
        disabled={setButtonDisabled}
      >
        {setButtonDisabled ? "Fill all fields" : "Sign Up"}
      </button>
      <Link href="/login">Visit Login</Link>
    </div>    
  )
}

export default SignUp
