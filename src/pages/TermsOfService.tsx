import PageMeta from "../components/common/PageMeta";

export const TermsOfService = () => {
  return (
    <>
      <PageMeta title="Terms of Service - Zakari Game Store" description="Terms of Service" />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Terms of Service</h1>
          <p className="mb-6"><strong>Effective Date:</strong> March 1, 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600">By purchasing from Zakari, you agree to these terms.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Services Offered</h2>
            <p className="text-gray-600 mb-2">We sell:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Game accounts (Mobile Legends, PUBG, and other games)</li>
              <li>In-game currency (e.g., diamonds)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Purchases & Delivery</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Accounts/diamonds are delivered within 24 hours after payment</li>
              <li>You must provide a valid game ID/server region</li>
              <li className="font-semibold">No refunds once delivery is confirmed</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Prohibited Uses</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Reselling accounts/diamonds without permission</li>
              <li>Using our services for fraud or illegal activities</li>
              <li>Chargebacks may result in permanent bans</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Account Ownership</h2>
            <p className="text-gray-600">
              Zakari is not affiliated with game publishers (e.g., Moonton, Krafton).
              Accounts/diamonds sold are virtual items; we claim no ownership of game IP.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-600 mb-2">We are not responsible for:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Game bans imposed by publishers</li>
              <li>Technical issues beyond our control (e.g., server downtime)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Changes to Terms</h2>
            <p className="text-gray-600">
              We may update these terms. Check this page periodically.
            </p>
          </section>

          {/* <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Governing Law</h2>
          <p className="text-gray-600">
            These terms are governed by the laws of Thailand.
          </p>
        </section> */}
        </div>
      </div>
    </>
  );
};
