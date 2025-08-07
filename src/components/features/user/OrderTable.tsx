import React from 'react';
import { formatCurrency, formatDate } from '../../../lib/utils';
import type { OrderType, UserMeta } from '../../../types/OrderType';

interface OrderTableProps {
    orders: OrderType[];
    onViewDetails: (order: UserMeta) => void;
}

export const OrderTable: React.FC<OrderTableProps> = ({ orders, onViewDetails }) => {
    return (
        <div className="overflow-x-auto rounded-2xl border border-white/20">
            <table className="w-full">
                <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                        <th className="text-left p-2 md:p-4 text-xs md:text-sm font-semibold opacity-60 min-w-[100px]">Order ID</th>
                        <th className="text-left p-2 md:p-4 text-xs md:text-sm font-semibold opacity-60 min-w-[150px]">Description</th>
                        <th className="text-left p-2 md:p-4 text-xs md:text-sm font-semibold opacity-60 min-w-[150px]">Category</th>
                        <th className="text-left p-2 md:p-4 text-xs md:text-sm font-semibold opacity-60 min-w-[100px]">Price</th>
                        <th className="text-left p-2 md:p-4 text-xs md:text-sm font-semibold opacity-60 min-w-[120px]">Status</th>
                        <th className="text-left p-2 md:p-4 text-xs md:text-sm font-semibold opacity-60 min-w-[140px]">Date</th>
                        <th className="text-left p-2 md:p-4 text-xs md:text-sm font-semibold opacity-60 min-w-[80px]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order?.id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
                            <td className="p-2 md:p-4 font-mono text-xs md:text-sm">{order?.id}</td>
                            <td className="p-2 md:p-4  text-xs md:text-sm">
                                <div className="max-w-[120px] md:max-w-none truncate md:whitespace-normal" title={order?.product?.name}>
                                    {order?.product?.name}
                                </div>
                            </td>
                            <td className="p-2 md:p-4  text-xs md:text-sm">
                                <div className="max-w-[120px] md:max-w-none truncate md:whitespace-normal" title={order?.product?.name}>
                                    {order?.product?.product_type}
                                </div>
                            </td>
                            <td className="p-2 md:p-4 font-semibold text-xs md:text-sm">{formatCurrency(Number(order?.total_price))}</td>
                            <td className="p-2 md:p-4 font-semibold text-xs md:text-sm">
                                {order.payment_status}
                            </td>
                            <td className="p-2 md:p-4 opacity-60 text-xs md:text-sm">
                                <div className="">{formatDate(order?.created_at)}</div>
                                {/* <div className="">
                                    {new Date(order?.created_at).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </div> */}
                            </td>
                            <td className="p-2 md:p-4">
                                {order?.product?.product_type === "account" ? (
                                    <button
                                        onClick={() => onViewDetails(order?.meta)}
                                        className="min-w-[60px] md:min-w-[100px] px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm bg-green-500/20 hover:bg-blue-500/30 text-green-300 rounded-lg border border-green-400/30 transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25"
                                    >
                                        <span className="hidden md:inline">View Account</span>
                                        <span className="inline md:hidden">Acc</span>
                                    </button>
                                ) : (
                                    <span
                                        className="min-w-[60px] md:min-w-[80px] inline-block px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm   text-center"
                                    >
                                        <span className="">💎</span>
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};