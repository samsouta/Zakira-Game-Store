import React from 'react';
import { User, Phone } from 'lucide-react';
import type { UserData } from '../../../types/UserType';

interface ProfileSectionProps {
  userData: UserData;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ userData }) => {
  return (
    <div className="mb-8">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20">
            <User className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-white">Profile Information</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="group">
            <label className="block text-sm font-medium text-blue-200 mb-2">Username</label>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
              <User className="w-5 h-5 text-blue-300" />
              <span className="text-white font-medium">{userData.username}</span>
            </div>
          </div>
          
          <div className="group">
            <label className="block text-sm font-medium text-blue-200 mb-2">Phone Number</label>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
              <Phone className="w-5 h-5 text-blue-300" />
              <span className="text-white font-medium">{userData?.phone_number}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};