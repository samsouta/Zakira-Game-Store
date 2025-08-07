// ✅ FIXED and cleaned-up version of your NotFound page
// - TypeScript safety
// - Responsive full height
// - Minor fixes (missing types, button navigation)

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFount = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const FloatingShape = ({ delay = 0, size = 'w-20 h-20', color = 'bg-sky-400/20' }: {
    delay?: number;
    size?: string;
    color?: string;
  }) => (
    <div
      className={`absolute ${size} ${color} rounded-full blur-xl animate-pulse`}
      style={{
        animation: `float 6s ease-in-out infinite ${delay}s, pulse 4s ease-in-out infinite ${delay}s`,
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
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden relative p-4">
      {/* Floating Backgrounds */}
      <FloatingShape delay={0} size="w-32 h-32" color="bg-sky-400/10" />
      <FloatingShape delay={1} size="w-24 h-24" color="bg-purple-400/10" />
      <FloatingShape delay={2} size="w-40 h-40" color="bg-rose-400/10" />
      <FloatingShape delay={3} size="w-28 h-28" color="bg-amber-400/10" />

      {/* Top-left Decorative Shapes */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-r from-sky-400 to-purple-400 rounded-full opacity-20 animate-bounce" />
      <div className="absolute top-20 right-20 w-12 h-12 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full opacity-20 animate-bounce" />
      <div className="absolute bottom-20 left-20 w-20 h-20 bg-gradient-to-r from-purple-400 to-sky-400 rounded-full opacity-20 animate-bounce" />

      {/* Main Block */}
      <div className={`max-w-4xl w-full text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        {/* 404 Title */}
        <GlassMorphCard className="p-8 mb-8">
          <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-sky-400 via-purple-400 to-rose-400 bg-clip-text text-transparent mb-4 animate-pulse">
            404
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-sky-400 to-purple-400 mx-auto rounded-full mb-6 animate-pulse" />
        </GlassMorphCard>

        {/* Message */}
        <GlassMorphCard className="p-6 md:p-8 mb-8">
          <h2 className="text-2xl md:text-4xl font-bold  mb-4 animate-fadeIn">
            Oops! Page Not Found
          </h2>
          <p className=" opacity-60 text-lg md:text-xl mb-6 leading-relaxed animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            Our robot couldn't find what you're looking for. Don't worry, it happens to the best of us!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => navigate('/')}
              className="group relative px-8 py-4 bg-gradient-to-r from-sky-400 to-purple-400  font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto"
            >
              <span className="relative z-10">Home</span>
            </button>
            <button className="group relative px-8 py-4 backdrop-blur-xl bg-white/10 border border-white/20  font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-white/20 w-full sm:w-auto">
              <span className="relative z-10">Search</span>
            </button>
          </div>
        </GlassMorphCard>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          {[
            { label: 'Error Code', value: '404', color: 'from-sky-400 to-purple-400' },
            { label: 'Robot Mood', value: 'Sad', color: 'from-purple-400 to-rose-400' },
            { label: 'Hope Level', value: 'High', color: 'from-rose-400 to-amber-400' },
            { label: 'Solution', value: 'Soon', color: 'from-amber-400 to-sky-400' }
          ].map((stat, index) => (
            <GlassMorphCard key={index} className="p-4 text-center hover:scale-105 transition-transform duration-300">
              <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className=" opacity-60 text-sm md:text-base">{stat.label}</div>
            </GlassMorphCard>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default NotFount;
