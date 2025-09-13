
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setMessage(error ? error.message : "Logged in! Redirecting...");
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      setMessage(error ? error.message : "Check your email for a verification link!");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-sm mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg border border-pink-200">
      <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">
        {isLogin ? 'Login to Mewmii Bear' : 'Register for Mewmii Bear'}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          className="px-4 py-2 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="px-4 py-2 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded transition"
          disabled={loading}
        >
          {loading ? (isLogin ? 'Logging in...' : 'Registering...') : (isLogin ? 'Login' : 'Register')}
        </button>
      </form>
      <div className="text-center mt-4">
        <button
          className="text-pink-500 hover:underline text-sm"
          onClick={() => { setIsLogin(!isLogin); setMessage(""); }}
        >
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </button>
      </div>
      {message && <p className="mt-4 text-center text-pink-600">{message}</p>}
    </div>
  );
}