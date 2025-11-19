import './LegalPage.css'

interface PrivacyPolicyProps {
  onClose: () => void
}

export default function PrivacyPolicy({ onClose }: PrivacyPolicyProps) {

  return (
    <div className="legal-overlay">
      <div className="legal-modal">
        <div className="legal-header">
          <h1>Privacy Policy</h1>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="legal-content">
          <p className="legal-updated">Last Updated: November 19, 2025</p>

          <section>
            <h2>1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>Account information (name, email address)</li>
              <li>Transaction data and payment information</li>
              <li>Communication preferences</li>
              <li>Device and usage information</li>
            </ul>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process your transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Protect against fraudulent or illegal activity</li>
            </ul>
          </section>

          <section>
            <h2>3. Information Sharing</h2>
            <p>We do not sell your personal information. We may share your information only in the following circumstances:</p>
            <ul>
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
              <li>With service providers who assist our operations</li>
            </ul>
          </section>

          <section>
            <h2>4. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          </section>

          <section>
            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2>6. Cookies</h2>
            <p>We use cookies and similar tracking technologies to collect information about your browsing activities and to provide personalized content and advertising.</p>
          </section>

          <section>
            <h2>7. International Data Transfers</h2>
            <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.</p>
          </section>

          <section>
            <h2>8. Children's Privacy</h2>
            <p>Our services are not intended for children under 18. We do not knowingly collect personal information from children.</p>
          </section>

          <section>
            <h2>9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
          </section>

          <section>
            <h2>10. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at:</p>
            <p className="contact-info">privacy@coinvoy.com</p>
          </section>
        </div>
      </div>
    </div>
  )
}
