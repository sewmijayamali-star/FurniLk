import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [promoText, setPromoText] = useState("");
  const navigation = useNavigate();

  

  // Animate the text letters
  useEffect(() => {
    const text = "Welcome to FurniLK  Explore premium furniture!";
    let index = 0;
    const interval = setInterval(() => {
      setPromoText(text.slice(0, index + 1));
      index++;
      if (index >= text.length) clearInterval(interval);
    }, 70);
    return () => clearInterval(interval);
  }, []);

  async function login() {
    try {
      const response = await axios.post('http://localhost:5000/users/login', { email, password });
      console.log(response.data);

      localStorage.setItem("token", response.data.token);


      const user = response.data;
      user === "admin" ? navigation("/admin") : navigation("/");
      toast.success("Login successful!");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/bg.jpg')] bg-cover bg-center flex  ">

      {/* Left side: animated text */}
      <div className="w-1/2 h-full flex items-center justify-start px-16">
        {/* Use a fixed height to prevent vertical movement */}
        <div className="h-[200px] flex items-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#5A381E] tracking-wide text-center">
            {promoText}
          </h1>
        </div>
      </div>

      {/* Right side: login card */}
      <div className="w-1/2 h-full flex items-center justify-center">
        <div className="w-[450px] p-10 backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-xl flex flex-col gap-6">

          <h2 className="text-3xl font-bold text-[#5A381E] text-center">Welcome Back</h2>
          <p className="text-center text-[#5A381E]/70">Login to your FurniLK account</p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-white/50 backdrop-blur-md border border-white/25 placeholder:text-[#5A381E]/50 focus:outline-none focus:ring-2 focus:ring-[#c69b6d] transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-white/50 backdrop-blur-md border border-white/25 placeholder:text-[#5A381E]/50 focus:outline-none focus:ring-2 focus:ring-[#c69b6d] transition"
          />

          <button
            onClick={login}
            className="w-full h-12 bg-[#c69b6d] hover:bg-[#8B5E3C] text-white font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105"
          >
            Login
          </button>

          <p className="text-center text-[#5A381E]/70 text-sm">
            Don't have an account?{" "}
            <span className="text-[#D9A066] font-semibold hover:underline cursor-pointer">
              Sign Up
            </span>
          </p>

        </div>
      </div>
    </div> 
  );
} 