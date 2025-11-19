/*
  # Add Index for user_accounts Foreign Key

  ## Changes Made

  1. Performance Optimization
    - Add index on `user_accounts.user_id` foreign key column
    - Improves query performance for joins and lookups on this foreign key
    - Essential for queries filtering or joining by user_id

  ## Performance Impact
  - Faster queries when filtering accounts by user_id
  - Improved performance for foreign key constraint checks
  - Better performance for CASCADE operations
*/

-- Add index for user_accounts foreign key
CREATE INDEX IF NOT EXISTS idx_user_accounts_user_id ON user_accounts(user_id);
