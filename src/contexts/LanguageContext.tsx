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
  'features.title': { en: 'Why Choose CoinVoy', fr: 'Pourquoi choisir CoinVoy', th: 'ทำไมต้องเลือก CoinVoy' },
  'features.fast.title': { en: 'Lightning Fast', fr: 'Ultra Rapide', th: 'รวดเร็วเหมือนสายฟ้า' },
  'features.fast.description': { en: 'Complete transfers in minutes, not days. Cryptocurrency enables instant cross-border transactions.', fr: 'Effectuez des transferts en quelques minutes, pas en jours. La crypto-monnaie permet des transactions transfrontalières instantanées.', th: 'โอนเสร็จภายในไม่กี่นาที ไม่ใช่หลายวัน คริปโทเคอเรนซีช่วยให้ทำธุรกรรมข้ามพรมแดนได้ทันที' },
  'features.lowFees.title': { en: 'Low Fees', fr: 'Frais réduits', th: 'ค่าธรรมเนียมต่ำ' },
  'features.lowFees.description': { en: 'Save on traditional banking fees. Our crypto-powered system keeps costs minimal.', fr: 'Économisez sur les frais bancaires traditionnels. Notre système alimenté par la crypto maintient les coûts au minimum.', th: 'ประหยัดค่าธรรมเนียมธนาคารแบบเดิม ระบบคริปโทของเราช่วยลดต้นทุน' },
  'features.secure.title': { en: 'Secure & Transparent', fr: 'Sécurisé et transparent', th: 'ปลอดภัยและโปร่งใส' },
  'features.secure.description': { en: 'Track your transfer in real-time. Blockchain technology ensures security and transparency.', fr: 'Suivez votre transfert en temps réel. La technologie blockchain garantit sécurité et transparence.', th: 'ติดตามการโอนแบบเรียลไทม์ เทคโนโลยีบล็อกเชนรับประกันความปลอดภัยและความโปร่งใส' },
  'features.simple.title': { en: 'Simple Process', fr: 'Processus simple', th: 'กระบวนการง่าย' },
  'features.simple.description': { en: 'Easy to use interface. Send money in three simple steps without technical knowledge.', fr: 'Interface facile à utiliser. Envoyez de l\'argent en trois étapes simples sans connaissances techniques.', th: 'ใช้งานง่าย ส่งเงินได้ใน 3 ขั้นตอนง่ายๆ โดยไม่ต้องมีความรู้ทางเทคนิค' },
  'countries.title': { en: 'Supported Countries', fr: 'Pays pris en charge', th: 'ประเทศที่รองรับ' },
  'countries.subtitle': { en: 'Send money to these countries with ease', fr: 'Envoyez de l\'argent vers ces pays en toute simplicité', th: 'ส่งเงินไปยังประเทศเหล่านี้ได้อย่างง่ายดาย' },
  'countries.france.description': { en: 'Fast transfers to all major French banks', fr: 'Transferts rapides vers toutes les grandes banques françaises', th: 'โอนเร็วไปยังธนาคารใหญ่ทั้งหมดในฝรั่งเศส' },
  'countries.usa.description': { en: 'Instant deposits across the United States', fr: 'Dépôts instantanés dans tous les États-Unis', th: 'ฝากเงินทันทีทั่วสหรัฐอเมริกา' },
  'countries.thailand.description': { en: 'Quick and reliable transfers throughout Thailand', fr: 'Transferts rapides et fiables dans toute la Thaïlande', th: 'โอนเร็วและเชื่อถือได้ทั่วประเทศไทย' },
  'contact.title': { en: 'Contact Us', fr: 'Nous contacter', th: 'ติดต่อเรา' },
  'contact.description': { en: 'Fill out the form below and we\'ll get back to you soon.', fr: 'Remplissez le formulaire ci-dessous et nous vous recontacterons bientôt.', th: 'กรอกแบบฟอร์มด้านล่างและเราจะติดต่อกลับในไม่ช้า' },
  'contact.email': { en: 'Email', fr: 'Email', th: 'อีเมล' },
  'contact.emailPlaceholder': { en: 'your@email.com', fr: 'votre@email.com', th: 'email@ของคุณ.com' },
  'contact.phone': { en: 'Phone Number', fr: 'Numéro de téléphone', th: 'หมายเลขโทรศัพท์' },
  'contact.phonePlaceholder': { en: '+1 (555) 000-0000', fr: '+33 6 00 00 00 00', th: '+66 8 0000 0000' },
  'contact.notes': { en: 'Notes', fr: 'Notes', th: 'หมายเหตุ' },
  'contact.notesPlaceholder': { en: 'Tell us how we can help you...', fr: 'Dites-nous comment nous pouvons vous aider...', th: 'บอกเราว่าเราจะช่วยคุณได้อย่างไร...' },
  'contact.sending': { en: 'Sending...', fr: 'Envoi en cours...', th: 'กำลังส่ง...' },
  'contact.sendMessage': { en: 'Send Message', fr: 'Envoyer le message', th: 'ส่งข้อความ' },
  'contact.success': { en: 'Thank you! We\'ll be in touch soon.', fr: 'Merci! Nous vous contacterons bientôt.', th: 'ขอบคุณ! เราจะติดต่อกลับในไม่ช้า' },
  'contact.error': { en: 'Something went wrong. Please try again.', fr: 'Quelque chose s\'est mal passé. Veuillez réessayer.', th: 'เกิดข้อผิดพลาด กรุณาลองอีกครั้ง' },
  'cta.title': { en: 'Ready to Start Transferring?', fr: 'Prêt à commencer les transferts?', th: 'พร้อมที่จะเริ่มโอนเงินหรือยัง?' },
  'cta.description': { en: 'Join thousands of users who trust CoinVoy for their international money transfers. Get started today and experience the future of cross-border payments.', fr: 'Rejoignez des milliers d\'utilisateurs qui font confiance à CoinVoy pour leurs transferts d\'argent internationaux. Commencez aujourd\'hui et découvrez l\'avenir des paiements transfrontaliers.', th: 'เข้าร่วมกับผู้ใช้หลายพันคนที่วางใจ CoinVoy สำหรับการโอนเงินระหว่างประเทศ เริ่มต้นวันนี้และสัมผัสอนาคตของการชำระเงินข้ามพรมแดน' },
  'cta.button': { en: 'Get Started Now', fr: 'Commencer maintenant', th: 'เริ่มต้นเลย' },
  'footer.privacy': { en: 'Privacy Policy', fr: 'Politique de confidentialité', th: 'นโยบายความเป็นส่วนตัว' },
  'footer.terms': { en: 'Terms of Service', fr: 'Conditions d\'utilisation', th: 'ข้อกำหนดการใช้งาน' },
  'footer.support': { en: 'Support', fr: 'Assistance', th: 'ช่วยเหลือ' },
  'footer.copyright': { en: '© 2025 CoinVoy. All rights reserved.', fr: '© 2025 CoinVoy. Tous droits réservés.', th: '© 2025 CoinVoy สงวนลิขสิทธิ์' },
  'featuresNew.title': { en: 'Powerful Features', fr: 'Fonctionnalités puissantes', th: 'คุณสมบัติที่ทรงพลัง' },
  'featuresNew.description': { en: 'Everything you need to manage your money globally', fr: 'Tout ce dont vous avez besoin pour gérer votre argent dans le monde entier', th: 'ทุกสิ่งที่คุณต้องการเพื่อจัดการเงินของคุณทั่วโลก' },
  'featuresNew.instantTransfers.title': { en: 'Instant Transfers', fr: 'Transferts instantanés', th: 'โอนเงินทันที' },
  'featuresNew.instantTransfers.description': { en: 'Send money globally in seconds with our lightning-fast transfer system. No more waiting days for your money to arrive.', fr: 'Envoyez de l\'argent dans le monde entier en quelques secondes avec notre système de transfert ultra-rapide. Plus besoin d\'attendre des jours pour que votre argent arrive.', th: 'ส่งเงินทั่วโลกในไม่กี่วินาทีด้วยระบบโอนที่รวดเร็วเหมือนสายฟ้า ไม่ต้องรอหลายวันให้เงินของคุณมาถึง' },
  'featuresNew.multiCurrency.title': { en: 'Multi-Currency Support', fr: 'Prise en charge multi-devises', th: 'รองรับหลายสกุลเงิน' },
  'featuresNew.multiCurrency.description': { en: 'Support for over 150 currencies worldwide. Exchange between currencies with competitive rates instantly.', fr: 'Prise en charge de plus de 150 devises dans le monde. Échangez entre devises avec des taux compétitifs instantanément.', th: 'รองรับสกุลเงินมากกว่า 150 สกุลทั่วโลก แลกเปลี่ยนระหว่างสกุลเงินด้วยอัตราที่แข่งขันได้ทันที' },
  'featuresNew.bankIntegration.title': { en: 'Bank Integration', fr: 'Intégration bancaire', th: 'เชื่อมต่อธนาคาร' },
  'featuresNew.bankIntegration.description': { en: 'Connect your bank accounts seamlessly. Link multiple accounts and manage all your finances in one place.', fr: 'Connectez vos comptes bancaires en toute transparence. Liez plusieurs comptes et gérez toutes vos finances en un seul endroit.', th: 'เชื่อมต่อบัญชีธนาคารของคุณได้อย่างราบรื่น เชื่อมโยงหลายบัญชีและจัดการการเงินทั้งหมดของคุณในที่เดียว' },
  'featuresNew.cryptoWallets.title': { en: 'Crypto Wallets', fr: 'Portefeuilles crypto', th: 'กระเป๋าคริปโต' },
  'featuresNew.cryptoWallets.description': { en: 'Store and manage your cryptocurrency safely. Support for Bitcoin, Ethereum, and other major cryptocurrencies.', fr: 'Stockez et gérez votre crypto-monnaie en toute sécurité. Prise en charge de Bitcoin, Ethereum et d\'autres crypto-monnaies majeures.', th: 'เก็บและจัดการคริปโทเคอเรนซีของคุณอย่างปลอดภัย รองรับ Bitcoin, Ethereum และคริปโทเคอเรนซีหลักอื่นๆ' },
  'featuresNew.realTimeRates.title': { en: 'Real-Time Exchange Rates', fr: 'Taux de change en temps réel', th: 'อัตราแลกเปลี่ยนแบบเรียลไทม์' },
  'featuresNew.realTimeRates.description': { en: 'Get live exchange rates updated every minute. Always know the exact amount you will receive.', fr: 'Obtenez des taux de change en direct mis à jour chaque minute. Sachez toujours le montant exact que vous recevrez.', th: 'รับอัตราแลกเปลี่ยนสดที่อัปเดตทุกนาที รู้จำนวนเงินที่คุณจะได้รับอย่างแน่นอนเสมอ' },
  'featuresNew.secureTransactions.title': { en: 'Secure Transactions', fr: 'Transactions sécurisées', th: 'ธุรกรรมที่ปลอดภัย' },
  'featuresNew.secureTransactions.description': { en: 'Bank-level security with end-to-end encryption. Your money and data are always protected.', fr: 'Sécurité de niveau bancaire avec cryptage de bout en bout. Votre argent et vos données sont toujours protégés.', th: 'ความปลอดภัยระดับธนาคารด้วยการเข้ารหัสแบบครบวงจร เงินและข้อมูลของคุณได้รับการปกป้องเสมอ' },
  'auth.createAccount': { en: 'Create Account', fr: 'Créer un compte', th: 'สร้างบัญชี' },
  'auth.welcomeBack': { en: 'Welcome Back', fr: 'Bon retour', th: 'ยินดีต้อนรับกลับ' },
  'auth.signUpDescription': { en: 'Sign up to start transferring money globally', fr: 'Inscrivez-vous pour commencer à transférer de l\'argent dans le monde entier', th: 'สมัครสมาชิกเพื่อเริ่มโอนเงินทั่วโลก' },
  'auth.signInDescription': { en: 'Sign in to continue your transfers', fr: 'Connectez-vous pour continuer vos transferts', th: 'เข้าสู่ระบบเพื่อดำเนินการโอนเงินต่อ' },
  'auth.email': { en: 'Email', fr: 'Email', th: 'อีเมล' },
  'auth.emailPlaceholder': { en: 'your@email.com', fr: 'votre@email.com', th: 'อีเมล@ของคุณ.com' },
  'auth.password': { en: 'Password', fr: 'Mot de passe', th: 'รหัสผ่าน' },
  'auth.passwordPlaceholder': { en: '••••••••', fr: '••••••••', th: '••••••••' },
  'auth.confirmPassword': { en: 'Confirm Password', fr: 'Confirmer le mot de passe', th: 'ยืนยันรหัสผ่าน' },
  'auth.processing': { en: 'Processing...', fr: 'Traitement en cours...', th: 'กำลังดำเนินการ...' },
  'auth.signIn': { en: 'Sign In', fr: 'Se connecter', th: 'เข้าสู่ระบบ' },
  'auth.signUp': { en: 'Sign Up', fr: 'S\'inscrire', th: 'สมัครสมาชิก' },
  'auth.alreadyHaveAccount': { en: 'Already have an account?', fr: 'Vous avez déjà un compte?', th: 'มีบัญชีอยู่แล้ว?' },
  'auth.dontHaveAccount': { en: "Don't have an account?", fr: "Vous n'avez pas de compte?", th: 'ยังไม่มีบัญชี?' },
  'auth.backHome': { en: '← Back to Home', fr: '← Retour à l\'accueil', th: '← กลับสู่หน้าหลัก' },
  'auth.passwordsDoNotMatch': { en: 'Passwords do not match', fr: 'Les mots de passe ne correspondent pas', th: 'รหัสผ่านไม่ตรงกัน' },
  'auth.accountCreated': { en: 'Account created successfully!', fr: 'Compte créé avec succès!', th: 'สร้างบัญชีสำเร็จ!' },
  'auth.networkError': { en: 'Network error. Please try again.', fr: 'Erreur réseau. Veuillez réessayer.', th: 'เกิดข้อผิดพลาดเครือข่าย กรุณาลองอีกครั้ง' },
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
