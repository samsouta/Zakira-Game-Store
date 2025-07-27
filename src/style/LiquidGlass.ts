
// LiquidGlass.ts
export const liquidGlassClasses = {
  base : [
    'bg-[var(--glass-light-bg)] dark:bg-[var(--glass-dark-bg)] backdrop-blur-lg',
    'border border-[var(--glass-light-border)] dark:border-[var(--glass-dark-border)]',
    'shadow-lg shadow-[var(--glass-light-shadow)] dark:shadow-[var(--glass-dark-shadow)]',
    'text-[var(--glass-light-text)] dark:text-[var(--glass-dark-text)]',
  ].join(' '),

  // Button 
  btn : [
    // color 
    'bg-[var(--glass-light-bg)] dark:bg-[var(--glass-dark-bg)]',
    'border rounded-full border-[var(--glass-light-border)] dark:border-[var(--glass-dark-border)]',
    'shadow-inner shadow-[var(--glass-light-shadow)] dark:shadow-[var(--glass-dark-shadow)]',
    'text-[var(--glass-light-text)] dark:text-[var(--glass-dark-text)]',
    'hover:scale-105 active:scale-95 transition-all duration-100',
    // Button Layout 
    ' w-10 h-10 flex items-center justify-center'
  ].join(' '),

  liquidText : [
    'text-[var(--glass-light-text)] dark:text-[var(--glass-dark-text)]',
  ].join(' '),

  liquidTextDesc : [
    'text-white/60 dark:text-[var(--glass-dark-text)]',
  ].join(' '),

  // Text input area
  textArea : [
    'w-full h-32 px-4 py-3 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none placeholder:text-black/40 placeholder:dark:text-white/40',
    'bg-[var(--glass-light-bg)] dark:bg-[var(--glass-dark-bg)] backdrop-blur-lg',
    'border border-[var(--glass-light-border)] dark:border-[var(--glass-dark-border)]',
    'shadow-inner shadow-[var(--glass-light-shadow)] dark:shadow-[var(--glass-dark-shadow)]',
  ].join(' '),

  //header 
  header : [
    'bg-gradient-to-br from-white/40 via-white/30 to-transparent dark:from-gray-800/40 dark:via-gray-800/30 dark:to-transparent backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20 supports-[backdrop-filter]:bg-white/10',
    'dark:supports-[backdrop-filter]:bg-gray-900/10'
  ].join(' ')
}
