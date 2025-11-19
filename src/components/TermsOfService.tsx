import './LegalPage.css'

interface TermsOfServiceProps {
  onClose: () => void
}

export default function TermsOfService({ onClose }: TermsOfServiceProps) {

  return (
    <div className="legal-overlay">
      <div className="legal-modal">
        <div className="legal-header">
          <h1>Terms of Service</h1>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="legal-content">
          <p className="legal-updated">Last Updated: November 19, 2025</p>

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using CoinVoy, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
          </section>

          <section>
            <h2>2. Description of Service</h2>
            <p>CoinVoy provides a platform for international money transfers and currency exchange. Our services include:</p>
            <ul>
              <li>Currency exchange and conversion</li>
              <li>International money transfers</li>
              <li>Cryptocurrency wallet integration</li>
              <li>Bank account linking</li>
              <li>Transaction history and reporting</li>
            </ul>
          </section>

          <section>
            <h2>3. User Account</h2>
            <p>To use our services, you must:</p>
            <ul>
              <li>Be at least 18 years old</li>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2>4. Fees and Payments</h2>
            <p>You agree to pay all applicable fees for transactions. Fees are displayed before you complete a transaction. We reserve the right to change our fee structure with notice.</p>
          </section>

          <section>
            <h2>5. Transaction Limits</h2>
            <p>We may impose transaction limits based on verification level, transaction history, and other risk factors. These limits are subject to change.</p>
          </section>

          <section>
            <h2>6. Prohibited Activities</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the service for illegal activities</li>
              <li>Violate any laws or regulations</li>
              <li>Impersonate any person or entity</li>
              <li>Interfere with or disrupt the service</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Engage in money laundering or terrorist financing</li>
            </ul>
          </section>

          <section>
            <h2>7. Compliance and Verification</h2>
            <p>We are required to comply with Know Your Customer (KYC) and Anti-Money Laundering (AML) regulations. You agree to provide necessary documentation for verification purposes.</p>
          </section>

          <section>
            <h2>8. Liability Limitation</h2>
            <p>To the maximum extent permitted by law, CoinVoy shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.</p>
          </section>

          <section>
            <h2>9. Dispute Resolution</h2>
            <p>Any disputes arising from these terms shall be resolved through binding arbitration in accordance with applicable laws.</p>
          </section>

          <section>
            <h2>10. Service Modifications</h2>
            <p>We reserve the right to modify or discontinue the service at any time, with or without notice. We shall not be liable for any modification, suspension, or discontinuation of the service.</p>
          </section>

          <section>
            <h2>11. Intellectual Property</h2>
            <p>All content, trademarks, and intellectual property on CoinVoy are owned by or licensed to us. You may not use our intellectual property without prior written permission.</p>
          </section>

          <section>
            <h2>12. Termination</h2>
            <p>We may terminate or suspend your account immediately, without prior notice, for any breach of these Terms of Service.</p>
          </section>

          <section>
            <h2>13. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.</p>
          </section>

          <section>
            <h2>14. Contact Information</h2>
            <p>For questions about these Terms of Service, contact us at:</p>
            <p className="contact-info">legal@coinvoy.com</p>
          </section>
        </div>
      </div>
    </div>
  )
}
