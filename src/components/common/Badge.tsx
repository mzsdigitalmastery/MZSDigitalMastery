import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'cyan' | 'gray' | 'emerald' | 'amber' | 'purple' | 'navy';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  size = 'sm',
  className = '',
}) => {
  const variantStyles = {
    blue: 'bg-blue-50 text-[#1769FF] border border-blue-200/60',
    cyan: 'bg-cyan-50 text-[#0092B8] border border-cyan-200/60',
    gray: 'bg-slate-100 text-slate-700 border border-slate-200',
    emerald: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
    amber: 'bg-amber-50 text-amber-700 border border-amber-200/60',
    purple: 'bg-purple-50 text-purple-700 border border-purple-200/60',
    navy: 'bg-[#07152E] text-white border border-slate-800',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 font-medium rounded-full',
    md: 'text-sm px-3 py-1 font-medium rounded-full',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
};
