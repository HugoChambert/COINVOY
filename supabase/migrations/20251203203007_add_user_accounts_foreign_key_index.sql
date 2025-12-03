/*
  # Add Index for user_accounts Foreign Key

  ## Summary
  This migration adds a covering index for the foreign key constraint on user_accounts table
  to ensure optimal query performance.

  ## Changes Made

  ### 1. Add Foreign Key Index
  - Add index on `user_accounts.user_id` column
  - This covers the foreign key constraint `user_accounts_user_id_fkey`
  - Improves query performance for:
    - Joins between user_accounts and user_profiles
    - Foreign key constraint validation
    - CASCADE operations on delete/update
    - Queries filtering by user_id

  ### 2. Leaked Password Protection (Manual Configuration Required)
  **IMPORTANT**: Leaked password protection must be enabled manually in Supabase Dashboard:
  
  **Steps to Enable:**
  1. Go to: https://supabase.com/dashboard (your project)
  2. Navigate to: Authentication → Settings
  3. Scroll to: "Password Settings" section
  4. Enable: "Check for compromised passwords"
  5. Save changes
  
  **What this does:**
  - Validates new passwords against HaveIBeenPwned.org database
  - Prevents users from using passwords that have been leaked in data breaches
  - Enhances overall account security
  
  **Note**: This security feature cannot be enabled via SQL migration and requires 
  manual configuration through the Supabase Dashboard.

  ## Performance Impact
  - Faster queries when filtering accounts by user_id
  - Improved performance for foreign key constraint checks
  - Better performance for CASCADE operations
  - Reduced query execution time for joins
*/

-- Add index for user_accounts foreign key to improve query performance
CREATE INDEX IF NOT EXISTS idx_user_accounts_user_id 
ON user_accounts(user_id);

-- Add helpful comment documenting the manual password protection step
COMMENT ON INDEX idx_user_accounts_user_id IS 'Covering index for user_accounts_user_id_fkey foreign key constraint. Improves query performance for joins and foreign key validation.';
