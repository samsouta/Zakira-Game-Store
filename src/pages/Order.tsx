import { useState } from 'react';
import { useSelector } from "react-redux";
import type { RootState } from "../services/store";
import { liquidGlassClasses } from "../style/LiquidGlass";
import { Check, Package, CreditCard, ArrowRight, Sparkles, AlertCircle, KeyRound, Lock, Mail } from 'lucide-react';
import { useMakeOrderMutation } from '../services/API/orderAPI';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import PageMeta from '../components/common/PageMeta';

export const Order = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const [userCredentials, setUserCredentials] = useState<{
    email: string;
    game_password: string;
    email_password: string;
  }>({
    email: '',
    game_password: '',
    email_password: ''
  });
  const order = useSelector((state: RootState) => state.order?.orderData);
  const serviceName = useSelector((state: RootState) => state?.services?.serviceName);
  const [makeOrder, { isLoading }] = useMakeOrderMutation();
  const token = Cookies.get('token');


  /**
   * @function Handle ConfirmOrder 
   */
  const handleConfirmOrder = async () => {
    if (isLoading) return;
    try {
      const response = await makeOrder({
        orderId: Number(order?.orderId),
        gameId: order?.game_uid || '',
        serverId: order?.game_server || '',
        token: token || ''
      }).unwrap();
      if (response?.success) {
        setIsConfirmed(true);
        setErrorMessage('');
        setUserCredentials({
          email: response?.credentials?.email || '',
          game_password: response?.credentials?.game_password || '',
          email_password: response?.credentials?.email_password || ''
        });

        // remove order data after create successfully order 
        localStorage.removeItem('orderData');
        return;
      }

      setIsConfirmed(false)

    } catch (error) {
      // Handle error appropriately
      console.error('Failed to place order:', error);
      setErrorMessage(error?.data?.message || 'Failed to create order. Please try again.');
    }
    setIsConfirmed(false);
  };

  return (
    <>
      <PageMeta
        title="Zakari - Order"
        description="Zakari is a game store that sells games and products"
      />

      <div className={`min-h-screen w-full p-2`}>
        <div className={`relative w-full border rounded-2xl ${liquidGlassClasses?.base} ${liquidGlassClasses?.liquidText} px-2`}>
          {/* Header */}
          <div className="text-center mb-6 mt-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-purple-500 mb-4 shadow-lg">
              <Package className="w-8 h-8 " />
            </div>
            <h1 className={`text-2xl sm:text-3xl font-bold mb-2 transition-colors duration-300 oxanium`}>
              Order Confirmation
            </h1>
            <p className={`transition-colors duration-300 opacity-70`}>
              Your order has been placed successfully!
            </p>
          </div>

          {/* Main Card */}
          <div className={`${liquidGlassClasses?.base} rounded-3xl w-full md:max-w-[500px] md:mx-auto shadow-xl overflow-hidden transition-all duration-300  `}>
            {/* Order ID Section */}
            <div className={`p-6 pb-4 border-b transition-colors duration-300 `}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm mb-1 transition-colors duration-300 oxanium`}>
                    Product ID
                  </p>
                  <p className={`text-lg font-bold font-mono tracking-wider transition-colors duration-300 `}>
                    {order?.orderId}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 " />
                </div>
              </div>
            </div>

            {/* Product Image */}
            <div className="p-6 pb-4">
              <div className={`relative overflow-hidden rounded-2xl backdrop-blur-sm border shadow-lg transition-all duration-300 `}>
                <img
                  src={order?.image}
                  alt={order?.title}
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>

            {/* Product Details */}
            <div className="px-6 pb-4">
              <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 oxanium`}>
                {order?.title}
              </h3>
              <div className={`flex items-center text-sm mb-4 transition-colors duration-300 `}>
                <Package className="w-4 h-4 mr-2 oxanium" />
                <span>Product Type : {order?.orderType}</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="px-6 pb-6">
              <div className={`backdrop-blur-sm bg-gradient-to-r border rounded-2xl p-4 transition-all duration-300`}>
                {/* Product Price */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Package className={`w-5 h-5 mr-2 transition-colors duration-300`} />
                    <span className={`font-medium transition-colors duration-300`}>
                      Product Price
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-sky-400">
                      MMK {order?.totalPrice || 0}
                    </p>
                  </div>
                </div>

                {/* Service Charge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <svg 
                      className="w-5 h-5 mr-2 text-amber-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className={`font-medium transition-colors duration-300`}>
                      Service Charge
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-amber-400">
                      MMK 50 
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-3"></div>

                {/* Total Amount */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className={`w-5 h-5 mr-2 transition-colors duration-300`} />
                    <span className={`font-medium transition-colors duration-300`}>
                      Total Amount
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-sky-500">
                      MMK {Number(order?.totalPrice) + 50}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            <div className="p-6 pt-0">
              <button
                onClick={handleConfirmOrder}
                disabled={isConfirmed || isLoading}
                className={`w-full py-4 px-6 rounded-2xl font-semibold transform transition-all duration-300 flex items-center justify-center space-x-2  ${isConfirmed
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 scale-95'
                  : isLoading
                    ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600'
                  }`}
              >
                {isConfirmed ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Order Confirmed!</span>
                  </>
                ) : isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Order</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mx-auto max-w-[500px] mb-5">
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}
          </div>

          {/* Service Success Message */}
          {isConfirmed && (
            serviceName === 'coin' ? (
              <div className={`mt-6 backdrop-blur-lg bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-3xl p-4 sm:p-6 text-center transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 hover:bg-white/15 dark:hover:bg-black/15 relative overflow-hidden`}>
                {/* Liquid Glass Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 rounded-3xl"></div>
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl transform -translate-x-8 -translate-y-8"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-emerald-500/10 to-transparent rounded-full blur-lg transform translate-x-6 translate-y-6"></div>

                {/* Content Layer */}
                <div className="relative z-10">
                  {/* Success Icon Animation */}
                  <div className="relative mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-xl shadow-emerald-500/25 transform hover:scale-110 transition-all duration-500 hover:shadow-emerald-500/40">
                      <Check className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-bounce" />
                    </div>
                    {/* Ripple Effect */}
                    <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full border-2 border-emerald-500/30 animate-ping"></div>
                  </div>

                  {/* Success Message */}
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent leading-tight px-2">
                      Thank you! Your coin order is being processed.
                    </h3>

                    <div className="p-3 sm:p-4 rounded-2xl backdrop-blur-sm bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-blue-500/20 dark:border-blue-400/20 hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-300">
                      <p className="text-sm sm:text-base md:text-lg text-blue-600 dark:text-blue-400 mb-2 font-medium">
                        Please wait while we process your coin transfer.
                      </p>
                      <div className="text-xs sm:text-sm md:text-base text-amber-600 dark:text-yellow-400 bg-gradient-to-r from-yellow-400/10 to-amber-400/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-xl border border-yellow-400/30 dark:border-yellow-400/20">
                        သင့် order တင်ပြီးပါပြီ မိနစ်အနည်းငယ်စောင့်ဆိုင်းပေးပါ
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Processing Animation */}
                  <div className="flex justify-center items-center gap-1.5 sm:gap-2 my-4 sm:my-6">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-bounce shadow-lg shadow-emerald-500/50"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-bounce shadow-lg shadow-emerald-500/50 [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-bounce shadow-lg shadow-emerald-500/50 [animation-delay:0.4s]"></div>
                  </div>

                  {/* Return Home Button */}
                  <div className="mt-4 sm:mt-6">
                    <Link to={'/home'}>
                      <button className="group w-full sm:w-auto min-w-[200px] px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-sky-500 via-purple-500 to-purple-600 hover:from-sky-600 hover:via-purple-600 hover:to-purple-700 active:scale-95 transition-all duration-300 font-medium text-sm sm:text-base shadow-xl shadow-sky-500/25 hover:shadow-2xl hover:shadow-sky-500/40 backdrop-blur-sm border border-white/20 flex items-center justify-center gap-2 text-white">
                        <span>Return to Home</span>
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-all duration-300 group-hover:rotate-12"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : serviceName === 'account' ? (
              <div className={`mt-6 p-5 sm:p-6 rounded-2xl border md:max-w-[500px] md:mx-auto border-white/20  shadow-lg transition-all duration-300 ${liquidGlassClasses?.base}`}>
                {/* Success Header */}
                <div className="flex flex-col items-center justify-center mb-6 transform transition-all duration-300 hover:scale-105">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg mb-4">
                    <Check className="w-8 h-8 text-white animate-bounce" />
                  </div>
                  <h2 className="font-bold text-xl md:text-2xl text-center bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                    Thank you! Your order is confirmed.
                  </h2>
                </div>

                <div className="mb-2">
                  <div className="flex items-center justify-center p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl mb-4">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-6 h-6 text-yellow-500 mt-1 animate-pulse"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <div>
                        <h4 className="font-semibold text-yellow-500 mb-1 text-sm">Important Notice | စာသေချာဖတ်ပါ!</h4>
                        <p className="text-sm text-yellow-600/80">
                          Please carefully save the following login credentials.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col w-full">
                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 transform hover:scale-[1.02] transition-all duration-300">
                      <p className="text-sm text-center font-medium mb-2">
                        email ရယူဖို့အတွက် အတည်ပြုရန်လိုအပ်ပါတယ်
                      </p>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <span className="text-sm opacity-60">Admin ထဲ ဆက်သွယ်ပါ</span>
                        <div className="flex flex-wrap justify-center gap-2">
                          <a
                            href="https://t.me/Zkari889"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 transition-all duration-300"
                          >
                            <svg className="w-4 h-4 text-blue-400 group-hover:text-blue-300" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7.5 4.5-7.5 4.5z" />
                            </svg>
                            <span className="text-blue-400 group-hover:text-blue-300 font-medium">@Admin1</span>
                          </a>
                          <a
                            href="https://t.me/samsouta"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center text-sm gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 transition-all duration-300"
                          >
                            <svg className="w-4 h-4 text-blue-400 group-hover:text-blue-300" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7.5 4.5-7.5 4.5z" />
                            </svg>
                            <span className="text-blue-400 group-hover:text-blue-300 font-medium">@Admin2</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 text-sm rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-center text-red-400 font-medium">
                      Admin ထံ email ပဲ ပို့ပါ ကျန်တဲ့ password and game password ပို့ရန်မလိုပါ
                    </p>
                  </div>
                </div>

                {/* Credential Block */}
                <div className="grid gap-3 text-sm sm:text-base font-medium">
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm border border-white/10">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <div className="flex justify-between items-center w-full">
                      <span className="opacity-60">Email:</span>
                      <span className="font-medium truncate ml-2">{userCredentials?.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm border border-white/10">
                    <Lock className="w-4 h-4 text-yellow-400" />
                    <div className="flex justify-between items-center w-full">
                      <span className="opacity-60">Email Password:</span>
                      <span className="font-medium truncate ml-2">{userCredentials?.email_password}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm border border-white/10">
                    <KeyRound className="w-4 h-4 text-pink-400" />
                    <div className="flex justify-between items-center w-full">
                      <span className="opacity-60">Game Password:</span>
                      <span className="font-medium truncate ml-2">{userCredentials?.game_password}</span>
                    </div>
                  </div>
                </div>

                {/* Security Warning */}
                <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <p className="text-sm text-center text-red-400">
                    <span className="block font-semibold mb-1">⚠️ Security Warning</span>
                    Keep your credentials safe and secure. Do not share them with others.<br />
                    ဒီထဲက Email နဲ့ password များကိုတခြားသူကိုမရှဲပါနှင့်
                  </p>
                </div>

                {/* Return Home Button */}
                <div className="mt-6 text-center">
                  <Link to={'/home'}>
                    <button className="inline-flex items-center justify-center px-6 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 transition-all duration-300 font-medium">
                      Return to Home
                    </button>
                  </Link>
                </div>
              </div>
            ) : null
          )}

          {/* Footer */}
          <div className="text-center mt-8 mb-8">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.71 0c-2.24.308-4.095 2.291-4.095 4.525v.858c0 2.25 1.851 4.142 4.095 4.525a50.884 50.884 0 008.71 0c.34-.047.677-.112 1.032-.211-1.114 1.866-2.483 3.477-4.405 3.727a48.461 48.461 0 01-6.337.408 48.461 48.461 0 01-6.337-.408C1.821 19.072.374 17.392.374 15.607v-6.97c0-1.782 1.447-3.462 4.539-3.979z" />
                </svg>
              </div>
              <span className="text-sm font-medium">
                Need help? <a href="https://t.me/samsouta" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">Contact Support</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
