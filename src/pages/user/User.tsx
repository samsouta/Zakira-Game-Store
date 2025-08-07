import { useState } from 'react';
import { ProfileSection } from '../../components/features/user/ProfileSection';
import { OrderHistorySection } from '../../components/features/user/OrderHistorySection';
import { TransactionModal } from '../../components/UI/TransactionModal';
import Cookies from 'js-cookie';
import type { UserMeta } from '../../types/OrderType';
import { liquidGlassClasses } from '../../style/LiquidGlass';
import PageMeta from '../../components/common/PageMeta';

export const User = () => {
  const [selectedOrder, setSelectedOrder] = useState<UserMeta | null>(null);
  const Info = JSON.parse(Cookies.get('user') || '{}');


  return (
    <>
      <PageMeta title="User Settings - Zakari Game Store" description="Manage your profile and view order history" />
      
      <div className={`min-h-screen  p-4 md:p-8 ${liquidGlassClasses?.liquidText}`}>
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-3/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold oxanium mb-4">
              User Settings
            </h1>
            <p className=" opacity-60 text-lg">Manage your profile and view order history</p>
          </div>

          {/* Profile Section */}
          <ProfileSection userData={Info} />

          {/* Order History Section */}
          <OrderHistorySection
            onViewDetails={setSelectedOrder}
          />

          {/* Transaction Details Modal */}
          <TransactionModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        </div>
      </div>
    </>
  );
}
