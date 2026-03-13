"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginPage() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");
  const [type,setType] = useState("");
  const router = useRouter();

  const handleSubmit = async (e:any)=>{
    e.preventDefault();

    const res = await fetch("/api/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password})
    });

    const data = await res.json();

    if(data.error){
      setType("error");
      setMessage(data.error);
      setTimeout(()=>setMessage(""),4000);
      return;
    }

    if(data.message){
        setType("success");
        setMessage(data.message);
      
        setTimeout(()=>{
          router.push("/dashboard");
          router.refresh();
        },1000);
        setTimeout(()=>setMessage(""),4000);
      }

  }

  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="max-w-md w-full p-6 border rounded-lg shadow-md bg-white">

        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>

        {message && (
          <div className={`mb-4 p-2 rounded ${
            type==="success"
            ? "bg-green-200 text-green-800"
            : "bg-red-200 text-red-800"
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="border p-2 rounded"
          required
          />

          <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="border p-2 rounded"
          required
          />

          <button className="bg-blue-500 text-white p-2 rounded">
            Login
          </button>

        </form>

      </div>

    </div>
  )
}