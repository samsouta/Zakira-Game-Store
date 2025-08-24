export const BackgroundPattern = () => {
  return (
    <div 
      className="fixed inset-0 w-full h-full bg-white dark:bg-[#020617] pointer-events-none"
      style={{
        // Light mode background
        backgroundImage: `
          linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
          radial-gradient(circle 500px at 20% 100%, rgba(139,92,246,0.3), transparent),
          radial-gradient(circle 500px at 100% 80%, rgba(59,130,246,0.3), transparent)
        `,
        backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
      }}
    >
      {/* Dark mode override */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background: "#020617",
          backgroundImage: `
            linear-gradient(to right, rgba(100,116,139,0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(100,116,139,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
};