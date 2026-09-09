import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { RecoveryPlan } from '../../types';

interface PlanComparisonChartProps {
  plans: RecoveryPlan[];
  selectedPlanId: 'PLAN_A' | 'PLAN_B' | 'PLAN_C';
  onSelectPlan: (id: 'PLAN_A' | 'PLAN_B' | 'PLAN_C') => void;
}

export const PlanComparisonChart: React.FC<PlanComparisonChartProps> = ({
  plans,
  selectedPlanId,
  onSelectPlan,
}) => {
  // Bar Chart comparison dataset
  const barData = [
    {
      metric: 'Extra Cost (₹)',
      'Plan A (Cheapest)': 350,
      'Plan B (Fastest)': 2500,
      'Plan C (AI Recommended)': 650,
    },
    {
      metric: 'Time Lost (Mins)',
      'Plan A (Cheapest)': 180,
      'Plan B (Fastest)': 45,
      'Plan C (AI Recommended)': 120,
    },
    {
      metric: 'Bookings Saved',
      'Plan A (Cheapest)': 3,
      'Plan B (Fastest)': 5,
      'Plan C (AI Recommended)': 4,
    },
    {
      metric: 'Itinerary Changes',
      'Plan A (Cheapest)': 3,
      'Plan B (Fastest)': 1,
      'Plan C (AI Recommended)': 3,
    },
  ];

  // Radar multi-dimensional score dataset (0 - 100)
  const radarData = [
    {
      subject: 'Cost Economy',
      'Plan A': 98,
      'Plan B': 62,
      'Plan C': 92,
      fullMark: 100,
    },
    {
      subject: 'Schedule Speed',
      'Plan A': 60,
      'Plan B': 96,
      'Plan C': 84,
      fullMark: 100,
    },
    {
      subject: 'Convenience',
      'Plan A': 65,
      'Plan B': 94,
      'Plan C': 92,
      fullMark: 100,
    },
    {
      subject: 'Bookings Saved',
      'Plan A': 70,
      'Plan B': 100,
      'Plan C': 95,
      fullMark: 100,
    },
    {
      subject: 'Low Risk Margin',
      'Plan A': 90,
      'Plan B': 78,
      'Plan C': 96,
      fullMark: 100,
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0F172A] border border-slate-700 p-3 rounded-xl shadow-xl text-xs space-y-1">
          <p className="font-bold text-white mb-1.5">{label}</p>
          {payload.map((item: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5" style={{ color: item.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                {item.name}:
              </span>
              <span className="font-mono font-bold text-white">{item.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Visual Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Multi-Factor Radar Assessment */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white tracking-tight">Multi-Objective Pareto Radar</h4>
              <span className="text-[10px] font-mono text-cyan-400 uppercase">Normalized 0-100</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Plan C delivers the largest enclosed surface area (92/100 composite score).
            </p>
          </div>

          <div className="h-64 sm:h-72 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" tick={{ fill: '#64748B', fontSize: 9 }} />
                <Radar
                  name="Plan A (Cheapest)"
                  dataKey="Plan A"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.15}
                />
                <Radar
                  name="Plan B (Fastest)"
                  dataKey="Plan B"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.15}
                />
                <Radar
                  name="Plan C (AI Recommended)"
                  dataKey="Plan C"
                  stroke="#06B6D4"
                  fill="#06B6D4"
                  fillOpacity={0.4}
                />
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                  iconType="circle"
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Bar Comparison metrics */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white tracking-tight">Direct Metrics Comparison</h4>
              <span className="text-[10px] font-mono text-emerald-400 uppercase">Cost vs Time vs Changes</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Compare financial expense against schedule disruption.
            </p>
          </div>

          <div className="h-64 sm:h-72 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                <XAxis dataKey="metric" tick={{ fill: '#94A3B8', fontSize: 10 }} />
                <YAxis tick={{ fill: '#64748B', fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="Plan A (Cheapest)" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Plan B (Fastest)" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Plan C (AI Recommended)" fill="#06B6D4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
