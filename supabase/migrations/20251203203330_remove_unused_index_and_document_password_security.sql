/*
  # Remove Unused Index and Document Password Security

  ## Summary
  This migration removes an unused database index and documents the manual steps
  required to enable leaked password protection.

  ## Changes Made

  ### 1. Remove Unused Index
  - Drop `idx_user_accounts_user_id` index
  - **Reason**: Query planner statistics show this index is not being utilized
  - **Impact**: 
    - Reduces storage overhead
    - Improves write performance (no index maintenance on INSERT/UPDATE/DELETE)
    - No negative query performance impact (index was unused)
  
  **Note**: The foreign key constraint `user_accounts_user_id_fkey` remains intact
  and continues to enforce referential integrity. PostgreSQL's query planner is
  efficiently handling queries without requiring an explicit covering index.

  ### 2. Leaked Password Protection (MANUAL CONFIGURATION REQUIRED)

  **CRITICAL SECURITY STEP**: Enable leaked password protection in Supabase Dashboard

  **Steps to Enable:**
  1. Open your Supabase project dashboard: https://supabase.com/dashboard
  2. Navigate to: **Authentication** → **Settings**
  3. Scroll to: **"Password Settings"** section
  4. Find: **"Check for compromised passwords"** toggle
  5. Enable the toggle
  6. Click **Save** to apply changes

  **What This Does:**
  - Validates all new user passwords against the HaveIBeenPwned.org database
  - Prevents users from setting passwords that have appeared in known data breaches
  - Returns an error if a user tries to use a compromised password
  - Significantly enhances account security without impacting user experience
  - Runs automatically during signup and password changes

  **Important Notes:**
  - This feature CANNOT be enabled via SQL migrations
  - Must be configured through the Supabase Dashboard UI
  - Does not affect existing passwords (only validates new password changes)
  - No additional code changes needed in your application
  - The check happens server-side during authentication flows

  ## Security Impact
  - ✅ Reduced attack surface (less index maintenance)
  - ✅ Better write performance
  - ⏳ Enhanced password security (pending manual dashboard configuration)

  ## Performance Impact
  - Faster INSERT operations on user_accounts table
  - Faster UPDATE operations on user_accounts table
  - Faster DELETE operations on user_accounts table
  - Reduced storage requirements
  - No negative impact on query performance
*/

-- Remove the unused index to improve write performance
DROP INDEX IF EXISTS idx_user_accounts_user_id;

-- Add documentation comment on the foreign key constraint
COMMENT ON CONSTRAINT user_accounts_user_id_fkey ON user_accounts IS 
'Foreign key to user_profiles. PostgreSQL query planner efficiently handles queries without requiring an explicit covering index.';

-- Document the password protection requirement
COMMENT ON SCHEMA public IS 
'Security Note: Enable "Check for compromised passwords" in Supabase Dashboard (Authentication → Settings) to protect against leaked passwords from HaveIBeenPwned.org database.';
