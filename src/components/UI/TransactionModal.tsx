import React from 'react';
import type { UserMeta } from '../../types/OrderType';

interface TransactionModalProps {
  order: UserMeta | null;
  onClose: () => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto" 
      onClick={onClose}
    >
      <div 
        className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 w-full max-w-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <h3 className="text-lg sm:text-xl font-semibold text-white">Game Account Details</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="grid gap-4">
            <div className="space-y-3">
              <div className="group">
                <label className="block text-xs font-medium text-blue-200 uppercase tracking-wide mb-1">
                  Email ACC
                </label>
                <p className="text-white font-mono text-sm bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10 break-all">
                  {order?.email}
                </p>
              </div>
              <div className="group">
                <label className="block text-xs font-medium text-blue-200 uppercase tracking-wide mb-1">
                  Email Password
                </label>
                <p className="text-white font-mono text-sm bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10 break-all">
                  {order?.email_password}
                </p>
              </div>
              <div className="group">
                <label className="block text-xs font-medium text-blue-200 uppercase tracking-wide mb-1">
                  Game Password
                </label>
                <p className="text-white font-semibold text-base sm:text-lg bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10 break-all">
                  {order?.game_password}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};