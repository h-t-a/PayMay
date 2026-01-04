'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useTransactions } from '@/src/hooks/useTransactions';
import TransactionCard from '../../src/components/dashboard/TransactionCard';
import AddTransactionForm from '../../src/components/dashboard/TransactionCard';

export default function DashboardPage() {
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserId(data.user.id);
    });
  }, []);

  const { transactions, loading } = useTransactions(userId);

  if (!userId) return null;

  return (
    <div className="p-4 space-y-4">
      <AddTransactionForm userId={userId} />

      {loading && <p>Loading transactions...</p>}

      {transactions.map(tx => (
        <TransactionCard
          key={tx.id}
          tx={tx}
          userId={userId}
        />
      ))}
    </div>
  );
}
