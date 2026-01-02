'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user) return;

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.user.id)
        .single();

      setProfile(data);
    };

    loadProfile();
  }, []);

  if (!profile) return <p className="p-4">Loading profile...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Welcome, {profile.full_name}</h1>
      <p className="text-sm text-gray-500">
        KPay: {profile.phone_kpay || 'Not set'}
      </p>
    </div>
  );
}
