# CoinVoy

A cryptocurrency-powered international money transfer platform enabling fast, secure cross-border transactions to France, the United States, and Thailand.

## Overview

CoinVoy bridges traditional banking and cryptocurrency for instant global money transfers. Built with React, TypeScript, and Supabase, it leverages Solana blockchain for fast, low-cost transactions while maintaining a user-friendly interface.

## Key Features

- **Instant Crypto Transfers** - Send cryptocurrency globally in seconds using Solana blockchain
- **Bank Account Integration** - Connect and manage multiple bank accounts
- **Multi-Wallet Support** - Phantom wallet integration for Solana transactions
- **Real-Time Exchange Rates** - Live currency rates updated continuously
- **Transaction History** - Complete transaction tracking with blockchain verification
- **Multi-Language** - Available in English, French, and Thai
- **Dark/Light Theme** - Customizable interface theme
- **Secure Authentication** - Email/password auth with Supabase
- **Interactive 3D Globe** - Visualize global connectivity with Three.js

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite (build tool)
- Three.js (3D graphics)

**Backend:**
- Supabase (PostgreSQL + Auth + Real-time)
- Row Level Security (RLS) for data protection

**Blockchain:**
- Solana (fast, low-cost transactions)
- Phantom Wallet integration
- SPL Token support

## Quick Start

### Prerequisites
- Node.js v18+
- Phantom Wallet browser extension
- Supabase account

### Installation

```bash
# Clone repository
git clone https://github.com/hugochambert/Coinvoy.git
cd Coinvoy

# Install dependencies
npm install

# Create .env file with your Supabase credentials
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/       # React components (Auth, Dashboard, Transfer, etc.)
├── contexts/        # Global state (Language, Theme, Wallet)
├── lib/            # Supabase client configuration
└── main.tsx        # Application entry point

supabase/
└── migrations/     # Database schema and security policies
```

## Database Schema

**Main Tables:**
- `user_profiles` - User information and preferences
- `user_accounts` - Connected financial accounts
- `transactions` - Transfer history
- `crypto_wallets` - Linked cryptocurrency wallets
- `bank_accounts` - Connected bank accounts (last 4 digits only)
- `contact_submissions` - Contact form submissions

All tables protected by Row Level Security (RLS) - users can only access their own data.

## Security

- **Authentication:** JWT-based sessions with automatic refresh
- **Database:** Row Level Security on all tables
- **Encryption:** AES-256 at rest, TLS 1.3 in transit
- **Data Protection:** Bank account numbers masked, passwords hashed
- **Wallet Security:** All transactions require user approval in Phantom

## Key Components

**Dashboard** - Main hub showing accounts, rates, and quick actions
**Transfer** - Initiate crypto or bank transfers with live fee calculation
**Transactions** - View complete transaction history
**WalletConnect** - Manage connected crypto wallets
**BankConnect** - Manage linked bank accounts
**Settings** - User preferences and account settings

## Environment Variables

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Deployment

Configured for GitHub Pages with automated deployment via GitHub Actions.

```bash
# Build
npm run build

# Output in dist/ folder ready for deployment
```

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers

**Note:** Phantom wallet features require Chrome/Edge browser extension.

## Supported Countries

- **France** - Major French banks
- **United States** - All US banks
- **Thailand** - Major Thai banks

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## License

Private - All rights reserved

## Support

Contact through the application's contact form or GitHub issues.

---

Built with React, TypeScript, Supabase, and Solana
