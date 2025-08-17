import { TrendingUp } from "lucide-react";
import { mockBalance } from "../../../data/mockData";
import { GlassCard } from "./GlassCard";

export const FloatingBalance = () => (
  <GlassCard className="p-6 mb-8 relative overflow-hidden" glow>
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
    <div className="relative z-10 flex items-center justify-between">
      <div>
        <p className="text-white/60 text-sm font-medium">Current Balance</p>
        <p className="text-3xl font-bold text-white mt-1">
          ${mockBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      </div>
      <div className="p-3 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-2xl">
        <TrendingUp className="w-8 h-8 text-cyan-400" />
      </div>
    </div>
  </GlassCard>
);