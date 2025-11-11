/*
  # Add Foreign Key Indexes for Performance

  This migration addresses unindexed foreign key warnings:
  
  1. **Add Missing Indexes**
     - Add index on `bank_accounts.user_id` to optimize foreign key queries
     - Add index on `crypto_wallets.user_id` to optimize foreign key queries
  
  These indexes will significantly improve query performance when:
  - Fetching wallets/accounts for specific users
  - Enforcing foreign key constraints
  - Executing RLS policy checks
  - Performing JOIN operations
  
  **Regarding Leaked Password Protection:**
  The HaveIBeenPwned password breach protection is a Supabase Auth
  configuration setting that must be enabled through the Supabase Dashboard
  under Authentication > Settings > Security. It cannot be configured via
  SQL migrations as it's part of the Auth service configuration, not the database schema.
*/

-- Add indexes for foreign keys to improve query performance
CREATE INDEX IF NOT EXISTS idx_crypto_wallets_user_id ON crypto_wallets(user_id);
CREATE INDEX IF NOT EXISTS idx_bank_accounts_user_id ON bank_accounts(user_id);
