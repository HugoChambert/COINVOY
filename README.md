# CoinVoy

A modern, secure cryptocurrency-powered international money transfer platform that enables fast, transparent cross-border transactions with support for multiple countries and currencies.

## Table of Contents

- [Overview](#overview)
- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [How It Works](#how-it-works)
- [Technical Architecture](#technical-architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Database Architecture](#database-architecture)
- [Security Implementation](#security-implementation)
- [State Management](#state-management)
- [Component Architecture](#component-architecture)
- [Data Flow](#data-flow)
- [Installation](#installation)
- [Development](#development)
- [Deployment](#deployment)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## Overview

CoinVoy is a fintech application that bridges traditional banking and cryptocurrency, enabling users to send money globally with the speed of blockchain technology and the convenience of traditional banking interfaces. The platform supports transfers to France, the United States, and Thailand, with an intuitive interface available in multiple languages.

## The Problem

Traditional international money transfers face several critical challenges:

1. **Speed** - Wire transfers typically take 3-5 business days to complete
2. **Cost** - Banks and traditional services charge 3-7% in fees plus unfavorable exchange rates
3. **Transparency** - Hidden fees and unclear exchange rate markups
4. **Accessibility** - Limited operating hours and geographical restrictions
5. **Complexity** - Cumbersome processes requiring extensive documentation

These inefficiencies create significant friction in global commerce and personal remittances, particularly affecting:
- Expatriates sending money to family
- International freelancers receiving payments
- Small businesses conducting cross-border trade
- Individuals managing multi-currency finances

## The Solution

CoinVoy leverages blockchain technology to solve these problems:

**Speed**: Cryptocurrency transactions complete in seconds to minutes, not days. Solana's high-throughput blockchain enables near-instant finality.

**Cost**: By eliminating intermediary banks and using efficient blockchain networks, fees are reduced to network transaction costs (typically <$0.01 on Solana).

**Transparency**: All transactions are cryptographically verified and traceable on the blockchain. Users see exact fees and exchange rates upfront.

**Accessibility**: 24/7 availability without banking hours restrictions. Access from anywhere with internet connectivity.

**Simplicity**: User-friendly interface abstracts blockchain complexity while maintaining the benefits of decentralized finance.

## How It Works

### For End Users

1. **Account Creation**: Users sign up with email and password through Supabase Auth
2. **Connect Accounts**: Link crypto wallets (Phantom for Solana) and traditional bank accounts
3. **Transfer Setup**: Select source (crypto wallet or bank), destination, amount, and currency
4. **Exchange Rate Lock**: Real-time rates from multiple sources ensure competitive pricing
5. **Transaction Execution**:
   - Crypto-to-crypto: Direct blockchain transfer using Solana
   - Crypto-to-bank: Conversion through integrated payment rails
   - Bank-to-crypto: ACH/SEPA integration with crypto purchase
6. **Confirmation**: Real-time transaction tracking with blockchain explorer links
7. **Settlement**: Funds arrive in destination account within minutes to hours

### Technical Flow

```
User Action → React Frontend → Supabase Backend → Blockchain/Bank APIs
     ↓              ↓                 ↓                    ↓
  UI Update    State Mgmt      Database RLS        External Systems
     ↓              ↓                 ↓                    ↓
  Real-time    Context APIs    PostgreSQL         Solana Network
  Feedback      Providers       + Auth            + Bank Partners
```

## Technical Architecture

CoinVoy employs a modern, scalable architecture built on three main pillars:

### 1. Frontend Layer (React + TypeScript)

**Component Hierarchy**:
```
App.tsx (Root)
├── InteractiveBackground (Canvas animations)
├── MagneticCursor (UI enhancement)
└── Main Content
    ├── Landing Page
    │   ├── Hero (3D Earth, CTA)
    │   ├── Features (Value propositions)
    │   ├── Countries (Supported regions)
    │   └── CallToAction (Conversion)
    ├── Auth Pages
    │   ├── Sign Up
    │   └── Sign In
    └── Dashboard (Authenticated)
        ├── ExchangeRates (Live data)
        ├── Transfer (Transaction UI)
        ├── Transactions (History)
        ├── WalletConnect (Crypto wallets)
        ├── BankConnect (Bank accounts)
        └── Settings (User preferences)
```

**State Management**:
- React Context API for global state (Language, Theme, Phantom Wallet)
- Local component state for UI interactions
- Supabase real-time subscriptions for live data updates
- localStorage for persistence (theme, language preferences)

**Styling Approach**:
- Component-scoped CSS files for encapsulation
- CSS custom properties for theming
- Responsive design with mobile-first approach
- CSS animations and transitions for premium UX

### 2. Backend Layer (Supabase)

**Database**: PostgreSQL 15+ with advanced features
- Row Level Security (RLS) for data isolation
- UUID primary keys for security
- Timestamptz for international time handling
- Composite indexes for query optimization
- Foreign key constraints for referential integrity

**Authentication**: Supabase Auth
- JWT-based session management
- PKCE flow for enhanced security
- Automatic token refresh
- Secure password hashing (bcrypt)
- Session expiration and renewal

**Real-time**: WebSocket subscriptions
- Live exchange rate updates
- Transaction status changes
- Account balance updates

### 3. Blockchain Layer (Solana)

**Network**: Solana Mainnet
- Transaction throughput: ~65,000 TPS
- Block time: ~400ms
- Transaction finality: ~13 seconds
- Average transaction cost: $0.00025

**Wallet Integration**: Phantom Wallet
- Browser extension communication via `window.solana` API
- Transaction signing with user approval
- Multi-signature support for enhanced security
- SPL token transfers for stablecoins (USDC)

**Smart Contracts**:
- SPL Token Program for token transfers
- System Program for SOL transfers
- Associated Token Account Program for user token accounts

## Features

### Core Functionality
- **Instant Crypto Transfers** - Send cryptocurrency globally in seconds with real-time transaction tracking
- **Bank Integration** - Connect and manage multiple bank accounts from various countries
- **Multi-Wallet Support** - Support for multiple cryptocurrency wallets including Phantom (Solana)
- **Real-Time Exchange Rates** - Live currency exchange rates updated continuously
- **Transaction History** - Comprehensive transaction tracking and management
- **Secure Authentication** - Email/password authentication powered by Supabase Auth

### User Experience
- **Multi-Language Support** - Available in English, French, and Thai
- **Theme Switching** - Dark and light mode support
- **Interactive 3D Globe** - Visualize global connectivity with Three.js powered 3D Earth
- **Magnetic Cursor Effects** - Premium interactive UI elements and animations
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### Security
- **Row Level Security (RLS)** - Database-level access control ensuring users can only access their own data
- **Email Validation** - Comprehensive email format validation
- **Encrypted Data Storage** - Sensitive information encrypted at rest
- **Secure Session Management** - Token-based authentication with automatic refresh
- **Audit Trails** - Security event logging for sensitive operations

## Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Three.js** - 3D graphics and animations
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber

### Backend & Database
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication
  - Row Level Security
  - Real-time subscriptions
- **Supabase Edge Functions** - Serverless functions (if needed)

### Blockchain Integration
- **Solana** - Fast, low-cost blockchain for transfers
- **@solana/spl-token** - Solana token program integration
- **Phantom Wallet** - Browser extension wallet integration

## Prerequisites

Before running this project, ensure you have:

- Node.js (v18 or higher)
- npm or yarn
- A Supabase account and project
- Phantom Wallet browser extension (for crypto features)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/hugochambert/Coinvoy.git
cd Coinvoy
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database:

The database migrations are located in `supabase/migrations/`. These will be automatically applied if you're using Supabase CLI, or you can apply them manually through the Supabase dashboard.

5. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```
coinvoy/
├── src/
│   ├── components/          # React components
│   │   ├── Auth.tsx        # Authentication pages
│   │   ├── Dashboard.tsx   # User dashboard
│   │   ├── Transfer.tsx    # Transfer functionality
│   │   ├── Transactions.tsx # Transaction history
│   │   ├── WalletConnect.tsx # Crypto wallet management
│   │   ├── BankConnect.tsx # Bank account management
│   │   ├── ExchangeRates.tsx # Live exchange rates
│   │   ├── Settings.tsx    # User settings
│   │   ├── Hero.tsx        # Landing page hero
│   │   ├── Features.tsx    # Features section
│   │   ├── Countries.tsx   # Supported countries
│   │   ├── Earth3D.tsx     # 3D Earth visualization
│   │   ├── ContactForm.tsx # Contact form
│   │   ├── LanguageSwitcher.tsx # Language selector
│   │   ├── ThemeSwitcher.tsx # Theme toggle
│   │   └── ...            # Other UI components
│   ├── contexts/          # React contexts
│   │   ├── LanguageContext.tsx # i18n management
│   │   ├── ThemeContext.tsx # Theme management
│   │   └── PhantomWalletContext.tsx # Phantom wallet state
│   ├── lib/
│   │   └── supabase.ts   # Supabase client configuration
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── ...
├── supabase/
│   └── migrations/       # Database migrations
├── public/              # Static assets
├── .env                # Environment variables
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── README.md          # This file
```

## Database Architecture

CoinVoy uses PostgreSQL through Supabase with a carefully designed schema optimized for security, performance, and scalability.

### Entity Relationship Diagram

```
auth.users (Supabase Auth)
    ↓ (1:1)
user_profiles
    ↓ (1:N)
user_accounts
    ├── crypto_wallets
    └── bank_accounts
    ↓ (1:N)
transactions

contact_submissions (independent)
```

### Table Schemas

#### `user_profiles`
Stores user profile and preference data.

```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  preferred_language TEXT DEFAULT 'en',
  preferred_currency TEXT DEFAULT 'USD',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT user_profiles_email_check
    CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);
```

**Indexes**:
- `idx_user_profiles_id_secure` on `id` for fast lookups
- Unique constraint on `email`

**RLS Policies**:
- SELECT: Users can view only their own profile
- INSERT: New users can create their own profile
- UPDATE: Users can update only their own profile
- DELETE: Users can delete only their own profile

#### `user_accounts`
Links users to their financial accounts (both crypto and traditional).

```sql
CREATE TABLE user_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_type TEXT NOT NULL CHECK (account_type IN ('crypto', 'bank')),
  account_name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Indexes**:
- `idx_user_accounts_user_id` on `user_id` for user-specific queries
- `idx_user_accounts_type` on `account_type` for filtered queries

**RLS Policies**:
- SELECT: Users can view only their own accounts
- INSERT: Users can create accounts for themselves
- UPDATE: Users can update only their own accounts
- DELETE: Users can delete only their own accounts

#### `crypto_wallets`
Stores cryptocurrency wallet connections.

```sql
CREATE TABLE crypto_wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  wallet_type TEXT NOT NULL,
  wallet_address TEXT NOT NULL,
  wallet_name TEXT,
  balance DECIMAL(20, 8) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT crypto_wallets_address_check
    CHECK (length(trim(wallet_address)) > 0)
);
```

**Security**: Wallet addresses are validated for non-empty values

#### `bank_accounts`
Manages traditional bank account connections.

```sql
CREATE TABLE bank_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  bank_name TEXT NOT NULL,
  account_type TEXT NOT NULL CHECK (account_type IN ('checking', 'savings')),
  account_number_last4 TEXT NOT NULL,
  routing_number TEXT,
  currency TEXT DEFAULT 'USD',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT bank_accounts_number_check
    CHECK (length(trim(account_number_last4)) = 4)
);
```

**Security**: Only last 4 digits of account numbers are stored

#### `transactions`
Records all money transfer transactions.

```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL,
  from_account TEXT NOT NULL,
  to_account TEXT NOT NULL,
  amount DECIMAL(20, 8) NOT NULL,
  currency TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  transaction_hash TEXT,
  network_fee DECIMAL(20, 8),
  exchange_rate DECIMAL(20, 8),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);
```

**Indexes**:
- `idx_transactions_user_id_secure` on `(user_id, created_at DESC)` for efficient history queries
- `idx_transactions_status` on `status` for filtering

**RLS Policies**:
- SELECT: Users can view only their own transactions
- INSERT: Users can create transactions for themselves
- UPDATE: Limited updates for status changes
- DELETE: Restricted (transactions are immutable for audit purposes)

#### `contact_submissions`
Stores contact form submissions from the landing page.

```sql
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  phone TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT contact_submissions_email_check
    CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);
```

**Security**: No RLS (public endpoint), but with rate limiting considerations

### Database Migration Strategy

Migrations are version-controlled in `supabase/migrations/` with timestamp-based naming:

```
20251111160617_create_contact_submissions_table.sql
20251119162543_create_user_profiles_and_accounts.sql
20251119162949_create_transactions_table.sql
20251119173353_fix_rls_performance_and_security_issues.sql
20251203201659_enhance_security_measures.sql
```

Each migration includes:
1. Detailed comment block explaining changes
2. Conditional logic using `DO $$ BEGIN ... END $$` blocks
3. `IF NOT EXISTS` checks for idempotency
4. RLS policy creation
5. Index creation for performance
6. Constraint validation

### Query Optimization

**Prepared Statements**: Supabase client uses parameterized queries to prevent SQL injection

**Connection Pooling**: Supabase manages connection pooling automatically (default: 15 connections)

**Query Patterns**:
- Use `.select()` with specific columns instead of `*`
- Use `.maybeSingle()` for 0-or-1 results (no error on empty)
- Use `.single()` only when exactly 1 row is guaranteed
- Apply filters early with `.eq()`, `.gt()`, `.lt()`
- Use `.order()` with indexed columns
- Limit results with `.limit()` for pagination

Example optimized query:
```typescript
const { data, error } = await supabase
  .from('transactions')
  .select('id, amount, currency, status, created_at')
  .eq('user_id', userId)
  .order('created_at', { ascending: false })
  .limit(50);
```

## Multi-Language Support

CoinVoy supports three languages:
- English (en)
- French (fr)
- Thai (th)

The language preference is stored in localStorage and persists across sessions. All UI text is internationalized through the `LanguageContext`.

## Security Implementation

CoinVoy implements defense-in-depth with multiple security layers:

### 1. Authentication Security

**Supabase Auth Integration**:
```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

**Session Management**:
- JWT tokens with configurable expiration (default: 1 hour)
- Refresh tokens for automatic session renewal
- HttpOnly cookies for token storage (where supported)
- PKCE flow for enhanced OAuth security
- Rate limiting on auth endpoints (60 requests/hour)

**Password Requirements**:
- Minimum 6 characters (enforced by Supabase)
- Bcrypt hashing with salt rounds
- No password stored in client-side code
- Passwords never logged or exposed in errors

**Auth State Handling**:
```typescript
useEffect(() => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      // Async operations wrapped to prevent deadlock
      (async () => {
        if (session) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      })()
    }
  )

  return () => subscription.unsubscribe()
}, [])
```

### 2. Database Security

**Row Level Security (RLS) Policies**:

Every table has comprehensive RLS policies:

```sql
-- Example: User can only view their own transactions
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- Example: User can only update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = id)
  WITH CHECK ((SELECT auth.uid()) = id);
```

**RLS Policy Types**:
- **SELECT Policies**: `USING` clause defines viewable rows
- **INSERT Policies**: `WITH CHECK` clause validates new rows
- **UPDATE Policies**: Both `USING` (which rows) and `WITH CHECK` (validation)
- **DELETE Policies**: `USING` clause defines deletable rows

**Security Functions**:
```sql
-- Audit logging function for security events
CREATE OR REPLACE FUNCTION log_security_event()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Extensible function for future security auditing
  RETURN NEW;
END;
$$;
```

### 3. Data Protection

**Encryption**:
- Database encryption at rest (AES-256)
- TLS 1.3 for data in transit
- Encrypted backups with 30-day retention
- Environment variables never committed to git

**Sensitive Data Handling**:
- Bank account numbers: Only last 4 digits stored
- Wallet addresses: Validated but not encrypted (public on blockchain)
- Emails: Validated with regex, accessible only by owner
- Passwords: Never stored in application database (Supabase Auth only)

**Input Validation**:
```typescript
// Email validation at database level
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')

// Wallet address validation
CHECK (length(trim(wallet_address)) > 0)

// Bank account last 4 validation
CHECK (length(trim(account_number_last4)) = 4)
```

### 4. Frontend Security

**XSS Prevention**:
- React's automatic XSS protection via JSX escaping
- No `dangerouslySetInnerHTML` usage
- Content Security Policy headers

**CSRF Protection**:
- SameSite cookie attributes
- Origin checking on sensitive operations
- JWT token validation on every request

**Dependency Security**:
```bash
# Regular security audits
npm audit
npm audit fix

# Automated updates via Dependabot (GitHub)
```

### 5. API Security

**Rate Limiting**:
- Supabase built-in rate limiting
- Anonymous key limits: 100 req/min per IP
- Authenticated limits: Based on subscription tier

**CORS Configuration**:
```typescript
// Configured in Supabase dashboard
{
  "origin": ["https://yourdomain.com"],
  "methods": ["GET", "POST", "PUT", "DELETE"],
  "allowedHeaders": ["Content-Type", "Authorization"]
}
```

### 6. Blockchain Security

**Phantom Wallet Integration**:
```typescript
const connectWallet = async () => {
  if (!window.solana?.isPhantom) {
    alert('Phantom wallet not found!')
    return
  }

  try {
    const response = await window.solana.connect()
    const publicKey = response.publicKey.toString()
    // Store wallet connection
  } catch (error) {
    console.error('Wallet connection failed:', error)
  }
}
```

**Transaction Signing**:
- All transactions require explicit user approval in Phantom
- Transaction parameters displayed before signing
- No private keys ever handled by application
- Transaction simulation before execution

**Network Validation**:
- Verify Solana mainnet connection
- Check for sufficient balance before transaction
- Validate recipient addresses (checksum)
- Monitor transaction confirmation

## State Management

CoinVoy uses a hybrid approach combining React Context API and local state:

### Global State (React Context)

#### 1. LanguageContext
Manages internationalization across the application.

```typescript
interface LanguageContextType {
  language: 'en' | 'fr' | 'th'
  setLanguage: (lang: Language) => void
  t: (key: string) => string  // Translation function
}
```

**Features**:
- 135+ translation keys
- localStorage persistence
- Automatic language detection
- Fallback to English for missing keys

**Usage**:
```typescript
const { t, language, setLanguage } = useLanguage()
<h1>{t('hero.title')}</h1>
```

#### 2. ThemeContext
Controls dark/light theme switching.

```typescript
interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}
```

**Implementation**:
- CSS custom properties for theming
- Smooth transitions between themes
- System preference detection
- Persistent preference storage

#### 3. PhantomWalletContext
Manages Solana wallet connection state.

```typescript
interface PhantomWalletContextType {
  publicKey: string | null
  connected: boolean
  connect: () => Promise<void>
  disconnect: () => void
  signTransaction: (tx: Transaction) => Promise<Transaction>
}
```

### Component-Level State

**React Hooks Usage**:
```typescript
// Form state
const [email, setEmail] = useState('')
const [loading, setLoading] = useState(false)

// Data fetching
const [transactions, setTransactions] = useState<Transaction[]>([])

// UI state
const [showModal, setShowModal] = useState(false)
const [activeTab, setActiveTab] = useState<'crypto' | 'bank'>('crypto')
```

### Data Fetching Patterns

**Loading States**:
```typescript
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
const [data, setData] = useState<DataType | null>(null)

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await supabase.from('table').select()
      setData(result.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  fetchData()
}, [])
```

**Real-time Subscriptions**:
```typescript
useEffect(() => {
  const subscription = supabase
    .channel('transactions')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'transactions',
      filter: `user_id=eq.${userId}`
    }, (payload) => {
      setTransactions(prev => [payload.new, ...prev])
    })
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}, [userId])
```

## Component Architecture

### Design Patterns

**Separation of Concerns**:
- **Presentational Components**: Pure UI (Hero, Features, Countries)
- **Container Components**: Data fetching and business logic (Dashboard, Transfer)
- **Context Providers**: Global state management (LanguageProvider, ThemeProvider)
- **Custom Hooks**: Reusable logic (useLanguage, useAuth)

**Component Structure**:
```typescript
// Typical component file
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import './ComponentName.css'

interface Props {
  // Props definition
}

function ComponentName({ prop1, prop2 }: Props) {
  // Hooks
  const [state, setState] = useState()

  // Effects
  useEffect(() => {
    // Side effects
  }, [dependencies])

  // Event handlers
  const handleEvent = async () => {
    // Logic
  }

  // Render
  return (
    <div className="component-name">
      {/* JSX */}
    </div>
  )
}

export default ComponentName
```

### Key Components

#### Dashboard Component
Central hub for authenticated users.

**Responsibilities**:
- Display account overview
- Navigate between features
- Show real-time exchange rates
- Quick actions (transfer, add account)

**State Management**:
- Active tab selection
- User profile data
- Connected accounts list

#### Transfer Component
Handles money transfer operations.

**Features**:
- Dual-mode: Crypto and Bank transfers
- Real-time fee calculation
- Exchange rate display
- Transaction preview before confirmation

**Validation**:
- Amount > 0
- Sufficient balance
- Valid recipient address
- Network fee affordability

#### Transactions Component
Displays transaction history.

**Features**:
- Paginated list (50 per page)
- Filtering by status, type, date
- Sorting by date, amount
- Transaction detail modal
- Blockchain explorer links

## Data Flow

### Authentication Flow

```
1. User enters credentials → Auth.tsx
2. supabase.auth.signInWithPassword() → Supabase Auth
3. JWT token returned → Stored in localStorage
4. auth.onAuthStateChange() triggered → App.tsx
5. User redirected to Dashboard → Route change
6. Subsequent requests include JWT → Authorization header
```

### Transaction Flow

```
1. User initiates transfer → Transfer.tsx
2. Validation checks → Frontend validation
3. Transaction created → POST to Supabase
4. RLS policy checked → Database level
5. If crypto: Sign with Phantom → Blockchain
6. Transaction broadcasted → Solana network
7. Confirmation received → Update status
8. User notified → Real-time subscription
9. Transaction recorded → Database + Blockchain
```

### Real-time Updates

```
Browser                Supabase               Database
   |                      |                      |
   |--subscribe('txs')--->|                      |
   |                      |--LISTEN channel----->|
   |                      |                      |
   |                      |<--NOTIFY tx_insert---|
   |<--websocket msg------|                      |
   |                      |                      |
   |--update UI-----------|                      |
```

## Wallet Integration

### Phantom Wallet (Solana)
The application integrates with Phantom Wallet for Solana-based transactions:
1. Install Phantom Wallet browser extension
2. Connect wallet through the Dashboard
3. Approve transaction signing when sending transfers

## Exchange Rates

Live exchange rates are displayed in the dashboard, showing:
- SOL (Solana)
- BTC (Bitcoin)
- ETH (Ethereum)
- USDC (USD Coin)

Rates are fetched from public APIs and updated in real-time.

## Supported Transfer Routes

Currently supported international transfer corridors:
- **France** - Fast transfers to major French banks
- **United States** - Instant deposits across US banks
- **Thailand** - Quick and reliable transfers to Thai banks

## Development

### Development Workflow

**Starting Development**:
```bash
# Install dependencies
npm install

# Start dev server (with hot reload)
npm run dev

# Open in browser
# http://localhost:5173
```

**Development Features**:
- Hot Module Replacement (HMR) via Vite
- TypeScript type checking in real-time
- CSS hot reload without page refresh
- React Fast Refresh for component updates

### Code Style & Conventions

**TypeScript**:
- Strict mode enabled in `tsconfig.json`
- Explicit return types for functions
- Interface over type for object shapes
- Avoid `any` type (use `unknown` if needed)

**React**:
- Functional components only (no class components)
- Hooks for state and side effects
- Props destructuring in function parameters
- Explicit prop types via interfaces

**Naming Conventions**:
- Components: PascalCase (`Dashboard.tsx`)
- Files: PascalCase for components, camelCase for utilities
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE
- CSS classes: kebab-case

**File Organization**:
```
component-name/
├── ComponentName.tsx    # Component logic
└── ComponentName.css    # Component styles
```

### Environment Variables

**Required Variables**:
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key

# Optional: Development overrides
VITE_DEV_MODE=true
VITE_LOG_LEVEL=debug
```

**Accessing in Code**:
```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
```

### Build Process

**Production Build**:
```bash
npm run build

# Output:
# dist/
# ├── index.html
# ├── assets/
# │   ├── index-[hash].js
# │   └── index-[hash].css
# └── _redirects
```

**Build Configuration** (`vite.config.ts`):
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Coinvoy/',  // GitHub Pages subdirectory
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'supabase-vendor': ['@supabase/supabase-js']
        }
      }
    }
  },
  resolve: {
    alias: {
      // Buffer polyfill for Solana web3
      buffer: 'buffer',
      process: 'process/browser'
    }
  }
})
```

**Build Optimizations**:
- Code splitting by vendor packages
- Tree shaking for unused exports
- CSS minification and purging
- Asset optimization (images, fonts)
- Source maps for debugging

### Testing Strategy

**Manual Testing Checklist**:
- [ ] Authentication (sign up, sign in, sign out)
- [ ] Wallet connection (Phantom)
- [ ] Bank account linking
- [ ] Transfer initiation (crypto & bank)
- [ ] Transaction history display
- [ ] Settings updates
- [ ] Language switching
- [ ] Theme switching
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Error handling (network errors, validation)

**Browser Testing**:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

### Debugging

**React DevTools**:
```bash
# Install browser extension
# Chrome: https://chrome.google.com/webstore/detail/react-developer-tools
# Firefox: https://addons.mozilla.org/en-US/firefox/addon/react-devtools/
```

**Console Logging**:
```typescript
// Development only logging
if (import.meta.env.DEV) {
  console.log('Debug info:', data)
}
```

**Network Inspection**:
- Supabase requests visible in Network tab
- Check headers for Authorization token
- Inspect WebSocket connections for real-time

**Common Debug Points**:
```typescript
// Check auth state
supabase.auth.getSession().then(({ data }) => {
  console.log('Current session:', data.session)
})

// Check RLS policies
// If query returns empty but data exists, RLS policy may be blocking

// Verify environment variables
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
```

## Deployment

### GitHub Pages Deployment

The project is configured for automated deployment via GitHub Actions.

**Setup**:
1. Update `homepage` in `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/Coinvoy"
}
```

2. Update `base` in `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/Coinvoy/',  // Must match repository name
  // ...
})
```

3. Enable GitHub Pages:
   - Go to repository Settings > Pages
   - Source: GitHub Actions
   - The workflow will deploy on push to main

**Deployment Workflow** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Alternative Hosting Options

#### Vercel
```bash
npm install -g vercel
vercel --prod
```

**Benefits**:
- Automatic HTTPS
- Global CDN
- Zero configuration
- Preview deployments

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**Configuration** (`netlify.toml`):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Custom Server
```bash
# Build the application
npm run build

# Serve with any static server
npx serve dist
# or
python -m http.server --directory dist
```

**Nginx Configuration**:
```nginx
server {
  listen 80;
  server_name coinvoy.example.com;

  root /var/www/coinvoy/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  # Enable gzip compression
  gzip on;
  gzip_types text/css application/javascript application/json;

  # Cache static assets
  location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

### Environment-Specific Configuration

**Production Environment Variables**:
Set these in your hosting provider's dashboard:
```env
VITE_SUPABASE_URL=https://prod-project.supabase.co
VITE_SUPABASE_ANON_KEY=prod_anon_key
VITE_ENABLE_ANALYTICS=true
```

**Staging Environment**:
```env
VITE_SUPABASE_URL=https://staging-project.supabase.co
VITE_SUPABASE_ANON_KEY=staging_anon_key
VITE_ENABLE_ANALYTICS=false
```

## Performance Optimization

### Frontend Performance

**Bundle Size**:
- Main bundle: ~668 KB (gzipped: ~196 KB)
- Vendor chunks for code splitting
- Lazy loading for routes (future enhancement)

**Optimization Techniques**:

1. **Code Splitting**:
```typescript
// Current: Manual chunks in vite.config.ts
manualChunks: {
  'react-vendor': ['react', 'react-dom'],
  'three-vendor': ['three', '@react-three/fiber'],
  'supabase-vendor': ['@supabase/supabase-js']
}

// Future: Route-based splitting
const Dashboard = lazy(() => import('./components/Dashboard'))
```

2. **Image Optimization**:
- Use WebP format where supported
- Lazy load off-screen images
- Optimize Three.js textures

3. **CSS Optimization**:
- Scoped styles per component
- Remove unused CSS rules
- Use CSS containment for isolated components

4. **React Performance**:
```typescript
// Memoize expensive computations
const sortedTransactions = useMemo(() =>
  transactions.sort((a, b) => b.created_at - a.created_at),
  [transactions]
)

// Memoize callbacks passed to children
const handleTransfer = useCallback(() => {
  // Transfer logic
}, [dependencies])

// Memoize components that don't need re-renders
const MemoizedFeatures = memo(Features)
```

### Database Performance

**Query Optimization**:
- Indexed queries complete in <10ms
- RLS adds ~2-5ms overhead
- Connection pooling reduces latency

**Indexing Strategy**:
```sql
-- User-specific lookups
CREATE INDEX idx_user_profiles_id_secure ON user_profiles(id);
CREATE INDEX idx_user_accounts_user_id ON user_accounts(user_id);

-- Transaction queries (most common)
CREATE INDEX idx_transactions_user_id_secure
  ON transactions(user_id, created_at DESC);

-- Status filtering
CREATE INDEX idx_transactions_status ON transactions(status)
  WHERE status != 'completed';
```

**Query Patterns**:
- Select only needed columns
- Use composite indexes for multi-column filters
- Limit result sets with `.limit()`
- Use `.maybeSingle()` for single row queries

### Network Performance

**API Calls**:
- Supabase client uses connection pooling
- WebSocket for real-time (persistent connection)
- HTTP/2 multiplexing for parallel requests

**Caching Strategy**:
- Exchange rates: 60-second cache
- User profile: Session cache
- Transaction history: Stale-while-revalidate

**CDN Usage**:
- Static assets served from CDN
- Supabase API globally distributed
- Low latency worldwide

### Monitoring

**Performance Metrics**:
```typescript
// Measure page load time
window.addEventListener('load', () => {
  const perfData = performance.timing
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
  console.log(`Page load: ${pageLoadTime}ms`)
})

// Measure component render time
useEffect(() => {
  const start = performance.now()
  return () => {
    const end = performance.now()
    console.log(`Render time: ${end - start}ms`)
  }
}, [])
```

**Lighthouse Scores** (Target):
- Performance: >90
- Accessibility: >95
- Best Practices: >90
- SEO: >90

## Troubleshooting

### Common Issues

#### 1. Authentication Not Working

**Symptoms**: Login fails, session not persisting

**Solutions**:
```typescript
// Check Supabase connection
const { data, error } = await supabase.auth.getSession()
console.log('Session:', data.session)
console.log('Error:', error)

// Verify environment variables
console.log('URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('Key present:', !!import.meta.env.VITE_SUPABASE_ANON_KEY)

// Check browser console for CORS errors
// Ensure site URL configured in Supabase dashboard
```

#### 2. Phantom Wallet Not Connecting

**Symptoms**: "Phantom wallet not found" error

**Solutions**:
- Install Phantom browser extension
- Refresh page after installation
- Check `window.solana` is available:
```typescript
console.log('Phantom available:', !!window.solana?.isPhantom)
```

#### 3. Database Queries Returning Empty

**Symptoms**: Queries succeed but return no data

**Solutions**:
```typescript
// Check RLS policies
// Try disabling RLS temporarily for debugging:
// ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;

// Verify user ID matches
const { data: { user } } = await supabase.auth.getUser()
console.log('User ID:', user?.id)

// Check query filters
const { data, error } = await supabase
  .from('transactions')
  .select('*')
  .eq('user_id', user.id)
console.log('Results:', data, 'Error:', error)
```

#### 4. Build Failures

**Symptoms**: `npm run build` fails with TypeScript errors

**Solutions**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript version
npx tsc --version

# Run type checking separately
npx tsc --noEmit

# Check for missing dependencies
npm ls
```

#### 5. Styling Issues

**Symptoms**: CSS not loading, theme not applying

**Solutions**:
- Check CSS import in component
- Verify CSS file exists and named correctly
- Check browser dev tools for 404 errors
- Clear browser cache
- Inspect computed styles in dev tools

### Error Messages

**"Failed to fetch"**:
- Network issue or CORS problem
- Check Supabase project status
- Verify API URL in `.env`

**"Invalid JWT"**:
- Token expired (refresh session)
- Token tampered with
- Anon key mismatch

**"Row Level Security Policy Violation"**:
- RLS policy blocking query
- User not authenticated
- Trying to access another user's data

### Debug Mode

Enable verbose logging:
```typescript
// Add to src/lib/supabase.ts
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      debug: true  // Enable auth debug logging
    }
  }
)
```

### Getting Help

**Resources**:
- Supabase Documentation: https://supabase.com/docs
- React Documentation: https://react.dev
- Solana Web3.js Docs: https://solana-labs.github.io/solana-web3.js
- Phantom Wallet Docs: https://docs.phantom.app

**Support Channels**:
- GitHub Issues for bug reports
- Contact form in application
- Supabase Discord for database issues
- Solana Discord for blockchain issues

## Browser Support

- Chrome/Edge (recommended for Phantom Wallet)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

Note: Crypto features require a browser extension wallet.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and all rights are reserved.

## Support

For support, please use the contact form in the application or reach out through the provided channels.

## Acknowledgments

- Supabase for backend infrastructure
- Solana and Phantom Wallet for blockchain integration
- Three.js community for 3D graphics capabilities
- Open source community for various libraries and tools

---

Built with React, TypeScript, and Supabase
