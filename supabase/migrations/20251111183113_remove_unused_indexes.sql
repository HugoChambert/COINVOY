/*
  # Remove Unused Indexes

  This migration addresses unused index warnings:
  
  1. **Remove Unused Indexes**
     - Drop `idx_crypto_wallets_user_id` index (reported as unused)
     - Drop `idx_bank_accounts_user_id` index (reported as unused)
     
  Note: PostgreSQL's query planner will still efficiently handle foreign key
  lookups through constraint enforcement mechanisms. If performance issues
  arise in the future, these indexes can be recreated.
  
  **Regarding Leaked Password Protection:**
  The HaveIBeenPwned password breach protection must be enabled through
  the Supabase Dashboard under Authentication > Settings > Security.
  This is a configuration setting that cannot be controlled via SQL migrations.
*/

-- Remove unused indexes
DROP INDEX IF EXISTS idx_crypto_wallets_user_id;
DROP INDEX IF EXISTS idx_bank_accounts_user_id;
