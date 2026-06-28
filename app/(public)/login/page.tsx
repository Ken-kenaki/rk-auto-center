"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: "var(--color-background)" }}>
      {/* Left panel */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden" style={{ background: "var(--color-inverse-surface)" }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1000')` }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 70%, rgba(186,0,19,0.3) 0%, rgba(0,0,0,0.8) 100%)" }} />
        <div className="absolute inset-0 flex flex-col justify-end p-12 z-10">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-black text-white mb-4 leading-tight"
            style={{ fontFamily: "Hanken Grotesk" }}
          >
            Precision<br />Engineering.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/60 text-base max-w-sm leading-relaxed"
          >
            Experience the pinnacle of automotive performance. Log in to access your curated marketplace and exclusive dealer insights.
          </motion.p>
        </div>
        <div className="absolute top-8 left-8 flex items-center gap-2.5 z-10">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--color-primary)" }}>
            <span className="material-symbols-outlined text-[18px] text-white">directions_car</span>
          </div>
          <span className="font-bold text-white text-lg" style={{ fontFamily: "Hanken Grotesk" }}>RK Auto Mobiles</span>
        </div>
      </div>

      {/* Right: form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md mx-auto"
        >
          {/* Mobile brand */}
          <div className="md:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center animate-pulse" style={{ background: "var(--color-primary)" }}>
              <span className="material-symbols-outlined text-[18px] text-white">directions_car</span>
            </div>
            <span className="font-bold text-lg" style={{ color: "var(--color-primary)", fontFamily: "Hanken Grotesk" }}>RK Auto Mobiles</span>
          </div>

          <h1 className="font-black text-3xl mb-2 text-gray-900" style={{ fontFamily: "Hanken Grotesk" }}>
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Enter your credentials to access your account.
          </p>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 bg-red-50 text-red-700">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-400" style={{ fontFamily: "JetBrains Mono" }}>
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 inset-y-0 flex items-center pointer-events-none text-gray-400">
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dealer@rkauto.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border-none text-sm outline-none transition-all focus:bg-white focus:shadow-md"
                  style={{ color: "var(--color-on-surface)" }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400" style={{ fontFamily: "JetBrains Mono" }}>
                  Password
                </label>
                <button type="button" className="text-[10px] font-black uppercase tracking-wider text-red-600 hover:text-red-700 transition-colors">
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-4 inset-y-0 flex items-center pointer-events-none text-gray-400">
                  <span className="material-symbols-outlined text-[18px]">lock</span>
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 rounded-2xl bg-gray-50 border-none text-sm outline-none transition-all focus:bg-white focus:shadow-md"
                  style={{ color: "var(--color-on-surface)" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 inset-y-0 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">{showPassword ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl font-bold text-white text-sm btn-press transition-all disabled:opacity-60 shadow-lg shadow-red-500/20"
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-surface-tint))" }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[10px] font-bold text-gray-400 font-mono">OR</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="#" className="font-extrabold text-red-600 hover:text-red-700 transition-colors">
              Register as a Dealer
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
