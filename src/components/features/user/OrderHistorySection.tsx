import React from 'react';
import { Package } from 'lucide-react';
import { OrderTable } from './OrderTable';
import Cookies from 'js-cookie';
import { Loading } from '../../UI/Loading';
import { useGetUserOrderQuery } from '../../../services/API/orderAPI';
import type { UserMeta } from '../../../types/OrderType';

interface OrderHistorySectionProps {
    onViewDetails: (order: UserMeta) => void;
}

export const OrderHistorySection: React.FC<OrderHistorySectionProps> = ({ onViewDetails }) => {

    const token = Cookies.get('token');
    const { data, isLoading } = useGetUserOrderQuery(token || '')

    if (isLoading) return <Loading />;
    return (
        <div>
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-white/20">
                        <Package className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold text-white">Order History</h2>
                </div>

                <OrderTable orders={data?.orders || []} onViewDetails={onViewDetails} />
            </div>
        </div>
    );
};