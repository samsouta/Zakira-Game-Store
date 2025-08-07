import React from 'react';
import { User, Phone } from 'lucide-react';
import type { UserData } from '../../../types/UserType';
import { liquidGlassClasses } from '../../../style/LiquidGlass';

interface ProfileSectionProps {
  userData: UserData;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ userData }) => {
  return (
    <div className={`mb-8 ${liquidGlassClasses?.liquidText}`}>
      <div className={` rounded-3xl p-6 md:p-8 shadow-2xl ${liquidGlassClasses?.base}`}>
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20">
            <User className="w-6 h-6 " />
          </div>
          <h2 className="text-2xl font-semibold oxanium">Profile Information</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="group">
            <label className="block text-sm font-medium opacity-60 mb-2">Username</label>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
              <User className="w-5 h-5" />
              <span className=" font-medium">{userData.username}</span>
            </div>
          </div>
          
          <div className="group">
            <label className="block text-sm font-medium opacity-60 mb-2">Phone Number</label>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
              <Phone className="w-5 h-5 " />
              <span className=" font-medium">{userData?.phone_number}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};