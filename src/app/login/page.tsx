'use client'
import React,{ useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import Link from 'next/link';

function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const setButtonDisabled = !(
    user.email.length > 0 &&
    user.password.length > 0
  )

  const onLogin = async() => {
    try{
      setLoading(true)
      const response = await axios.post("/api/users/login", user)
       const data = response.data
       if (!data.success) {
        toast.error("verify your email")
      } else {
        toast.success("Login successful")
        // router.push("/")
      }
    }catch(error){
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  }

  return (
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">{loading ? "Processing" : "Login"}</h1>
      <hr />
     
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
        onClick={onLogin}
        disabled={setButtonDisabled}
      >
        {setButtonDisabled ? "Fill all fields" : "Login"}
      </button>
      <Link href="/signup">Visit Signup</Link>
    </div>      )
}

export default Login