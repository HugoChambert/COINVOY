/*
  # Create Contact Submissions Table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `email` (text, required) - Contact email address
      - `phone` (text, required) - Contact phone number
      - `notes` (text, required) - User's message/inquiry
      - `created_at` (timestamptz) - Submission timestamp

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for anonymous users to insert their own submissions
    - Add policy for authenticated users to read only their own submissions
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  phone text NOT NULL,
  notes text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL AND email = (SELECT email FROM auth.users WHERE id = auth.uid()));
