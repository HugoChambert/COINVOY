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
  'nav.comingSoon': { en: 'Coming soon', fr: 'Bientôt disponible', th: 'เร็วๆ นี้' },
  'nav.contactUs': { en: 'Contact Us', fr: 'Nous contacter', th: 'ติดต่อเรา' },
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
  'rates.loading': { en: 'Loading exchange rates...', fr: 'Chargement des taux de change...', th: 'กำลังโหลดอัตราแลกเปลี่ยน...' },
  'rates.lastUpdate': { en: 'Last updated:', fr: 'Dernière mise à jour:', th: 'อัปเดตล่าสุด:' },
  'transfer.cryptoTransfer': { en: 'Crypto Transfer', fr: 'Transfert crypto', th: 'โอนคริปโต' },
  'transfer.bankTransfer': { en: 'Bank Transfer', fr: 'Virement bancaire', th: 'โอนธนาคาร' },
  'transfer.from': { en: 'From', fr: 'De', th: 'จาก' },
  'transfer.selectSource': { en: 'Select source', fr: 'Sélectionner la source', th: 'เลือกแหล่งที่มา' },
  'transfer.to': { en: 'To Wallet Address', fr: 'Vers l\'adresse du portefeuille', th: 'ไปยังที่อยู่กระเป๋า' },
  'transfer.toAccount': { en: 'To Account', fr: 'Vers le compte', th: 'ไปยังบัญชี' },
  'transfer.toPlaceholder': { en: 'Account number or email', fr: 'Numéro de compte ou email', th: 'หมายเลขบัญชีหรืออีเมล' },
  'transfer.amount': { en: 'Amount', fr: 'Montant', th: 'จำนวน' },
  'transfer.currency': { en: 'Currency', fr: 'Devise', th: 'สกุลเงิน' },
  'transfer.send': { en: 'Send Transfer', fr: 'Envoyer', th: 'ส่งโอน' },
  'transfer.processing': { en: 'Processing...', fr: 'Traitement en cours...', th: 'กำลังดำเนินการ...' },
  'transfer.success': { en: 'Transfer initiated successfully!', fr: 'Transfert initié avec succès!', th: 'เริ่มโอนเรียบร้อยแล้ว!' },
  'transfer.networkFee': { en: 'Network Fee:', fr: 'Frais de réseau:', th: 'ค่าธรรมเนียมเครือข่าย:' },
  'transfer.estimatedTime': { en: 'Estimated Time:', fr: 'Temps estimé:', th: 'เวลาโดยประมาณ:' },
  'wallet.title': { en: 'Crypto Wallets', fr: 'Portefeuilles crypto', th: 'กระเป๋าคริปโต' },
  'wallet.addWallet': { en: '+ Add Wallet', fr: '+ Ajouter un portefeuille', th: '+ เพิ่มกระเป๋า' },
  'wallet.cancel': { en: 'Cancel', fr: 'Annuler', th: 'ยกเลิก' },
  'wallet.connect': { en: 'Connect Wallet', fr: 'Connecter le portefeuille', th: 'เชื่อมต่อกระเป๋า' },
  'wallet.adding': { en: 'Adding...', fr: 'Ajout en cours...', th: 'กำลังเพิ่ม...' },
  'wallet.noWallets': { en: 'No wallets connected', fr: 'Aucun portefeuille connecté', th: 'ไม่มีกระเป๋าที่เชื่อมต่อ' },
  'wallet.type': { en: 'Wallet Type', fr: 'Type de portefeuille', th: 'ประเภทกระเป๋า' },
  'wallet.address': { en: 'Wallet Address', fr: 'Adresse du portefeuille', th: 'ที่อยู่กระเป๋า' },
  'bank.title': { en: 'Bank Accounts', fr: 'Comptes bancaires', th: 'บัญชีธนาคาร' },
  'bank.addBank': { en: '+ Add Bank', fr: '+ Ajouter une banque', th: '+ เพิ่มธนาคาร' },
  'bank.connect': { en: 'Connect Bank Account', fr: 'Connecter le compte bancaire', th: 'เชื่อมต่อบัญชีธนาคาร' },
  'bank.adding': { en: 'Adding...', fr: 'Ajout en cours...', th: 'กำลังเพิ่ม...' },
  'bank.noAccounts': { en: 'No bank accounts connected', fr: 'Aucun compte bancaire connecté', th: 'ไม่มีบัญชีธนาคารที่เชื่อมต่อ' },
  'bank.name': { en: 'Bank Name', fr: 'Nom de la banque', th: 'ชื่อธนาคาร' },
  'bank.namePlaceholder': { en: 'e.g., Chase, Bank of America', fr: 'ex. BNP Paribas, Crédit Agricole', th: 'เช่น กสิกรไทย, ไทยพาณิชย์' },
  'bank.accountType': { en: 'Account Type', fr: 'Type de compte', th: 'ประเภทบัญชี' },
  'bank.checking': { en: 'Checking', fr: 'Courant', th: 'ออมทรัพย์' },
  'bank.savings': { en: 'Savings', fr: 'Épargne', th: 'ออมทรัพย์พิเศษ' },
  'bank.accountNumber': { en: 'Account Number', fr: 'Numéro de compte', th: 'หมายเลขบัญชี' },
  'bank.accountPlaceholder': { en: 'Enter account number', fr: 'Entrez le numéro de compte', th: 'ใส่หมายเลขบัญชี' },
  'bank.securityNote': { en: 'Only last 4 digits will be stored', fr: 'Seuls les 4 derniers chiffres seront stockés', th: 'จะเก็บเฉพาะ 4 หลักสุดท้าย' },
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
