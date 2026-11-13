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

    const user = JSON.parse(
      atob(response.data.token.split(".")[1])
    );

    user.role === "admin" ? navigation("/admin") : navigation("/");

    toast.success("Login successful!");
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    toast.error(err.response?.data?.message || "Login failed. Please try again.");
  }
}
  return (
    <div className="flex min-h-screen w-full flex-col bg-[url('/bg.jpg')] bg-cover bg-center md:flex-row">

      {/* Left side: animated text */}
      <div className="flex w-full items-center justify-center px-6 pb-4 pt-10 md:h-screen md:w-1/2 md:justify-start md:px-16 md:py-0">
        {/* Use a fixed height to prevent vertical movement */}
        <div className="flex min-h-24 max-w-xl items-center md:h-[200px]">
          <h1 className="text-center text-3xl font-bold tracking-wide text-[#5A381E] sm:text-4xl lg:text-5xl md:text-left">
            {promoText}
          </h1>
        </div>
      </div>

      {/* Right side: login card */}
      <div className="flex w-full flex-1 items-center justify-center px-4 pb-10 md:h-screen md:w-1/2 md:px-6 md:py-0">
        <div className="flex w-full max-w-[450px] flex-col gap-6 rounded-2xl border border-white/30 bg-white/20 p-6 shadow-xl backdrop-blur-xl sm:p-10">

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