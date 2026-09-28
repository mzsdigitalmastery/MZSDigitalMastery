import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav className="flex items-center text-xs text-slate-500 py-2" aria-label="Breadcrumb">
      <button
        onClick={() => onNavigate('/')}
        className="flex items-center gap-1 hover:text-[#1769FF] transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only">Home</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 mx-1.5 shrink-0" />
            {isLast || !item.path ? (
              <span className="font-semibold text-[#07152E] truncate max-w-xs sm:max-w-md">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => item.path && onNavigate(item.path)}
                className="hover:text-[#1769FF] transition-colors truncate max-w-[150px]"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
