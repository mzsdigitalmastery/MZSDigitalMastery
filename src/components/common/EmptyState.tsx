import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No resources found',
  description = 'Try adjusting your search criteria, category filters, or explore our curated collections.',
  actionText = 'Reset Filters',
  onAction,
}) => {
  return (
    <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs max-w-lg mx-auto">
      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-blue-50 flex items-center justify-center text-[#1769FF] border border-blue-100">
        <SearchX className="w-7 h-7" />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-[#07152E] mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
        {description}
      </p>
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};
