'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useProfiles(currentUserId: string) {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUserId) return;

    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, phone_kpay')
        .neq('id', currentUserId); // IMPORTANT: exclude self

      if (!error) setProfiles(data || []);
      setLoading(false);
    };

    fetchProfiles();
  }, [currentUserId]);

  return { profiles, loading };
}
