// src/app/(website)/components/FooterSkeleton.tsx
import React from 'react';

export const FooterSkeleton: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between mb-12">
          {/* Logo area */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <div className="h-8 w-32 bg-gray-800 rounded-md mb-3"></div>
            <div className="h-4 w-56 bg-gray-800 rounded-md mb-2"></div>
            <div className="h-4 w-48 bg-gray-800 rounded-md"></div>
          </div>

          {/* Footer columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full md:w-2/3">
            {[1, 2, 3].map(column => (
              <div key={column} className="flex flex-col space-y-3">
                <div className="h-5 w-24 bg-gray-800 rounded-md mb-2"></div>
                {[1, 2, 3, 4].map(item => (
                  <div key={item} className="h-4 w-32 bg-gray-800/60 rounded-md"></div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="h-4 w-64 bg-gray-800/60 rounded-md"></div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {[1, 2, 3, 4].map(icon => (
              <div key={icon} className="h-8 w-8 bg-gray-800/60 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
