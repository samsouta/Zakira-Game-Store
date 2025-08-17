import PageMeta from "../components/common/PageMeta";

export const SecurityPolicy = () => {
  return (
    <>
      <PageMeta title="Security Policy - Zakari Game Store" description="Security Policy" />
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-4xl mx-auto bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-6">
            Security Policy
          </h1>
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> August 17, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Payment Security</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>All payments are processed securely via trusted local and international payment gateways.</li>
              <li>We do <strong>not store any sensitive payment information</strong> on our servers.</li>
              <li>Payment verification is done using encrypted receipts uploaded by users to confirm transactions.</li>
              <li>All transactions are monitored to prevent fraudulent activity and ensure safety.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Data Protection</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><strong>Encryption:</strong> All sensitive data is encrypted during transfer and storage.</li>
              <li><strong>Secure Storage:</strong> User accounts and uploaded payment receipts are stored securely with limited access.</li>
              <li><strong>Minimal Retention:</strong> We only retain payment-related files for verification purposes and delete them after 30 days.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Account Security</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Use a strong password for your Zakari account.</li>
              <li>Enable two-factor authentication (2FA) if available.</li>
              <li>Our team performs regular security audits on user accounts and internal systems.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Fraud Prevention</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>High-risk transactions are automatically flagged for review.</li>
              <li>Manual verification is conducted for any suspicious orders.</li>
              <li>Users are encouraged to report unusual activity immediately.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Your Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Keep your account credentials confidential.</li>
              <li>Do not share game accounts or transaction information publicly.</li>
              <li>Report any unauthorized access or suspicious transactions immediately.</li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Reporting Issues</h2>
            <p className="text-gray-600">
              Contact us immediately at{' '}
              <a href="mailto:security@zakari.site" className="text-blue-600 hover:text-blue-800">
                security@zakari.site
              </a>{' '}
              for any security concerns or payment-related issues.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};
