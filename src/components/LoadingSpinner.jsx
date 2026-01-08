import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center py-20 animate-fade-in">
      <div className="relative">
        <div className="h-16 w-16 border-4 border-indigo-200 rounded-full"></div>
        <div className="h-16 w-16 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin absolute top-0 left-0"></div>
        <div className="h-16 w-16 border-4 border-transparent border-r-purple-600 rounded-full animate-spin absolute top-0 left-0" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
      </div>
      <p className="mt-6 text-indigo-600 font-semibold text-lg animate-pulse-slow">Loading delicious recipes...</p>
    </div>
  );
}

export default LoadingSpinner;
