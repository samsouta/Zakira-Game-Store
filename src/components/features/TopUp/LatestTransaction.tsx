import type { TopUpOrder } from "../../../types/OrderType";
import { GlassCard } from "./GlassCard";
import { StatusBadge } from "./StatusBadge";

interface LatestTransactionProps {
    transaction: TopUpOrder | null;
}

export const LatestTransaction: React.FC<LatestTransactionProps> = ({ transaction }) => {
    if (!transaction) return null;

    return (
        <GlassCard className="p-6 mb-8">
            <h3 className="text-lg font-semibold  mb-4">Latest Transaction</h3>
            <div className="flex items-center justify-between">
                <div>
                    <p className=" font-medium">
                        MMK {Math.floor(transaction?.amount ?? 0)}
                    </p>
                    <p className=" opacity-70 text-sm">{transaction?.payment_method}</p>
                    <p className="text-sm font-medium opacity-80">
                        {new Date(transaction?.created_at).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                </div>
                <StatusBadge status={transaction?.status as "pending" | "confirmed" | "rejected"} />
            </div>
        </GlassCard>
    );
};