import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BookingStatus, RiskLevel } from '../../types';

interface BadgeProps {
  status?: BookingStatus | RiskLevel | 'ON_TRACK' | 'DISRUPTED' | 'RECOVERED';
  children?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'cyan';
  size?: 'xs' | 'sm' | 'md';
  pulse?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  status,
  children,
  variant,
  size = 'sm',
  pulse = false,
  className,
}) => {
  let resolvedVariant = variant || 'default';
  let label = children;

  if (status) {
    switch (status) {
      case 'CONFIRMED':
      case 'ON_TRACK':
      case 'RECOVERED':
        resolvedVariant = 'success';
        label = label || (status === 'RECOVERED' ? 'RECOVERED' : 'CONFIRMED');
        break;
      case 'AT_RISK':
      case 'MEDIUM':
      case 'HIGH':
        resolvedVariant = 'warning';
        label = label || 'AT RISK';
        break;
      case 'DELAYED':
      case 'MISSED':
      case 'DISRUPTED':
      case 'CRITICAL':
      case 'CANCELLED':
        resolvedVariant = 'danger';
        label = label || status;
        break;
      case 'LOW':
        resolvedVariant = 'info';
        label = label || 'LOW RISK';
        break;
    }
  }

  const variantStyles = {
    default: 'bg-slate-800/80 text-slate-300 border-slate-700/60',
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    danger: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    info: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    purple: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  };

  const sizeStyles = {
    xs: 'text-[10px] px-1.5 py-0.5 font-medium tracking-wide',
    sm: 'text-xs px-2.5 py-1 font-semibold tracking-wide',
    md: 'text-sm px-3 py-1.5 font-semibold',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 rounded-md uppercase border transition-all select-none',
          variantStyles[resolvedVariant],
          sizeStyles[size],
          className
        )
      )}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={clsx(
              'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
              resolvedVariant === 'danger' && 'bg-rose-400',
              resolvedVariant === 'warning' && 'bg-amber-400',
              resolvedVariant === 'success' && 'bg-emerald-400',
              resolvedVariant === 'cyan' && 'bg-cyan-400'
            )}
          />
          <span
            className={clsx(
              'relative inline-flex rounded-full h-2 w-2',
              resolvedVariant === 'danger' && 'bg-rose-500',
              resolvedVariant === 'warning' && 'bg-amber-500',
              resolvedVariant === 'success' && 'bg-emerald-500',
              resolvedVariant === 'cyan' && 'bg-cyan-500'
            )}
          />
        </span>
      )}
      {label}
    </span>
  );
};
