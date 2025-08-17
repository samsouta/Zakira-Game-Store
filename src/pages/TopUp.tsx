import { useEffect, useState } from "react";
import { LatestTransaction } from "../components/features/TopUp/LatestTransaction";
import { TransactionHistory } from "../components/features/TopUp/TransactionHistory";
import { TopUpForm } from "../components/features/TopUp/TopUpForm";
import { liquidGlassClasses } from "../style/LiquidGlass";
import { useFileUploadMutation, useGetTopUpOrderQuery, useTopUpOrderMutation } from "../services/API/Auth";
import Cookies from 'js-cookie';
import { LiquidModal } from "../components/UI/NotiModal/LiquidModal";
import type { NotificationType } from "../types/notiModelType";
import type { TopUpOrder } from "../types/OrderType";
// Define transaction type for better type safety


const demos = [
    {
        type: 'success' as const,
        title: '✅ ဘေဖြည့်မှု အဆင်သင့်ဖြစ်နေပါပြီ | success ',
        message: 'ဘေဖြည့်မှုအား အောင်မြင်စွာ အပ်ဒိတ်လုပ်ပြီးပါပြီ။ အကောင့်ထဲသို့ ရောက်ရှိရန် ၅ မိနစ်ခန့် စောင့်ဆိုင်းပေးပါ။',
        btnText: 'မူလစာမျက်နှာသို့',
        buttonClass: 'from-sky-500 to-blue-600 shadow-sky-500/25',
        router: '/home'
    },
    {
        type: 'error' as const,
        title: 'ငွေပေးချေမှု မအောင်မြင်ပါ',
        message: 'ငွေပေးချေမှုမအောင်မြင်ပါ။ ကျေးဇူးပြု၍ အချက်အလက်များကို ပြန်စစ်ပြီး ထပ်ကြိုးစားပေးပါ။',
        btnText: 'ပြန်လည်ကြိုးစားမည်',
        buttonClass: 'from-pink-500 to-rose-600 shadow-pink-500/25'
    }
];


// Main Component
export const TopUp = () => {
    const token = Cookies.get('token');
    const [activeModal, setActiveModal] = useState<NotificationType | null>(null);
    const [transactions, setTransactions] = useState<TopUpOrder[]>([]);
    const [fileUpload, { isLoading }] = useFileUploadMutation()
    const [topUpOrder, { isLoading: TopUpLoading }] = useTopUpOrderMutation()
    const { data, isLoading: GetTopUpLoading } = useGetTopUpOrderQuery(token || '');


    // update transactions when data changes
    useEffect(() => {
        if (data) {
            setTransactions(data); // assuming API returns TopUpOrder[]
        }
    }, [data]);

    /**
     * @Handle Sumbit Top Up bill
     */
    const handleTopUpSubmit = async ({
        amount,
        paymentMethod,
        file,
    }: { amount: number; paymentMethod: string; file: File }) => {
        try {
            // 1. Upload file first
            const uploadRes = await fileUpload({
                token: token || "",
                file,
            }).unwrap();

            if (!uploadRes?.success || !uploadRes?.data?.id) {
                throw new Error("File upload failed");
            }

            const uploadId = uploadRes?.data?.id

            // 2. Create TopUp Order
            const orderRes = await topUpOrder({
                token: token || "",
                amount,
                paymentMethod,
                receipt_id: uploadId,
            }).unwrap();

            if (orderRes?.success) {
                setActiveModal('success');
                // maybe show toast or redirect user
            } else {
                console.error("Failed to create order", orderRes.message);
                setActiveModal('error');
            }
        } catch (error) {
            console.error("Error in top-up submit:", error);
        }
    };


    const latestTransaction = transactions && transactions.length > 0
        ? transactions.reduce((latest, current) => {
            return new Date(current.created_at) > new Date(latest.created_at)
                ? current
                : latest;
        })
        : null;


    return (
        <>
            <div className={`min-h-screen  p-4 ${liquidGlassClasses?.liquidText}`}>
                <div className="max-w-4xl mx-auto">
                    <div className={`mb-8 text-center ${liquidGlassClasses?.base} rounded-xl p-4`}>
                        <h1 className="text-4xl font-bold  mb-2">Top Up Wallet</h1>
                        <p className=" opacity-70">Add funds to your digital wallet securely</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div>
                            <TopUpForm
                                onSubmit={handleTopUpSubmit}
                                isLoading={isLoading || TopUpLoading}
                            />
                            {latestTransaction && <LatestTransaction transaction={latestTransaction} />}
                        </div>

                        <div>
                            <TransactionHistory
                                transactions={transactions}
                                isLoading = {GetTopUpLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Noti Modals box */}
            {demos.map((demo) => (
                <LiquidModal
                    key={demo.type}
                    isOpen={activeModal === demo.type}
                    onClose={() => setActiveModal(null)}
                    type={demo.type}
                    title={demo.title}
                    message={demo.message}
                    btnText={demo?.btnText}
                    router={demo?.router}
                />
            ))}
        </>
    );
};
