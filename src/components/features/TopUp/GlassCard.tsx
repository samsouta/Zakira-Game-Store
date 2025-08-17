import { liquidGlassClasses } from "../../../style/LiquidGlass";

// Components
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = "", 
  glow = false 
}) => (
  <div 
    className={`
      ${liquidGlassClasses?.base}
      rounded-3xl 
      shadow-2xl 
      ${glow ? 'shadow-cyan-500/25' : ''} 
      ${className}
    `}
  >
    {children}
  </div>
);