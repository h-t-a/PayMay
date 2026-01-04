'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useTransactions(userId: string) {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    const { data } = await supabase
      .from('transactions')
      .select('*')
      .or(`creator_id.eq.${userId},friend_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    setTransactions(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (!userId) return;

    fetchTransactions();

    const channel = supabase
      .channel('transactions-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'transactions' },
        () => fetchTransactions()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return { transactions, loading };
}
