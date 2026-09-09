import React from 'react';
import { motion } from 'framer-motion';

interface CircularProgressProps {
  value: number; // 0 - 100
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  color?: string;
  showGrade?: boolean;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 140,
  strokeWidth = 10,
  label = 'HEALTH SCORE',
  sublabel = '/ 100',
  color = '#06B6D4',
  showGrade = false,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  const getStatusColor = (val: number) => {
    if (val >= 85) return '#10B981'; // green
    if (val >= 70) return '#06B6D4'; // cyan
    if (val >= 50) return '#F59E0B'; // yellow/amber
    return '#EF4444'; // red
  };

  const activeColor = color || getStatusColor(value);

  return (
    <div className="relative flex flex-col items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={activeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          strokeLinecap="round"
          fill="transparent"
          style={{
            filter: `drop-shadow(0 0 8px ${activeColor}80)`,
          }}
        />
      </svg>

      {/* Center display text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-extrabold font-mono tracking-tight text-white"
        >
          {value}
        </motion.span>
        {sublabel && (
          <span className="text-[11px] font-medium text-slate-400 font-mono -mt-0.5">
            {sublabel}
          </span>
        )}
        {label && (
          <span className="text-[9px] font-semibold uppercase tracking-widest text-cyan-400 mt-1">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};
