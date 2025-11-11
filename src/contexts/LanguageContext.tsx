import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'th';

interface Translations {
  [key: string]: {
    en: string;
    fr: string;
    th: string;
  };
}

const translations: Translations = {
  'nav.features': { en: 'Features', fr: 'Fonctionnalités', th: 'คุณสมบัติ' },
  'nav.countries': { en: 'Countries', fr: 'Pays', th: 'ประเทศ' },
  'nav.contact': { en: 'Contact', fr: 'Contact', th: 'ติดต่อ' },
  'nav.getStarted': { en: 'Get Started', fr: 'Commencer', th: 'เริ่มต้น' },
  'nav.signOut': { en: 'Sign Out', fr: 'Se déconnecter', th: 'ออกจากระบบ' },
  'hero.title': { en: 'Transfer Money Globally', fr: 'Transférer de l\'argent dans le monde entier', th: 'โอนเงินทั่วโลก' },
  'hero.subtitle': { en: 'With Crypto Speed', fr: 'Avec la vitesse crypto', th: 'ด้วยความเร็วคริปโต' },
  'hero.description': { en: 'Send money to France, America, and Thailand instantly using cryptocurrency. Fast, secure, and transparent international transfers.', fr: 'Envoyez de l\'argent en France, en Amérique et en Thaïlande instantanément en utilisant la crypto-monnaie. Transferts internationaux rapides, sécurisés et transparents.', th: 'ส่งเงินไปฝรั่งเศส อเมริกา และไทยทันทีด้วยคริปโทเคอเรนซี การโอนเงินระหว่างประเทศที่รวดเร็ว ปลอดภัย และโปร่งใส' },
  'hero.startTransfer': { en: 'Start Transfer', fr: 'Commencer le transfert', th: 'เริ่มโอน' },
  'hero.learnMore': { en: 'Learn More', fr: 'En savoir plus', th: 'เรียนรู้เพิ่มเติม' },
  'dashboard.title': { en: 'Dashboard', fr: 'Tableau de bord', th: 'แดชบอร์ด' },
  'dashboard.transactions': { en: 'Transactions', fr: 'Transactions', th: 'ธุรกรรม' },
  'dashboard.settings': { en: 'Settings', fr: 'Paramètres', th: 'การตั้งค่า' },
  'dashboard.liveRates': { en: 'Live Exchange Rates', fr: 'Taux de change en direct', th: 'อัตราแลกเปลี่ยนสด' },
  'dashboard.sendMoney': { en: 'Send Money', fr: 'Envoyer de l\'argent', th: 'ส่งเงิน' },
  'dashboard.connectedAccounts': { en: 'Connected Accounts', fr: 'Comptes connectés', th: 'บัญชีที่เชื่อมต่อ' },
  'transfer.cryptoTransfer': { en: 'Crypto Transfer', fr: 'Transfert crypto', th: 'โอนคริปโต' },
  'transfer.bankTransfer': { en: 'Bank Transfer', fr: 'Virement bancaire', th: 'โอนธนาคาร' },
  'transfer.from': { en: 'From', fr: 'De', th: 'จาก' },
  'transfer.to': { en: 'To Wallet Address', fr: 'Vers l\'adresse du portefeuille', th: 'ไปยังที่อยู่กระเป๋า' },
  'transfer.toAccount': { en: 'To Account', fr: 'Vers le compte', th: 'ไปยังบัญชี' },
  'transfer.amount': { en: 'Amount', fr: 'Montant', th: 'จำนวน' },
  'transfer.currency': { en: 'Currency', fr: 'Devise', th: 'สกุลเงิน' },
  'transfer.send': { en: 'Send Transfer', fr: 'Envoyer', th: 'ส่งโอน' },
  'transfer.processing': { en: 'Processing...', fr: 'Traitement en cours...', th: 'กำลังดำเนินการ...' },
  'wallet.title': { en: 'Crypto Wallets', fr: 'Portefeuilles crypto', th: 'กระเป๋าคริปโต' },
  'wallet.addWallet': { en: '+ Add Wallet', fr: '+ Ajouter un portefeuille', th: '+ เพิ่มกระเป๋า' },
  'wallet.cancel': { en: 'Cancel', fr: 'Annuler', th: 'ยกเลิก' },
  'wallet.connect': { en: 'Connect Wallet', fr: 'Connecter le portefeuille', th: 'เชื่อมต่อกระเป๋า' },
  'bank.title': { en: 'Bank Accounts', fr: 'Comptes bancaires', th: 'บัญชีธนาคาร' },
  'bank.addBank': { en: '+ Add Bank', fr: '+ Ajouter une banque', th: '+ เพิ่มธนาคาร' },
  'bank.connect': { en: 'Connect Bank Account', fr: 'Connecter le compte bancaire', th: 'เชื่อมต่อบัญชีธนาคาร' },
  'common.remove': { en: 'Remove', fr: 'Supprimer', th: 'ลบ' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
