import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      if (isLogin) {
        // Login logic
        const res = await axios.post("http://localhost:5000/api/login", { email, password });
        localStorage.setItem("token", res.data.token);
        setMessage("Login successful! Redirecting...");
        navigate("/profile");
      } else {
        // Register logic
        const res = await axios.post("http://localhost:5000/api/register", { email, password });
        setMessage(res.data.message || "Registration successful! Check your email to verify.");
      }
    } catch (err) {
      setMessage(
        err.response?.data?.error || "Authentication failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50">
      <div className="w-full max-w-2xl mx-auto p-12 bg-white rounded-2xl shadow-lg border border-pink-200">
        <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
          {isLogin ? 'Login to Mewmii Bear' : 'Register for Mewmii Bear'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            className="px-4 py-3 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="px-4 py-3 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition"
            disabled={loading}
          >
            {loading ? (isLogin ? 'Logging in...' : 'Registering...') : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            className="text-pink-500 hover:underline text-sm"
            onClick={() => { setIsLogin(!isLogin); setMessage(""); }}
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>

        {message && <p className="mt-6 text-center text-pink-600">{message}</p>}
      </div>
    </div>
  );
}
