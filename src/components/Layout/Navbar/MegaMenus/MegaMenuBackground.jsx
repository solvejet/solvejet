const MegaMenuBackground = ({ children }) => {
  return (
    <div
      className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 
        shadow-lg backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80"
    >
      <div className="relative">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent 
            dark:from-primary-900/20 dark:to-transparent opacity-50"
        />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02]" />

        {/* Content */}
        <div className="relative">{children}</div>
      </div>
    </div>
  );
};

export default MegaMenuBackground;
