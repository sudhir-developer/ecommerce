"use client";
import { useState } from "react";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("Sending...");
  
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
    });
  
    const data = await res.json();
  
    if (res.ok) {
      setIsError(false);
      setStatus(data.message);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } else {
      setIsError(true);
      setStatus(data.error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">

      {/* Contact Us Banner */}
<div className="relative bg-black text-white py-16 px-8 rounded-2xl mb-12 overflow-hidden">

{/* Background Pattern */}
<div className="absolute inset-0 opacity-10">
  <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full translate-x-1/2 -translate-y-1/2"></div>
  <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/3 translate-y-1/3"></div>
</div>

{/* Content */}
<div className="relative z-10 text-center max-w-2xl mx-auto">
  <p className="text-gray-400 text-sm uppercase tracking-widest mb-3">We Are Here To Help</p>
  <h1 className="text-4xl md:text-5xl font-bold mb-4">
    Get In <span className="text-yellow-400">Touch</span>  With Us
  </h1>
  <p className="text-gray-300 text-lg mb-8">
    Koi bhi sawaal ho, hum hamesha available hain. Humse contact karo!
  </p>
  <div className="flex justify-center gap-6 flex-wrap">
    <div className="flex items-center gap-2 text-gray-300">
      <span>📞</span> +91 98765 43210
    </div>
    <div className="flex items-center gap-2 text-gray-300">
      <span>✉️</span> support@interiorstore.com
    </div>
    <div className="flex items-center gap-2 text-gray-300">
      <span>🕐</span> Mon-Sat: 9AM - 7PM
    </div>
  </div>
</div>

</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Left - Contact Info */}
        <div className="space-y-8 order-2 md:order-1">
          <h2 className="text-2xl font-bold">Get In Touch</h2>

          <div className="flex items-start gap-4">
            <div className="bg-black text-white p-3 rounded-lg text-xl">📍</div>
            <div>
              <h3 className="font-bold mb-1">Address</h3>
              <p className="text-gray-500">123, Interior Street, Design Nagar,<br />Mumbai, Maharashtra - 400001</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-black text-white p-3 rounded-lg text-xl">📞</div>
            <div>
              <h3 className="font-bold mb-1">Phone</h3>
              <p className="text-gray-500">+91 98765 43210</p>
              <p className="text-gray-500">+91 91234 56789</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-black text-white p-3 rounded-lg text-xl">✉️</div>
            <div>
              <h3 className="font-bold mb-1">Email</h3>
              <p className="text-gray-500">support@interiorstore.com</p>
              <p className="text-gray-500">info@interiorstore.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-black text-white p-3 rounded-lg text-xl">🕐</div>
            <div>
              <h3 className="font-bold mb-1">Business Hours</h3>
              <p className="text-gray-500">Monday - Saturday: 9AM - 7PM</p>
              <p className="text-gray-500">Sunday: 10AM - 5PM</p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold mb-3">Follow Us</h3>
            <div className="flex gap-3">
              {["Facebook", "Instagram", "Twitter", "YouTube"].map((social, i) => (
                <button key={i} className="bg-gray-100 hover:bg-black hover:text-white transition px-3 py-2 rounded-lg text-sm">
                  {social}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Contact Form */}
        <div className="bg-gray-50 p-8 rounded-2xl border order-1 md:order-2">
          <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

          {status && (
            <div className={`mb-4 p-3 rounded ${isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
              {status}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Full Name</label>
              <input
                type="text"
                placeholder="Apna naam likho"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-3 rounded-lg w-full bg-white"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <input
                type="email"
                placeholder="Apni email likho"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-3 rounded-lg w-full bg-white"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Subject</label>
              <input
                type="text"
                placeholder="Subject likho"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="border p-3 rounded-lg w-full bg-white"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Message</label>
              <textarea
                placeholder="Apna message likho..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border p-3 rounded-lg w-full bg-white"
                rows={5}
                required
              />
            </div>

            <button className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition font-medium">
              Send Message
            </button>
          </form>
        </div>

      </div>

      {/* Map Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Find Us</h2>
        <div className="bg-gray-200 rounded-2xl">
        
          <div className="rounded-2xl overflow-hidden">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50000!2d77.06889754725782!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
      width="100%"
      height="300"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
        </div>
      </div>

    </div>
  );
}