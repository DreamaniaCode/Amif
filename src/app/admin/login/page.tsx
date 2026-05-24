'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Lock, Mail, Eye, EyeOff, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Email ou mot de passe incorrect.');
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-light flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden bg-dot-pattern">
      {/* Slow moving ambient blobs */}
      <div className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-primary/5 blur-[120px] animate-blob-1" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60vw] h-[60vw] rounded-full bg-secondary/5 blur-[120px] animate-blob-2" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 space-y-4">
        {/* Logo container */}
        <div className="flex justify-center">
          <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-border-custom hover:scale-105 transition-transform duration-300">
            <Image 
              src="/logo.png" 
              alt="AMIF Logo" 
              width={160} 
              height={55} 
              className="h-auto w-full object-contain"
              priority
            />
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl border border-border-custom sm:px-10 space-y-6">
          
          {/* Header info */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-secondary-50 flex items-center justify-center text-secondary mx-auto">
              <Lock size={22} />
            </div>
            <h1 className="text-lg md:text-xl font-extrabold text-dark">Administration AMIF</h1>
            <p className="text-xs md:text-sm text-medium font-medium">Connectez-vous pour accéder au tableau de bord</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-dark uppercase tracking-wide">Adresse Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-medium" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-border-custom rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  placeholder="admin@amif.ma"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-dark uppercase tracking-wide">Mot de passe</label>
              <div className="relative">
                <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-medium" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white border border-border-custom rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-medium hover:text-dark transition-colors"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center py-3.5 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-55 disabled:cursor-not-allowed hover:-translate-y-0.5"
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          {/* Footer Back Link */}
          <div className="text-center pt-2">
            <Link 
              href="/fr" 
              className="text-xs font-bold text-secondary hover:text-secondary-dark transition-colors"
            >
              ← Retour au site
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
