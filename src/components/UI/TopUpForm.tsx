import React, { useState, useEffect } from 'react';
import { Sparkles, Gamepad2, ShieldCheck, X } from 'lucide-react';
import { liquidGlassClasses } from '../../style/LiquidGlass';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../services/store';
import { setOrder } from '../../services/Slice/orderSlice';


const HiddenGame = ['pubg-coin']
const TopUpForm = ({ onClose }: { 
  onClose: () => void 
}) => {
  const pkg = useSelector((state: RootState) => state.order?.diaData);
  const gameSlug = useSelector((state: RootState) => state?.services?.gameName);
  const [gameId, setGameId] = useState('');
  const [serverId, setServerId] = useState('');
  const [error, setError] = useState('');
  const router = useNavigate();
  const dispatch = useDispatch();
  // prevent scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validate required fields
  if (!gameId.trim()) {
    setError('⚠️ Game ID is required.');
    return;
  }

  // Clear any previous errors
  setError('');

  try {
    // Validate data from pkg before dispatching
    if (!pkg) {
      throw new Error('Package data is missing');
    }

    // Dispatch order data to store
   dispatch(setOrder({
      orderId: pkg.orderId?.toString() || '',
      orderType: pkg.orderType || '',
      image: pkg.image || '',
      title: pkg.title || '',
      totalPrice: Number(pkg.totalPrice || 0),
      service_id: pkg?.service_id,
      game_server: serverId, 
      game_uid: gameId
    }));

    // Navigate to order page
    router('/order');

    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  } catch (error) {
    console.error('Failed to process order:', error);
    setError('Failed to process order. Please try again.');
  }
};


  return (
    <>
      <div className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 ${liquidGlassClasses?.liquidText} `} onClick={onClose} />
      <div className="w-full fixed z-50 max-w-md mx-auto px-4 py-6 sm:px-6 lg:px-8 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <form
          onSubmit={handleSubmit}
          className={`relative rounded-2xl shadow-2xl p-6 space-y-5 ${liquidGlassClasses.base} border border-white/20`}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 transition-colors duration-200"
          >
            <X className="w-4 h-4 text-white/80" />
          </button>

          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-blue-400 animate-pulse" /> Enter Your Game Info
          </h2>

          {error && (
            <div className={` p-3 rounded-xl`}>
              <p className="text-red-400 text-sm font-medium animate-pulse">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm sm:text-base">Game ID</label>
            <input
              type="number"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              placeholder="e.g. 12345678"
              className={`w-full px-4 py-2 rounded-xl 
                focus:ring-2 focus:ring-blue-400 
                text-gray-900 dark:text-white
                bg-white dark:bg-gray-800
                border border-gray-300 dark:border-gray-600
                placeholder:text-gray-400 dark:placeholder:text-gray-500
                focus:border-blue-400 dark:focus:border-blue-400
                transition-colors duration-200`}
            />
          </div>

          {!HiddenGame.includes(gameSlug || '') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm sm:text-base font-medium">
                  Server ID
                </label>
              </div>
              
              {/* Server ID ( Optional ) for Other Game  */}
              <div className="relative">
                <input
                  type="number"
                  value={serverId}
                  onChange={(e) => setServerId(e.target.value)}
                  placeholder="Enter server ID "
                  className={`w-full px-4 py-3 rounded-xl
                    focus:ring-2 focus:ring-blue-400 
                    text-gray-900 dark:text-white
                    bg-white dark:bg-gray-800
                    border border-gray-300 dark:border-gray-600
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                    focus:border-blue-400 dark:focus:border-blue-400
                    transition-all duration-200
                    hover:border-blue-400`}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-2.5 px-4 rounded-xl font-bold  ${liquidGlassClasses.btn} hover:scale-[1.01] transition-all duration-300`}
          >
            <ShieldCheck className="w-4 h-4 inline-block mr-2 text-green-400 animate-bounce" /> Confirm Info
          </button>

          <div className={`text-xs opacity-60 text-red-400 text-center `}>
            <Sparkles className="inline-block w-3 h-3 mr-1 text-yellow-400" /> Ensure your info is correct to avoid delays. <br></br>
            <span className="text-red-400">⚠️</span> သေချာစစ်ဆေးပြီးမှသာ ထည့်ပေးပါရန် မေတ္တာရပ်ခံအပ်ပါသည်
          </div>
        </form>
      </div>
    </>
  );
};

export default TopUpForm;
