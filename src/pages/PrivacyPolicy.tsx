import PageMeta from "../components/common/PageMeta";

export const PrivacyPolicy = () => {
  return (
    <>
      <PageMeta title="Privacy Policy - Zakari Game Store" description="Privacy Policy" />
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> March 15, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Who We Are</h2>
            <p className="text-gray-600">
              Zakari ("we," "us") operates our game store platform, selling game accounts and in-game currency (e.g., diamonds) for Mobile Legends, PUBG, and other mobile games.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li><strong>Personal Data:</strong> Name, email, payment details (processed via secure payment gateways), game ID.</li>
              <li><strong>Transaction Data:</strong> Purchase history (accounts/diamonds bought).</li>
              <li><strong>Technical Data:</strong> IP address, device type (for fraud prevention).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Data</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Deliver purchased accounts/diamonds to your game profile.</li>
              <li>Process payments and prevent fraud.</li>
              <li>Provide customer support (e.g., delivery issues).</li>
              <li><strong>Never:</strong> Sell data to third parties or spam you.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Sharing</h2>
            <p className="text-gray-600 mb-3">We share data only with:</p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Payment processors to complete transactions.</li>
              <li>Legal authorities if required by law.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Security</h2>
            <p className="text-gray-600">
              All data is encrypted (SSL) and stored securely. Read our full{' '}
              <a href="/security-policy" className="text-blue-600 hover:text-blue-800 underline">
                Security Policy
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
            <p className="text-gray-600">
              You can request to access, update, or delete your data at samxxsouta@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contact</h2>
            <p className="text-gray-600">
              Questions? Contact us at samxxsouta@gmail.com
            </p>
          </section>
        </div>
      </div>
    </>
  );
};
