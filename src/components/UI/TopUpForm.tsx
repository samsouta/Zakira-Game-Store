import React, { useState, useEffect } from 'react';
import { Sparkles, Gamepad2, ShieldCheck, X } from 'lucide-react';
import { liquidGlassClasses } from '../../style/LiquidGlass';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../services/store';
import { setOrder } from '../../services/Slice/orderSlice';

const TopUpForm = ({ onClose }: { 
  onClose: () => void 
}) => {
  const pkg = useSelector((state: RootState) => state.order?.diaData);
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
  if (!gameId.trim() || !serverId.trim()) {
    setError('⚠️ Both Game ID and Server ID are required.');
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
      <div className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 `} onClick={onClose} />
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

          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-blue-400 animate-pulse" /> Enter Your Game Info
          </h2>

          {error && (
            <div className={` p-3 rounded-xl`}>
              <p className="text-red-400 text-sm font-medium animate-pulse">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-white text-sm sm:text-base">Game ID</label>
            <input
              type="text"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              placeholder="e.g. 12345678"
              className={`w-full px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400`}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-white text-sm sm:text-base">Server ID</label>
            <input
              type="text"
              value={serverId}
              onChange={(e) => setServerId(e.target.value)}
              placeholder="e.g. 1234"
              className={`w-full px-4 py-2 rounded-xl  focus:ring-2 focus:ring-purple-400`}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-white ${liquidGlassClasses.btn} hover:scale-[1.01] transition-all duration-300`}
          >
            <ShieldCheck className="w-4 h-4 inline-block mr-2 text-green-400 animate-bounce" /> Confirm Info
          </button>

          <div className={`text-xs text-white/60 text-center `}>
            <Sparkles className="inline-block w-3 h-3 mr-1 text-yellow-400" /> Ensure your info is correct to avoid delays.
          </div>
        </form>
      </div>
    </>
  );
};

export default TopUpForm;
