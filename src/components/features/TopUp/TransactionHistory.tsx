import { DollarSign } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { StatusBadge } from "./StatusBadge";
import type { TopUpOrder } from "../../../types/OrderType";

interface TransactionHistoryProps {
    transactions: TopUpOrder[];
    isLoading: boolean;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions, isLoading }) => {
    if (isLoading) {
        return (
            <GlassCard className="p-4 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Transaction History</h3>
                <div className="space-y-3 sm:space-y-4">
                    {[...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 animate-pulse"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-2 sm:gap-4">
                                    <div className="p-2 bg-white/20 rounded-xl w-6 h-6 sm:w-8 sm:h-8" />
                                    <div>
                                        <div className="h-3 sm:h-4 w-16 sm:w-20 bg-white/20 rounded" />
                                        <div className="h-2 sm:h-3 w-20 sm:w-24 bg-white/20 rounded mt-2" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end space-y-1 sm:space-y-2">
                                <div className="h-3 sm:h-4 w-14 sm:w-16 bg-white/20 rounded" />
                                <div className="h-2 sm:h-3 w-20 sm:w-24 bg-white/20 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </GlassCard>
        );
    }

    if (!transactions || transactions.length === 0) {
        return (
            <GlassCard className="p-4 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Transaction History</h3>
                <p className="opacity-70 text-center">No transactions found</p>
            </GlassCard>
        );
    }

    return (
        <GlassCard className="p-4 sm:p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Transaction History</h3>

            <div className="space-y-3 sm:space-y-4 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pr-2">
                {transactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-xl sm:rounded-2xl hover:bg-white/10 transition-all duration-300 border border-white/10"
                    >
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 sm:gap-4">
                                <div className="p-2 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-xl flex-shrink-0">
                                    <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-medium text-sm sm:text-base truncate">
                                        MMK {Math.floor(transaction?.amount ?? 0)}
                                    </p>
                                    <p className="opacity-70 text-xs sm:text-sm truncate">{transaction?.payment_method}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-end space-y-1 sm:space-y-2 flex-shrink-0">
                            <StatusBadge status={transaction.status as "pending" | "confirmed" | "rejected"} />
                            <div className="flex items-center gap-1 sm:gap-2">
                                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/30" />
                                <p className="text-xs sm:text-sm font-medium opacity-80 whitespace-nowrap">
                                    {new Date(transaction?.created_at).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'short',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
};
