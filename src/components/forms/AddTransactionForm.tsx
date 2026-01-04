'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useProfiles } from '@/src/hooks/useProfiles';

export default function AddTransactionForm({
  userId,
}: {
  userId: string;
}) {
  const { profiles, loading } = useProfiles(userId);

  const [form, setForm] = useState({
    friend_id: '',
    amount: '',
    description: '',
    type: 'pay',
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.friend_id) return;

    await supabase.from('transactions').insert([
      {
        creator_id: userId,
        friend_id: form.friend_id,
        amount: Number(form.amount),
        description: form.description,
        type: form.type,
      },
    ]);

    setForm({ ...form, amount: '', description: '' });
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      {/* Friend Selector */}
      <select
        className="w-full border p-2 rounded"
        value={form.friend_id}
        onChange={e =>
          setForm({ ...form, friend_id: e.target.value })
        }
        disabled={loading}
        required
      >
        <option value="">Select Friend</option>
        {profiles.map(profile => (
          <option key={profile.id} value={profile.id}>
            {profile.full_name}
            {profile.phone_kpay
              ? ` (${profile.phone_kpay})`
              : ''}
          </option>
        ))}
      </select>

      {/* Amount */}
      <input
        className="w-full border p-2 rounded"
        placeholder="Amount (MMK)"
        type="number"
        required
        value={form.amount}
        onChange={e =>
          setForm({ ...form, amount: e.target.value })
        }
      />

      {/* Type */}
      <select
        className="w-full border p-2 rounded"
        value={form.type}
        onChange={e =>
          setForm({ ...form, type: e.target.value })
        }
      >
        <option value="pay">I Pay</option>
        <option value="receive">I Receive</option>
      </select>

      {/* Description */}
      <input
        className="w-full border p-2 rounded"
        placeholder="Description (optional)"
        value={form.description}
        onChange={e =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <button className="w-full bg-black text-white p-2 rounded">
        Add Transaction
      </button>
    </form>
  );
}
