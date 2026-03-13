"use client";
import { useState } from "react";

export default function SignupComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (data.error) {
        setType("error");
        setMessage(data.error);
        setTimeout(() => setMessage(""), 5000);
        return;
      }
  
      if (data.message) {
        setType("success");
        setMessage(data.message);
        setName("");
        setEmail("");
        setPassword("");
        setTimeout(() => setMessage(""), 5000);
      }
  
    } catch (err) {
      setType("error");
      setMessage("Something went wrong!");
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-15 mb-10 p-6 border rounded-lg shadow-md bg-white">
      <h1 className="text-xl font-bold mb-4">Signup</h1>
      {message && (
        <div
            className={`mb-4 p-2 rounded ${
            type === "success"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
        >
            {message}
        </div>
        )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
}