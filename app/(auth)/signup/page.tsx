'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (!error) router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold">Create Account</h1>

        <input
          className="w-full border p-2 rounded"
          placeholder="Full Name"
          onChange={e => setFullName(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-black text-white p-2 rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
