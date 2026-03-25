"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { useForgotPasswordMutation } from "@/services/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await forgotPassword({ email }).unwrap();
      setIsSubmitted(true);
    } catch (err) {
      setError("Failed to send reset email. Please check your email address.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="glass rounded-2xl p-8 shadow-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Salvation<span className="text-primary">Tattoo</span>
          </h1>
          <p className="text-muted-foreground mt-2">Management System</p>
        </div>

        {/* Success Message */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
            <Mail className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Check Your Email
          </h2>
          <p className="text-muted-foreground mb-6">
            We&apos;ve sent a password reset link to <br />
            <span className="text-foreground font-medium">{email}</span>
          </p>
          <Link
            href="/auth/signin"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-8 shadow-2xl">
      {/* Logo */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Salvation<span className="text-primary">Tattoo</span>
        </h1>
        <p className="text-muted-foreground mt-2">Management System</p>
      </div>

      {/* Header */}
      <div className="mb-6">
        <Link
          href="/auth/signin"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft size={14} />
          Back to Sign In
        </Link>
        <h2 className="text-2xl font-bold text-foreground">Forgot Password?</h2>
        <p className="text-muted-foreground mt-2">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@salvationlounge.com"
            className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Sending...
            </>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>
    </div>
  );
}
