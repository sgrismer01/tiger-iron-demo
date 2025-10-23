/*
  # Tiger Iron Gym Database Schema

  ## Overview
  Complete database schema for Tiger Iron gym management system including user management,
  membership tracking, payments, contact inquiries, and app download analytics.

  ## New Tables

  ### `plans`
  - `id` (uuid, primary key)
  - `slug` (text, unique) - URL-friendly identifier
  - `title` (text) - Display name
  - `price` (decimal) - Monthly price
  - `billing_interval` (text) - 'monthly' or 'annual'
  - `features` (jsonb) - Array of feature descriptions
  - `stripe_price_id` (text) - Stripe Price ID
  - `is_active` (boolean) - Whether plan is available
  - `sort_order` (integer) - Display order
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `profiles`
  - `id` (uuid, primary key, references auth.users)
  - `full_name` (text)
  - `phone` (text)
  - `role` (text) - 'member' or 'admin'
  - `stripe_customer_id` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `memberships`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `plan_id` (uuid, references plans)
  - `stripe_subscription_id` (text)
  - `status` (text) - 'active', 'canceled', 'expired', 'trial'
  - `start_date` (timestamptz)
  - `end_date` (timestamptz, nullable)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `payments`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `stripe_payment_id` (text)
  - `amount` (decimal)
  - `currency` (text)
  - `status` (text) - 'succeeded', 'pending', 'failed'
  - `created_at` (timestamptz)

  ### `inquiries`
  - `id` (uuid, primary key)
  - `name` (text)
  - `email` (text)
  - `phone` (text, nullable)
  - `message` (text)
  - `interested_in` (text)
  - `source` (text) - referrer or source
  - `created_at` (timestamptz)

  ### `app_downloads`
  - `id` (uuid, primary key)
  - `user_agent` (text)
  - `platform` (text) - 'ios' or 'android'
  - `referrer` (text)
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Profiles: Users can read/update own profile, admins can read all
  - Memberships: Users can read own memberships, admins can manage all
  - Plans: Public read access, admin write access
  - Payments: Users can read own payments, admins can read all
  - Inquiries: Admin read access only
  - App downloads: Admin read access only
*/

-- Create plans table
CREATE TABLE IF NOT EXISTS plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  price decimal(10,2) NOT NULL,
  billing_interval text NOT NULL DEFAULT 'monthly',
  features jsonb DEFAULT '[]'::jsonb,
  stripe_price_id text,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE plans ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text NOT NULL,
  phone text,
  role text DEFAULT 'member' CHECK (role IN ('member', 'admin')),
  stripe_customer_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create memberships table
CREATE TABLE IF NOT EXISTS memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  plan_id uuid REFERENCES plans(id) NOT NULL,
  stripe_subscription_id text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'expired', 'trial')),
  start_date timestamptz DEFAULT now(),
  end_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  stripe_payment_id text,
  amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'usd',
  status text DEFAULT 'pending' CHECK (status IN ('succeeded', 'pending', 'failed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  interested_in text,
  source text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Create app_downloads table
CREATE TABLE IF NOT EXISTS app_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_agent text,
  platform text CHECK (platform IN ('ios', 'android')),
  referrer text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE app_downloads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for plans
CREATE POLICY "Plans are viewable by everyone"
  ON plans FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

CREATE POLICY "Admins can manage plans"
  ON plans FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policies for memberships
CREATE POLICY "Users can view own memberships"
  ON memberships FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all memberships"
  ON memberships FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage memberships"
  ON memberships FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Users can create own membership"
  ON memberships FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for payments
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all payments"
  ON payments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "System can create payments"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for inquiries
CREATE POLICY "Admins can view inquiries"
  ON inquiries FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Anyone can submit inquiries"
  ON inquiries FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- RLS Policies for app_downloads
CREATE POLICY "Admins can view app downloads"
  ON app_downloads FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Anyone can track app downloads"
  ON app_downloads FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Insert default membership plans
INSERT INTO plans (slug, title, price, billing_interval, features, sort_order) VALUES
  ('monthly', '$29/Month', 29.00, 'monthly', '["Month-to-month contract that auto-renews", "Payment information on file", "Cancel anytime"]'::jsonb, 1),
  ('one-month', '$39/Month', 39.00, 'monthly', '["31-day membership", "Cash, card, or checks accepted", "No need for cancellation notice"]'::jsonb, 2)
ON CONFLICT (slug) DO NOTHING;
