"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "Contains a number", test: (p: string) => /\d/.test(p) },
  { label: "Contains uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
];

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  const passed = PASSWORD_RULES.filter((r) => r.test(password)).length;
  const colors = ["#ef4444", "#f59e0b", "#22c55e"];
  const labels = ["Weak", "Fair", "Strong"];
  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1.5">
        {PASSWORD_RULES.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-1 rounded-full transition-all duration-300"
            style={{
              background: i < passed ? colors[passed - 1] : "var(--color-surface-container-highest)",
            }}
          />
        ))}
      </div>
      {passed > 0 && (
        <p className="text-[10px] font-semibold" style={{ color: colors[passed - 1] }}>
          {labels[passed - 1]}
        </p>
      )}
    </div>
  );
}

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1200);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const passwordMatch = confirmPassword && password === confirmPassword;
  const passwordMismatch = confirmPassword && password !== confirmPassword;

  return (
    <div className="min-h-screen flex" style={{ background: "var(--color-background)" }}>
      {/* ── Left hero panel ─────────────────────────────────────────────────── */}
      <div
        className="hidden md:flex md:w-1/2 relative overflow-hidden"
        style={{ background: "var(--color-inverse-surface)" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000')`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(186,0,19,0.35) 0%, rgba(0,0,0,0.85) 100%)",
          }}
        />

        {/* Brand badge */}
        <div className="absolute top-8 left-8 flex items-center gap-2.5 z-10">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "var(--color-primary)" }}
          >
            <span className="material-symbols-outlined text-[18px] text-white">directions_car</span>
          </div>
          <span
            className="font-bold text-white text-lg"
            style={{ fontFamily: "Hanken Grotesk" }}
          >
            RK Auto Mobiles
          </span>
        </div>

        {/* Hero copy */}
        <div className="absolute inset-0 flex flex-col justify-end p-12 z-10">
          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {["Verified Inventory", "Expert Financing", "White-glove Service"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-semibold rounded-full"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-black text-white mb-4 leading-tight"
            style={{ fontFamily: "Hanken Grotesk" }}
          >
            Drive Your<br />Ambition.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/60 text-base max-w-sm leading-relaxed"
          >
            Join hundreds of dealers and buyers who trust RK Auto Mobiles for
            Nepal's finest premium vehicle marketplace.
          </motion.p>
        </div>
      </div>

      {/* ── Right: form panel ───────────────────────────────────────────────── */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 bg-white overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md mx-auto"
        >
          {/* Mobile brand */}
          <div className="md:hidden flex items-center gap-2 mb-8">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "var(--color-primary)" }}
            >
              <span className="material-symbols-outlined text-[18px] text-white">directions_car</span>
            </div>
            <span
              className="font-bold text-lg"
              style={{ color: "var(--color-primary)", fontFamily: "Hanken Grotesk" }}
            >
              RK Auto Mobiles
            </span>
          </div>

          <h1
            className="font-black text-3xl mb-2 text-gray-900"
            style={{ fontFamily: "Hanken Grotesk" }}
          >
            Create Account
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Register as a dealer or buyer to get started.
          </p>

          {/* Error banner */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-5 px-4 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 bg-red-50 text-red-700"
              >
                <span className="material-symbols-outlined text-[18px]">error</span>
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 px-4 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 bg-green-50 text-green-700"
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                Account created! Redirecting to dashboard…
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Full name */}
            <div>
              <label
                htmlFor="name"
                className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-400"
                style={{ fontFamily: "JetBrains Mono" }}
              >
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-4 inset-y-0 flex items-center pointer-events-none text-gray-400">
                  <span className="material-symbols-outlined text-[18px]">person</span>
                </span>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border-none text-sm outline-none transition-all focus:bg-white focus:shadow-md"
                  style={{ color: "var(--color-on-surface)" }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-400"
                style={{ fontFamily: "JetBrains Mono" }}
              >
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
              <label
                htmlFor="password"
                className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-400"
                style={{ fontFamily: "JetBrains Mono" }}
              >
                Password
              </label>
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
                  placeholder="Min. 8 characters"
                  className="w-full pl-11 pr-12 py-3.5 rounded-2xl bg-gray-50 border-none text-sm outline-none transition-all focus:bg-white focus:shadow-md"
                  style={{ color: "var(--color-on-surface)" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 inset-y-0 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>

            {/* Confirm password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-400"
                style={{ fontFamily: "JetBrains Mono" }}
              >
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute left-4 inset-y-0 flex items-center pointer-events-none text-gray-400">
                  <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                </span>
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 rounded-2xl bg-gray-50 border-none text-sm outline-none transition-all focus:bg-white focus:shadow-md"
                  style={{
                    color: "var(--color-on-surface)",
                    boxShadow: passwordMismatch
                      ? "0 0 0 2px rgba(239,68,68,0.35)"
                      : passwordMatch
                      ? "0 0 0 2px rgba(34,197,94,0.35)"
                      : undefined,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 inset-y-0 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showConfirm ? "visibility_off" : "visibility"}
                  </span>
                </button>
                {passwordMatch && (
                  <span
                    className="absolute right-11 inset-y-0 flex items-center"
                    style={{ color: "#22c55e" }}
                  >
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  </span>
                )}
              </div>
              {passwordMismatch && (
                <p className="mt-1 text-[10px] font-semibold text-red-500">
                  Passwords do not match
                </p>
              )}
            </div>

            {/* Terms */}
            <p className="text-[11px] text-gray-400 leading-relaxed">
              By creating an account you agree to our{" "}
              <Link
                href="/terms-of-service"
                className="font-bold text-red-600 hover:text-red-700 transition-colors underline underline-offset-2"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="font-bold text-red-600 hover:text-red-700 transition-colors underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              .
            </p>

            {/* Submit */}
            <button
              id="signup-submit"
              type="submit"
              disabled={loading || success}
              className="w-full py-4 rounded-2xl font-bold text-white text-sm btn-press transition-all disabled:opacity-60 shadow-lg shadow-red-500/20"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary), var(--color-surface-tint))",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Creating Account…
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[10px] font-bold text-gray-400 font-mono">OR</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-extrabold text-red-600 hover:text-red-700 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
