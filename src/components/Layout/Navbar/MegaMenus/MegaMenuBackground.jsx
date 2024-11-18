// src/components/Layout/Navbar/MegaMenus/MegaMenuBackground.jsx
const MegaMenuBackground = ({ children }) => {
  return (
    <div
      className="absolute left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 
      dark:border-gray-800 shadow-lg"
    >
      <div className="relative">
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-white to-white 
          dark:from-primary-900/20 dark:via-gray-900 dark:to-gray-900"
        />

        {/* Pattern Overlay */}
        <div
          className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02] 
          mix-blend-multiply dark:mix-blend-screen"
        />

        {/* Content */}
        <div className="relative">{children}</div>
      </div>
    </div>
  );
};

export default MegaMenuBackground;
