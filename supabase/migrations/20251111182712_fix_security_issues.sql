/*
  # Fix Security and Performance Issues

  This migration addresses the following security and performance issues:
  
  1. **Add Missing Indexes**
     - Add index on `bank_accounts.user_id` to optimize foreign key queries
     - Add index on `crypto_wallets.user_id` to optimize foreign key queries
  
  2. **Optimize RLS Policies**
     - Update all RLS policies to use `(select auth.uid())` instead of `auth.uid()`
     - This prevents the auth function from being re-evaluated for each row
     - Significantly improves query performance at scale
  
  3. **Tables Affected**
     - profiles (3 policies updated)
     - crypto_wallets (4 policies updated + index added)
     - bank_accounts (4 policies updated + index added)

  Note: The leaked password protection is a Supabase Auth configuration setting
  that needs to be enabled in the Supabase Dashboard under Authentication > Settings,
  not in a migration.
*/

-- Add indexes for foreign keys
CREATE INDEX IF NOT EXISTS idx_crypto_wallets_user_id ON crypto_wallets(user_id);
CREATE INDEX IF NOT EXISTS idx_bank_accounts_user_id ON bank_accounts(user_id);

-- Drop existing policies for profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Recreate profiles policies with optimized auth.uid() calls
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

-- Drop existing policies for crypto_wallets
DROP POLICY IF EXISTS "Users can view own wallets" ON crypto_wallets;
DROP POLICY IF EXISTS "Users can insert own wallets" ON crypto_wallets;
DROP POLICY IF EXISTS "Users can update own wallets" ON crypto_wallets;
DROP POLICY IF EXISTS "Users can delete own wallets" ON crypto_wallets;

-- Recreate crypto_wallets policies with optimized auth.uid() calls
CREATE POLICY "Users can view own wallets"
  ON crypto_wallets FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own wallets"
  ON crypto_wallets FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own wallets"
  ON crypto_wallets FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own wallets"
  ON crypto_wallets FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- Drop existing policies for bank_accounts
DROP POLICY IF EXISTS "Users can view own bank accounts" ON bank_accounts;
DROP POLICY IF EXISTS "Users can insert own bank accounts" ON bank_accounts;
DROP POLICY IF EXISTS "Users can update own bank accounts" ON bank_accounts;
DROP POLICY IF EXISTS "Users can delete own bank accounts" ON bank_accounts;

-- Recreate bank_accounts policies with optimized auth.uid() calls
CREATE POLICY "Users can view own bank accounts"
  ON bank_accounts FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own bank accounts"
  ON bank_accounts FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own bank accounts"
  ON bank_accounts FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own bank accounts"
  ON bank_accounts FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);
