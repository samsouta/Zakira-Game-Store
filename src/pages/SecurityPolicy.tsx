import PageMeta from "../components/common/PageMeta";

export const SecurityPolicy = () => {
  return (
    <>
      <PageMeta title="Security Policy - Zakari Game Store" description="Security Policy" />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Security Policy</h1>
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> March 15, 2024
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Payment Security</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>All payments are processed through PCI-DSS compliant gateways (PayPal, Stripe).</li>
              <li className="font-medium">We never store your credit card details.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Data Protection</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><strong>Encryption:</strong> SSL/TLS encryption on all transactions.</li>
              <li><strong>Storage:</strong> Customer data stored in password-protected systems with limited access.</li>
              <li><strong>Minimal Data Retention:</strong> We delete payment data after 30 days.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Account Security</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Two-factor authentication (2FA) for staff accessing sensitive data.</li>
              <li>Regular security audits of our systems.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Fraud Prevention</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Automated systems flag high-risk transactions.</li>
              <li>Manual review for suspicious purchases.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Your Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Use strong passwords for your Zakari account.</li>
              <li>Never share game IDs/transaction details publicly.</li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Reporting Issues</h2>
            <p className="text-gray-600">
              Contact us immediately at{' '}
              <a href="mailto:security@zakarigames.com" className="text-blue-600 hover:text-blue-800">
                security@zakarigames.com
              </a>{' '}
              for security concerns.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};
