'use client'
import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';


type User = {
  id: string;
  username: string;
  email: string;
  password: string;
}

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    const getUser = async ()=>{
        try{
            const res = await axios.get("/api/users/profile");
            const data = res.data.data
            setUser({           
                id: data._id,
                username: data.username,
                email: data.email,
                password: data.password,
            });
           }catch(error){
            console.log(error)
            toast.error("Something went wrong while fetching user")
        }
    }
    
    const logOut = async ()=>{
        try{
            await axios.get("/api/users/logout");
            setUser(null);
            router.push("/login");
        }catch(error){
            console.log(error)
            toast.error("Something went wrong while logging out")
        }
    } 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr />
        <p>Profile page</p>
        <h2 className="p-1 rounded bg-green-500">
            {user === null ? (
             "no user"
            ) : (
                <div>
                    <Link href={`/profile/${user.id}`}>
                        {user.username}
                    </Link>
                    <Link href={`/profile/${user.email}`}>
                        {user.email}
                    </Link>
                {/* <p>{user.email}</p> */}

                </div>
            )}
        </h2>
        <hr />
        <button
        onClick={logOut}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Logout
        </button>

        <button
        onClick={getUser}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            GetUser Details
        </button>
    </div>
    )
}

