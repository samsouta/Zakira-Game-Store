import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useLogOutMutation } from '../../services/API/Auth';
import { liquidGlassClasses } from '../../style/LiquidGlass';
import PageMeta from '../../components/common/PageMeta';


export const Banned = () => {
  const Info = JSON.parse(Cookies.get('user') || '{}');
  const token = Cookies.get('token');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [LogOut, { isLoading }] = useLogOutMutation();

  /**
   * @function
   * Handle Logout User
   */
  const handleLogout = async () => {
    if (!token) return;
    // logout process
    try {
      const response = await LogOut(token).unwrap();
      if (response?.success) {
        Cookies.remove('token');
        Cookies.remove('user');
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };



  /**
   * @useEffect 
   * Banned UI Theme 
   */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const FloatingShape = ({ size = 'w-20 h-20', color = 'bg-rose-400/20' }: {
    delay?: number;
    size?: string;
    color?: string;
  }) => (
    <div
      className={`absolute ${size} ${color} rounded-full blur-xl`}
      style={{
        transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`
      }}
    />
  );

  const GlassMorphCard = ({ children, className = '' }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl ${className}`}>
      {children}
    </div>
  );

  return (
    <>
      <PageMeta title="Banned - Zakari Game Store" description="Your account has been banned" />
      <div className={`min-h-screen w-full flex items-center justify-center overflow-hidden relative p-4 ${liquidGlassClasses?.liquidText}`}>

        {/* Floating Backgrounds */}
        <FloatingShape size="w-32 h-32" color="bg-red-400/10" />
        <FloatingShape size="w-24 h-24" color="bg-rose-500/10" />
        <FloatingShape size="w-40 h-40" color="bg-pink-400/10" />
        <FloatingShape size="w-28 h-28" color="bg-amber-400/10" />

        {/* Decorative Shapes */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full opacity-20" />
        <div className="absolute top-20 right-20 w-12 h-12 bg-gradient-to-r from-amber-400 to-red-400 rounded-full opacity-20" />

        {/* Main Block */}
        <div className={`max-w-3xl w-full text-center`}>

          {/* Banned Title */}
          <GlassMorphCard className="p-8 mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent mb-4 animate-pulse select-none">
              <span className="inline-flex items-center gap-2">
                <span className="text-4xl md:text-6xl lg:text-7xl">🚫</span>
                BANNED
              </span>
            </h1>
            <div className="h-1 w-40 bg-gradient-to-r from-red-500 to-pink-500 mx-auto rounded-full mb-6" />
          </GlassMorphCard>

          {/* Message */}
          <GlassMorphCard className="p-6 md:p-8 mb-8">
            <h2 className="text-2xl md:text-4xl font-bold  mb-4">
              Your Account Has Been Banned
            </h2>
            <div className="space-y-6">
              <p className=" opacity-60 text-lg md:text-xl leading-relaxed">
                Access to this platform has been restricted for your account.
              </p>

              <div className="p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl border border-red-500/20">
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                  Reason for Ban
                </h3>
                <p className="oxanium font-medium">
                  {Info?.ban_reason || "Violation of platform guidelines"}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2  px-4 sm:px-0">
                <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-sm md:text-base flex flex-wrap items-center justify-center sm:justify-start gap-1 text-center sm:text-left">
                  If you believe this is a mistake, please{' '}
                  <a
                    href="https://t.me/samsouta"
                    className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors duration-200 underline decoration-dotted underline-offset-2 break-words"
                  >
                    contact support
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className={`group relative px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 font-semibold rounded-2xl ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                <span className="relative z-10">
                  {isLoading ? 'Logging out...' : 'Logout'}
                </span>
              </button>
            </div>
          </GlassMorphCard>
        </div>
      </div>
    </>
  );
};

export default Banned;
