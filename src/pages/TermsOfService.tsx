import PageMeta from "../components/common/PageMeta";

const TermsOfService = () => {
    return (
        <>
            <PageMeta title="Terms Of Service - Zakari Game Store" description="Terms Of Service" />
            <div className="min-h-screen w-full  py-8 px-4">
                <div className="mx-auto max-w-4xl">
                    <div className="backdrop-blur-sm bg-white/70 rounded-2xl shadow-xl border border-white/20 p-8">
                        {/* Header */}
                        <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text mb-2">
                            Terms & Conditions
                        </h1>
                        <p className="text-center text-gray-600 mb-8">Effective Date: 17-08-2025</p>

                        {/* Introduction */}
                        <p className="text-gray-700 mb-8">
                            These Terms and Conditions ("Terms") govern your use of the website zakari.site operated by Zakari Game Store ("we", "our", "us"). By accessing or using our website, you agree to be bound by these Terms.
                        </p>

                        {/* Numbered Sections */}
                        <div className="space-y-8">
                            {[
                                {
                                    title: "Account Registration",
                                    content: "You must provide accurate information when registering an account. You are responsible for maintaining the confidentiality of your account and password. Notify us immediately of any unauthorized access or security breach."
                                },
                                {
                                    title: "User Responsibilities",
                                    content: "You agree to use our services only for lawful purposes. Do not upload or share any harmful, fraudulent, or abusive content. You are responsible for all activities carried out under your account."
                                },
                                {
                                    title: "Payment Verification",
                                    content: "Users may be required to upload payment receipts or screenshots to verify purchases. We reserve the right to reject or investigate any suspicious payments."
                                },
                                {
                                    title: "Refunds",
                                    content: "All sales are final. Refunds are only provided under exceptional circumstances, such as unfulfilled orders. Contact our support team within 24 hours of purchase for any refund requests."
                                },
                                {
                                    title: "Intellectual Property",
                                    content: "All content on zakari.site is the property of Zakari Game Store. You may not reproduce, copy, or distribute any content without our explicit permission."
                                },
                                {
                                    title: "Termination",
                                    content: "We may suspend or terminate your access if you violate these Terms or engage in fraudulent activity."
                                },
                                {
                                    title: "Limitation of Liability",
                                    content: "We are not responsible for any damages or losses resulting from your use of our services. All services are provided \"as is\" without any warranties."
                                },
                                {
                                    title: "Modifications",
                                    content: "We reserve the right to update or modify these Terms at any time. Changes will be posted on this page with an updated effective date."
                                },
                                {
                                    title: "Governing Law",
                                    content: "These Terms are governed by the laws of Myanmar. Any disputes will be resolved according to local laws."
                                },
                                {
                                    title: "Contact Us",
                                    content: (
                                        <div className="flex flex-col space-y-2">
                                            <p>If you have questions about these Terms & Conditions, contact us at:</p>
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <span>Email: admin@zakari.site</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                                </svg>
                                                <span>Website: zakari.site</span>
                                            </div>
                                        </div>
                                    )
                                }
                            ].map((section, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{section.title}</h2>
                                        <div className="text-gray-700">{section.content}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsOfService;
