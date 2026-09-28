import React from 'react';

export const LoadingSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs animate-pulse flex flex-col justify-between"
        >
          <div>
            <div className="w-full h-44 bg-slate-200 rounded-xl mb-4" />
            <div className="flex gap-2 mb-3">
              <div className="h-5 w-20 bg-slate-200 rounded-full" />
              <div className="h-5 w-16 bg-slate-200 rounded-full" />
            </div>
            <div className="h-5 w-3/4 bg-slate-200 rounded mb-2" />
            <div className="h-3.5 w-full bg-slate-200 rounded mb-1.5" />
            <div className="h-3.5 w-5/6 bg-slate-200 rounded mb-4" />
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="h-4 w-24 bg-slate-200 rounded" />
            <div className="h-8 w-24 bg-slate-200 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};
