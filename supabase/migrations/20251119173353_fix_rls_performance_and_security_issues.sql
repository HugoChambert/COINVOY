/*
  # Fix RLS Performance and Security Issues

  ## Changes Made

  1. RLS Performance Optimization
    - Replace `auth.uid()` with `(select auth.uid())` in all policies
    - This prevents re-evaluation of auth function for each row
    - Significantly improves query performance at scale

  2. Remove Unused Indexes
    - Drop `idx_user_profiles_email` - not being used
    - Drop `idx_user_accounts_user_id` - not being used (foreign key already indexed)
    - Drop `idx_transactions_created_at` - not being used
    - Drop `idx_transactions_status` - not being used

  3. Fix Function Search Path
    - Update `handle_new_user` function with stable search_path
    - Prevents security vulnerabilities from mutable search_path

  ## Security Impact
  - Improved RLS query performance
  - Removed unused indexes to improve write performance
  - Fixed function security vulnerability
*/

-- Drop all existing RLS policies to recreate them with optimized auth calls
DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can read own accounts" ON user_accounts;
DROP POLICY IF EXISTS "Users can insert own accounts" ON user_accounts;
DROP POLICY IF EXISTS "Users can read own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can insert own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can update own transactions" ON transactions;

-- Recreate user_profiles policies with optimized auth calls
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = id);

-- Recreate user_accounts policies with optimized auth calls
CREATE POLICY "Users can read own accounts"
  ON user_accounts
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert own accounts"
  ON user_accounts
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

-- Recreate transactions policies with optimized auth calls
CREATE POLICY "Users can read own transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own transactions"
  ON transactions
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own transactions"
  ON transactions
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- Remove unused indexes
DROP INDEX IF EXISTS idx_user_profiles_email;
DROP INDEX IF EXISTS idx_user_accounts_user_id;
DROP INDEX IF EXISTS idx_transactions_created_at;
DROP INDEX IF EXISTS idx_transactions_status;

-- Fix function search path security issue
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$;
