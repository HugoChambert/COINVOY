/*
  # Fix RLS Performance and Remove Unused Indexes

  ## Summary
  This migration addresses security and performance issues identified in the database audit.

  ## Changes Made

  ### 1. RLS Performance Optimization
  - Fix contact_submissions RLS policy to use `(SELECT auth.uid())` instead of `auth.uid()`
  - This prevents re-evaluation of the auth function for each row
  - Significantly improves query performance at scale
  - Follows Supabase best practices for RLS performance

  ### 2. Remove Unused Indexes
  The following indexes have been identified as unused and are being removed to improve write performance:
  - `idx_user_profiles_id_secure` - Primary key already indexed, redundant
  - `idx_transactions_user_id_secure` - Not being utilized by query planner
  - `idx_user_accounts_user_id` - Not being utilized, foreign key constraint provides sufficient indexing

  ### 3. Enable Leaked Password Protection (Manual Step Required)
  **IMPORTANT**: Leaked password protection must be enabled manually in Supabase Dashboard:
  1. Go to Authentication → Settings
  2. Enable "Check for compromised passwords"
  3. This will check passwords against HaveIBeenPwned.org database
  
  Note: This cannot be enabled via SQL migration and must be configured through the dashboard.

  ## Security Impact
  - Improved RLS query performance (prevents N+1 auth.uid() calls)
  - Better write performance (fewer indexes to update)
  - Enhanced password security (when manual step is completed)
*/

-- Fix contact_submissions RLS policy for better performance
DROP POLICY IF EXISTS "Users can view own submissions" ON contact_submissions;

CREATE POLICY "Users can view own submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (
    (SELECT auth.uid()) IS NOT NULL 
    AND email = (SELECT email FROM auth.users WHERE id = (SELECT auth.uid()))
  );

-- Remove unused indexes that are not being utilized
DROP INDEX IF EXISTS idx_user_profiles_id_secure;
DROP INDEX IF EXISTS idx_transactions_user_id_secure;
DROP INDEX IF EXISTS idx_user_accounts_user_id;

-- Add helpful comment about password protection
COMMENT ON SCHEMA public IS 'Database schema with enhanced security. Note: Leaked password protection must be enabled in Supabase Dashboard under Authentication → Settings → "Check for compromised passwords"';
