import { useState } from 'react';
import { useSelector } from "react-redux";
import type { RootState } from "../services/store";
import { liquidGlassClasses } from "../style/LiquidGlass";
import { Check, Package, CreditCard, ArrowRight, Sparkles, AlertCircle, KeyRound, Lock, Mail } from 'lucide-react';
import { useMakeOrderMutation } from '../services/API/orderAPI';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

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
  const [makeOrder, { isLoading }] = useMakeOrderMutation();
  const token = Cookies.get('token');



  /**
   * @function Handle ConfirmOrder 
   */
  const handleConfirmOrder = async () => {
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
              <div className={`backdrop-blur-sm bg-gradient-to-r border rounded-2xl p-4 transition-all duration-300 `}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className={`w-5 h-5 mr-2 transition-colors duration-300 `} />
                    <span className={`font-medium transition-colors duration-300 `}>
                      Total Amount
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-sky-500">
                      ${order?.totalPrice}
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

          {/* Success Message */}
          {isConfirmed && (
            order?.orderType === "coin" ? (
              <div className={`mt-6 backdrop-blur-md border rounded-2xl p-4 text-center animate-pulse transition-all duration-300 `}>
                <div className="flex items-center justify-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center mr-3 shadow-lg">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <p className={`font-semibold transition-colors duration-300 `}>
                    Thank you! Your coin order is being processed.
                  </p>
                </div>
                <p className={`text-sm transition-colors duration-300 `}>
                  Please wait while we process your coin transfer. <br></br>
                  |သင့် order တင်ပြီးပါပြီ မိနစ်အနည်းကျရင်လူကြီးမင်း noti ထဲ စစ်ပေးပါ
                </p>
                {/* Return Home Button */}
                <div className="mt-6 text-center">
                  <Link to={'/home'} >
                    <button
                      className="inline-flex items-center justify-center px-6 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 transition-all duration-300  font-medium"
                    >
                      Return to Home
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className={`mt-6 p-5 sm:p-6 rounded-2xl border md:max-w-[500px] md:mx-auto border-white/20  shadow-lg transition-all duration-300 animate-fadeIn ${liquidGlassClasses?.base}`}>
                {/* Header */}
                <div className="flex items-center justify-center mb-4">
                  <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center shadow-md mr-3">
                    <Check className="w-5 h-5 " />
                  </div>
                  <p className=" font-semibold text-base sm:text-lg">
                    Thank you! Your order is confirmed.
                  </p>
                </div>

                <p className="text-sm opacity-70 text-center mb-4">
                  Please use the following credentials to log in. <br></br>
                  ဒီက email နဲ့ password ကိုသုံးပြီး game acc ထဲကိုဝင်လို့ရပါပြီ
                </p>

                {/* Credential Block */}
                <div className="grid gap-3 text-sm sm:text-base font-medium">
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm border border-white/10">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <div className="flex justify-between items-center w-full">
                      <span className=" opacity-60 ">Email:</span>
                      <span className="font-medium truncate ml-2">{userCredentials?.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm border border-white/10">
                    <Lock className="w-4 h-4 text-yellow-400" />
                    <div className="flex justify-between items-center w-full">
                      <span className=" opacity-60 ">Email Password:</span>
                      <span className="font-medium truncate ml-2">{userCredentials?.email_password}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm border border-white/10">
                    <KeyRound className="w-4 h-4 text-pink-400" />
                    <div className="flex justify-between items-center w-full">
                      <span className=" opacity-60 ">Game Password:</span>
                      <span className="font-medium truncate ml-2">{userCredentials?.game_password}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Note */}
                <p className="text-xs opacity-70 text-center mt-4">
                  Keep your credentials safe and secure. Do not share them with others. <br></br>
                  |ဒီထဲက Email နဲ့ password များကိုတခြားသူကိုမရှဲပါနဲ့ screen shot ထားပြီးမိမိဖုန်းမှာသေချာသိမ်းထားပါ
                </p>

                {/* Return Home Button */}
                <div className="mt-6 text-center">
                  <Link to={'/home'} >
                    <button
                      className="inline-flex items-center justify-center px-6 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 transition-all duration-300  font-medium"
                    >
                      Return to Home
                    </button>
                  </Link>
                </div>
              </div>
            )
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
