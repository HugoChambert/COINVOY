import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';

interface PhantomProvider {
  isPhantom?: boolean;
  connect: () => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  signAndSendTransaction: (transaction: Transaction) => Promise<{ signature: string }>;
  publicKey?: PublicKey;
}

interface TokenBalance {
  sol: number;
  usdc: number;
  usdt: number;
}

interface PhantomWalletContextType {
  connected: boolean;
  connecting: boolean;
  publicKey: string | null;
  balances: TokenBalance;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  sendSOL: (recipient: string, amount: number) => Promise<string>;
  sendUSDC: (recipient: string, amount: number) => Promise<string>;
  sendUSDT: (recipient: string, amount: number) => Promise<string>;
  refreshBalances: () => Promise<void>;
}

const PhantomWalletContext = createContext<PhantomWalletContextType | undefined>(undefined);

const SOLANA_NETWORK = 'https://api.mainnet-beta.solana.com';
const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
const USDT_MINT = new PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB');

export const PhantomWalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balances, setBalances] = useState<TokenBalance>({ sol: 0, usdc: 0, usdt: 0 });
  const [provider, setProvider] = useState<PhantomProvider | null>(null);
  const [connection, setConnection] = useState<Connection | null>(null);

  useEffect(() => {
    const phantom = (window as any).solana;
    if (phantom?.isPhantom) {
      setProvider(phantom);
      setConnection(new Connection(SOLANA_NETWORK, 'confirmed'));

      phantom.on('connect', (pubKey: PublicKey) => {
        setPublicKey(pubKey.toString());
        setConnected(true);
      });

      phantom.on('disconnect', () => {
        setPublicKey(null);
        setConnected(false);
        setBalances({ sol: 0, usdc: 0, usdt: 0 });
      });

      if (phantom.publicKey) {
        setPublicKey(phantom.publicKey.toString());
        setConnected(true);
      }
    }
  }, []);

  useEffect(() => {
    if (connected && publicKey && connection) {
      fetchBalances();
    }
  }, [connected, publicKey, connection]);

  const fetchBalances = async () => {
    if (!connection || !publicKey) return;

    try {
      const pubKey = new PublicKey(publicKey);

      const solBalanceLamports = await connection.getBalance(pubKey);
      const solBalance = solBalanceLamports / LAMPORTS_PER_SOL;

      let usdcBalance = 0;
      let usdtBalance = 0;

      try {
        const usdcTokenAccount = await getAssociatedTokenAddress(USDC_MINT, pubKey);
        const usdcAccountInfo = await connection.getTokenAccountBalance(usdcTokenAccount);
        usdcBalance = parseFloat(usdcAccountInfo.value.uiAmount?.toString() || '0');
      } catch (e) {
      }

      try {
        const usdtTokenAccount = await getAssociatedTokenAddress(USDT_MINT, pubKey);
        const usdtAccountInfo = await connection.getTokenAccountBalance(usdtTokenAccount);
        usdtBalance = parseFloat(usdtAccountInfo.value.uiAmount?.toString() || '0');
      } catch (e) {
      }

      setBalances({ sol: solBalance, usdc: usdcBalance, usdt: usdtBalance });
    } catch (error) {
    }
  };

  const connect = async () => {
    if (!provider) {
      window.open('https://phantom.app/', '_blank');
      return;
    }

    try {
      setConnecting(true);
      const response = await provider.connect();
      setPublicKey(response.publicKey.toString());
      setConnected(true);
    } catch (error) {
      throw error;
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = async () => {
    if (!provider) return;

    try {
      await provider.disconnect();
      setPublicKey(null);
      setConnected(false);
      setBalances({ sol: 0, usdc: 0, usdt: 0 });
    } catch (error) {
      throw error;
    }
  };

  const sendSOL = async (recipient: string, amount: number): Promise<string> => {
    if (!provider || !connection || !publicKey) {
      throw new Error('Wallet not connected');
    }

    try {
      const fromPubkey = new PublicKey(publicKey);
      const toPubkey = new PublicKey(recipient);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = fromPubkey;

      const { signature } = await provider.signAndSendTransaction(transaction);
      await connection.confirmTransaction(signature);
      await fetchBalances();

      return signature;
    } catch (error) {
      throw error;
    }
  };

  const sendUSDC = async (recipient: string, amount: number): Promise<string> => {
    if (!provider || !connection || !publicKey) {
      throw new Error('Wallet not connected');
    }

    try {
      const fromPubkey = new PublicKey(publicKey);
      const toPubkey = new PublicKey(recipient);

      const fromTokenAccount = await getAssociatedTokenAddress(USDC_MINT, fromPubkey);
      const toTokenAccount = await getAssociatedTokenAddress(USDC_MINT, toPubkey);

      const transaction = new Transaction().add(
        createTransferInstruction(
          fromTokenAccount,
          toTokenAccount,
          fromPubkey,
          amount * 1_000_000,
          [],
          TOKEN_PROGRAM_ID
        )
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = fromPubkey;

      const { signature } = await provider.signAndSendTransaction(transaction);
      await connection.confirmTransaction(signature);
      await fetchBalances();

      return signature;
    } catch (error) {
      throw error;
    }
  };

  const sendUSDT = async (recipient: string, amount: number): Promise<string> => {
    if (!provider || !connection || !publicKey) {
      throw new Error('Wallet not connected');
    }

    try {
      const fromPubkey = new PublicKey(publicKey);
      const toPubkey = new PublicKey(recipient);

      const fromTokenAccount = await getAssociatedTokenAddress(USDT_MINT, fromPubkey);
      const toTokenAccount = await getAssociatedTokenAddress(USDT_MINT, toPubkey);

      const transaction = new Transaction().add(
        createTransferInstruction(
          fromTokenAccount,
          toTokenAccount,
          fromPubkey,
          amount * 1_000_000,
          [],
          TOKEN_PROGRAM_ID
        )
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = fromPubkey;

      const { signature } = await provider.signAndSendTransaction(transaction);
      await connection.confirmTransaction(signature);
      await fetchBalances();

      return signature;
    } catch (error) {
      throw error;
    }
  };

  return (
    <PhantomWalletContext.Provider
      value={{
        connected,
        connecting,
        publicKey,
        balances,
        connect,
        disconnect,
        sendSOL,
        sendUSDC,
        sendUSDT,
        refreshBalances: fetchBalances,
      }}
    >
      {children}
    </PhantomWalletContext.Provider>
  );
};

export const usePhantomWallet = () => {
  const context = useContext(PhantomWalletContext);
  if (context === undefined) {
    throw new Error('usePhantomWallet must be used within a PhantomWalletProvider');
  }
  return context;
};
