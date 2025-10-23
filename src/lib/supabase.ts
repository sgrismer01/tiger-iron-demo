import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  full_name: string;
  phone: string | null;
  role: 'member' | 'admin';
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Plan = {
  id: string;
  slug: string;
  title: string;
  price: number;
  billing_interval: string;
  features: string[];
  stripe_price_id: string | null;
  is_active: boolean;
  sort_order: number;
};

export type Membership = {
  id: string;
  user_id: string;
  plan_id: string;
  stripe_subscription_id: string | null;
  status: 'active' | 'canceled' | 'expired' | 'trial';
  start_date: string;
  end_date: string | null;
  created_at: string;
  updated_at: string;
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  interested_in: string | null;
  source: string | null;
  created_at: string;
};
