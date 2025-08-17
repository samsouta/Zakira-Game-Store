import { useState } from "react";
import type { FormEvent } from "react";
import { GlassCard } from "./GlassCard";
import { Copy, Plus } from "lucide-react";
import { mockPaymentMethods } from "../../../data/mockData";

interface TopUpFormProps {
    onSubmit: (data: {
        amount: number;
        paymentMethod: string
        file: File;
    }) => void;
    isLoading: boolean;
}

export const TopUpForm = ({ onSubmit, isLoading }: TopUpFormProps) => {
    const [amount, setAmount] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string>('');
    const [fileErr, setFileErr] = useState<string>('');
    const [bonus, setBonus] = useState<number>(0);



    /**
    * Generate random bonus based on amount
    */
    const generateBonus = (amt: number) => {
        if (amt < 100000) {
            return Math.floor(Math.random() * 500) + 1; // 1 - 500
        } else {
            return Math.floor(Math.random() * 501) + 500; // 500 - 1000
        }
    };

    /**
    * Handle Change Amount Input 
    */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^\d]/g, '');
        if (value === '' || parseInt(value) >= 0) {
            setAmount(value);

            if (value !== '' && parseInt(value) < 2000) {
                setError('Minimum top-up amount is 2000K');
                setBonus(0);
            } else {
                setError('');
                const numericAmount = parseInt(value);
                if (!isNaN(numericAmount)) {
                    setBonus(generateBonus(numericAmount));
                }
            }
        }
    };

    /**
     * @Handle File Change 
     */
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        // allowed file types
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(selectedFile.type)) {
            setFileErr("Only JPG, JPEG, PNG images are allowed");
            setFile(null);
            setPreviewUrl(null);
            return;
        }

        // max size 10MB
        if (selectedFile.size > 10 * 1024 * 1024) {
            setFileErr("File size must be less than 10MB");
            setFile(null);
            setPreviewUrl(null);
            return;
        }

        // everything good
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
        setFileErr("");
    };


    /**
     * @function
     * Handle Top Up Form 
     */
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (amount && paymentMethod && file) {
            const numericAmount = parseFloat(amount);
            if (!isNaN(numericAmount) && numericAmount >= 2000) {
                const totalAmount = numericAmount + bonus;
                onSubmit({
                    amount: totalAmount,
                    paymentMethod: paymentMethod,
                    file,
                });
            } else {
                setError('Minimum top-up amount is 2000K');
            }
        }
    };


    return (
        <GlassCard className="p-8 mb-8">
            <h2 className="text-2xl font-bold  mb-6 flex items-center gap-3">
                <Plus className="w-6 h-6 text-cyan-400" />
                Top Up Wallet
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium mb-2">
                        Amount to Top-Up
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 font-semibold">Ks</span>
                        <input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={handleInputChange}
                            placeholder="Enter amount"
                            className={`w-full pl-12 pr-4 py-4 bg-white/5 border ${error ? 'border-red-500' : 'border-white/10'} rounded-2xl placeholder-black/40 dark:placeholder-white/40 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm`}
                            step="1"
                            min="1"
                            onKeyDown={(e) => {
                                // Prevent decimal point input
                                if (e.key === '.') {
                                    e.preventDefault();
                                }
                            }}
                            required
                        />
                    </div>
                    {error && (
                        <span className="text-red-500 text-sm mt-1 block">
                            {error}
                        </span>
                    )}

                    {/* ✅ Show Bonus + Final Amount */}
                    {amount && !error && (
                        <div className="mt-3 p-4 rounded-xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 dark:from-cyan-500/10 dark:to-purple-500/10 border border-white/20 dark:border-cyan-400/30 backdrop-blur-sm text-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="animate-bounce">🎁</span>
                                <span className="text-black/70 dark:text-white/70">Bonus:</span>
                                <span className="font-bold bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent">{bonus} Ks</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="animate-pulse">💳</span>
                                <span className="text-black/70 dark:text-white/70">Final Bill:</span>
                                <span className="font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">{parseInt(amount) + bonus} Ks</span>
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <label htmlFor="paymentMethod" className="block text-sm font-medium mb-2">
                        Payment Method
                    </label>
                    <div className="space-y-4">
                        <select
                            id="paymentMethod"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm"
                            required
                        >
                            <option value="" className="bg-gray-800">ငွေပေးချေမှုနည်းလမ်း ရွေးချယ်ပါ</option>
                            {mockPaymentMethods.map(method => (
                                <option key={method.id} value={method.name} className="bg-gray-800">
                                    {method.name}
                                </option>
                            ))}
                        </select>
                        {/* Payment Details Display (add this right after your select) */}
                        {paymentMethod && (
                            <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm animate-fade-in">
                                {(() => {
                                    const selectedMethod = mockPaymentMethods.find(method => method.name === paymentMethod);
                                    return selectedMethod ? (
                                        <div className="flex items-center space-x-4">
                                            {/* Payment Icon */}
                                            <div className="flex-shrink-0 hidden sm:block">
                                                <img
                                                    src={selectedMethod.icon}
                                                    alt={selectedMethod.name}
                                                    className="w-16 h-16 rounded-xl object-cover ring-2 ring-cyan-400/30 shadow-lg"
                                                />
                                            </div>

                                            {/* Payment Details */}
                                            <div className="flex-1 min-w-0">
                                                <div className=" sm:hidden flex mb-2 justify-center items-center gap-x-3" >
                                                    <img
                                                        src={selectedMethod.icon}
                                                        alt={selectedMethod.name}
                                                        className="w-8 h-8 rounded-xl object-cover ring-2 ring-cyan-400/30 shadow-lg"
                                                    />
                                                    <h3 className="font-semibold text-sm sm:text-base mb-1">
                                                        {selectedMethod.name}
                                                    </h3>
                                                </div>
                                                <p className="oxanium text-xs sm:text-sm mb-1 flex items-center gap-1">
                                                    <span className="text-cyan-400">👤</span> {selectedMethod.holderName}
                                                </p>
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(selectedMethod.phone);
                                                        // Could add toast notification here
                                                    }}
                                                    className="w-full text-cyan-400 font-mono text-xs sm:text-sm font-semibold tracking-wider 
                                                    bg-cyan-400/10 px-2 py-1.5 rounded-lg border border-cyan-400/20 
                                                    flex items-center justify-between gap-1 sm:gap-2
                                                    shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]
                                                    hover:bg-cyan-400/20 active:bg-cyan-400/30
                                                    transition-all duration-200 cursor-copy
                                                    backdrop-blur-sm group"
                                                >
                                                    <span className="text-cyan-300 text-xs sm:text-sm group-hover:scale-105 transition-transform">📱</span>
                                                    <span className="text-black dark:text-cyan-100 group-hover:text-gray-700 dark:group-hover:text-cyan-50 transition-colors font-medium flex-1 text-center">
                                                        {selectedMethod.phone}
                                                    </span>
                                                    <Copy className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-300 group-hover:scale-105 transition-transform" />
                                                </button>
                                                <span className="inline-flex oxanium items-center gap-1 px-1.5 py-0.5 text-[10px] sm:text-xs font-medium mt-1 opacity-70">
                                                    Click Phone Number to copy
                                                </span>
                                            </div>

                                            {/* Success Icon */}
                                            <div className="flex-shrink-0">
                                                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null;
                                })()}
                            </div>
                        )}


                        {/* File Input */}
                        <div className="relative">
                            <input
                                type="file"
                                id="paymentProof"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                                required
                            />
                            <label
                                htmlFor="paymentProof"
                                className="w-full min-h-[120px] px-6 py-6 bg-white/5 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer flex flex-col items-center justify-center gap-3 hover:bg-white/10 hover:border-cyan-400/30 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm active:scale-[0.98] sm:min-h-[100px]"
                            >
                                <div className="relative">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-cyan-400/80 animate-float"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <div className="absolute -top-1 -right-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-cyan-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="font-medium text-base sm:text-lg">Upload Payment Receipt</p>
                                    <p className="text-sm opacity-70 mt-1">ပြေစာပုံထည့်ရန်</p>
                                    <p className="text-xs text-red-500 mt-0.5">Maximum size: 10MB</p>
                                </div>
                            </label>

                            {fileErr && (
                                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mt-2">
                                    <svg
                                        className="w-5 h-5 text-red-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <p className="text-red-500 text-sm font-medium">{fileErr}</p>
                                </div>
                            )}

                            {/* // preview image */}
                            {previewUrl && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-400 mb-2">Preview:</p>
                                    <img
                                        src={previewUrl}
                                        alt="Receipt Preview"
                                        className="w-full max-h-64 object-contain rounded-xl border border-white/10 shadow-lg"
                                    />
                                </div>
                            )}

                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={!amount || !paymentMethod || isLoading}
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500  font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <Plus className="w-5 h-5" />
                            Submit Top-Up
                        </>
                    )}
                </button>


            </form>
        </GlassCard>
    );
};
