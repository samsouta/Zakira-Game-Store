import PageMeta from "../components/common/PageMeta";

export const PrivacyPolicy = () => {
  return (
    <>
      <PageMeta title="Privacy Policy - Zakari Game Store" description="Privacy Policy" />
      <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto backdrop-blur-lg bg-white/30 rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Privacy Policy
            </h1>
            <p className="mt-4 text-gray-600">
              <strong>Effective Date:</strong> 17-08-2025
            </p>
          </div>

          <div className="space-y-10">
            <div className="prose max-w-none text-gray-600">
              <p className="leading-relaxed">
                Welcome to Zakari Game Store. Your privacy matters to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.
              </p>
            </div>

            <section className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">1</div>
                <h2 className="text-2xl font-semibold text-gray-800">Information We Collect</h2>
              </div>
              <div className="ml-11 space-y-3">
                <div className="bg-white/40 rounded-xl p-4 backdrop-blur-sm">
                  <h3 className="font-medium text-gray-700 mb-2">Personal Information</h3>
                  <ul className="list-disc ml-5 text-gray-600 space-y-1">
                    <li>Name and email address</li>
                    <li>Phone number</li>
                    <li>Login credentials</li>
                    <li>Payment receipts for order verification</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">2</div>
                <h2 className="text-2xl font-semibold text-gray-800">How We Use Your Information</h2>
              </div>
              <div className="ml-11 grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Create and manage accounts', 'Verify payments', 'Provide support', 'Improve services'].map((item, index) => (
                  <div key={index} className="bg-white/40 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">3</div>
                <h2 className="text-2xl font-semibold text-gray-800">Data Protection</h2>
              </div>
              <div className="ml-11 bg-white/40 rounded-xl p-6 backdrop-blur-sm">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    Encrypted storage with secure passwords
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    Protected file directories
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    Modern security measures
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">4</div>
                <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
              </div>
              <div className="ml-11 bg-white/40 rounded-xl p-6 backdrop-blur-sm">
                <div className="space-y-3">
                  <p className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-3 text-purple-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    admin@zakari.site
                  </p>
                  <p className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-3 text-purple-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"></path>
                    </svg>
                    zakari.site
                  </p>
                  <p className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-3 text-purple-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    +60111-790-1410
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
