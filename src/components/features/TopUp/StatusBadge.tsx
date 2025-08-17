import { CheckCircle, Clock, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: 'pending' | 'confirmed' | 'rejected';
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const configs = {
    pending: {
      color: 'bg-yellow-100/30 dark:bg-yellow-400/10 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-400/20',
      icon: Clock,
      glow: 'shadow-yellow-100/50 dark:shadow-yellow-400/30',
      hover: 'hover:bg-yellow-100/40 dark:hover:bg-yellow-400/20 transition-colors'
    },
    confirmed: {
      color: 'bg-emerald-100/30 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-400/20',
      icon: CheckCircle,
      glow: 'shadow-emerald-100/50 dark:shadow-emerald-400/30',
      hover: 'hover:bg-emerald-100/40 dark:hover:bg-emerald-400/20 transition-colors'
    },
    rejected: {
      color: 'bg-rose-100/30 dark:bg-rose-400/10 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-400/20',
      icon: XCircle,
      glow: 'shadow-rose-100/50 dark:shadow-rose-400/30',
      hover: 'hover:bg-rose-100/40 dark:hover:bg-rose-400/20 transition-colors'
    }
  } as const;
  
  const config = configs[status] || configs.pending;
  const Icon = config.icon;
  
  return (
    <span 
      className={`
        inline-flex items-center gap-1.5 
        px-3 py-1.5 rounded-full 
        text-xs font-medium border 
        backdrop-blur-sm backdrop-saturate-150
        ${config.color}
        ${config.glow}
        ${config.hover}
        shadow-lg capitalize
        ${status === 'pending' ? 'animate-pulse' : ''}
      `}
    >
      <Icon size={14} className="opacity-80" />
      {status}
    </span>
  );
};