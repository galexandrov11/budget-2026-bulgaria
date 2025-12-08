import React, { useState } from 'react';
import BudgetVisualizations from './components/BudgetVisualizations';
import FullAnalysis from './components/FullAnalysis';

// Icons - Simple, professional SVG icons
const Icons = {
  Chart: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  Document: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  Book: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  TrendUp: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  ),
  TrendDown: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  Alert: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
  Euro: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5H5.25m2.25 3H5.25M9 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Info: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  ),
  // New enhanced icons for dashboard
  Revenue: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
    </svg>
  ),
  Expenditure: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Deficit: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  Debt: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
    </svg>
  ),
  Star: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  Flag: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
    </svg>
  ),
  Calendar: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  ),
  Globe: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  Shield: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  ArrowUp: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
  ),
  ArrowDown: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  ),
  Minus: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
    </svg>
  ),
};

// Key findings data - enhanced with more context
const keyFindings = [
  {
    title: "Дефицитът нараства значително",
    value: "+18.5%",
    description: "от 3.86 на 4.58 млрд. EUR между версиите",
    context: "Увеличение с 720 млн. EUR",
    type: "danger",
    icon: Icons.TrendUp,
    severity: "high",
  },
  {
    title: "Данъчни приходи намаляват",
    value: "-913 млн.",
    description: "корекция надолу спрямо ноемврийската версия",
    context: "Основно от преки данъци",
    type: "warning",
    icon: Icons.TrendDown,
    severity: "medium",
  },
  {
    title: "Капиталови разходи съкратени",
    value: "-16.3%",
    description: "намаление на инвестиционните разходи",
    context: "-481 млн. EUR за инфраструктура",
    type: "warning",
    icon: Icons.TrendDown,
    severity: "medium",
  },
  {
    title: "Маастрихт критерий спазен",
    value: "3.0%",
    description: "дефицитът точно на границата",
    context: "Изискване: макс. 3% от БВП",
    type: "success",
    icon: Icons.Check,
    severity: "ok",
  },
];

// Enhanced summary metrics with sparkline data and better context
const summaryMetrics = [
  {
    id: 'revenue',
    label: "Приходи",
    value: "30.4",
    unit: "млрд. EUR",
    change: -2.92,
    previousValue: "31.3",
    sublabel: "Консолидирани приходи",
    icon: Icons.Revenue,
    colorClass: "gov",
    // Mini sparkline data (last 4 versions/projections)
    trend: [31.8, 31.5, 31.3, 30.4],
  },
  {
    id: 'expenditure',
    label: "Разходи",
    value: "35.0",
    unit: "млрд. EUR",
    change: -2.38,
    previousValue: "35.8",
    sublabel: "Консолидирани разходи",
    icon: Icons.Expenditure,
    colorClass: "warning",
    trend: [36.2, 35.9, 35.8, 35.0],
  },
  {
    id: 'deficit',
    label: "Дефицит",
    value: "4.58",
    unit: "млрд. EUR",
    change: 18.70,
    previousValue: "3.86",
    sublabel: "3.81% от БВП",
    icon: Icons.Deficit,
    colorClass: "danger",
    isDeficit: true,
    trend: [3.2, 3.5, 3.86, 4.58],
  },
  {
    id: 'debt',
    label: "Държавен дълг",
    value: "31.3",
    unit: "% от БВП",
    change: null,
    previousValue: null,
    sublabel: "Лимит по Маастрихт: 60%",
    icon: Icons.Debt,
    colorClass: "accent",
    threshold: 60,
    trend: [25.1, 27.3, 29.8, 31.3],
  },
];

// Budget health score calculation (simplified for display)
const budgetHealthScore = {
  overall: 62,
  label: "Умерен риск",
  components: [
    { name: "Фискална стабилност", score: 75, weight: 0.3 },
    { name: "Дефицит контрол", score: 45, weight: 0.25 },
    { name: "Дългова устойчивост", score: 85, weight: 0.25 },
    { name: "Инвестиционен капацитет", score: 40, weight: 0.2 },
  ],
};

// Mini Sparkline Component for trend visualization
function MiniSparkline({ data, color = "#3674ae", height = 24, width = 60 }) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');

  const lastPoint = data[data.length - 1];
  const lastX = width;
  const lastY = height - ((lastPoint - min) / range) * (height - 4) - 2;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        opacity="0.6"
      />
      <circle
        cx={lastX}
        cy={lastY}
        r="3"
        fill={color}
      />
    </svg>
  );
}

// Enhanced Metric Card with icon, sparkline, and better visual hierarchy
function EnhancedMetricCard({ metric }) {
  const {
    label,
    value,
    unit,
    change,
    previousValue,
    sublabel,
    icon: IconComponent,
    colorClass,
    isDeficit,
    threshold,
    trend,
  } = metric;

  // Determine change direction and colors
  const isPositiveChange = change > 0;
  const isNegativeForMetric = isDeficit ? isPositiveChange : !isPositiveChange;

  // Color mapping for different metric types
  const colorMap = {
    gov: { bg: 'bg-gov-50', border: 'border-gov-200', icon: 'bg-gov-500', text: 'text-gov-600', spark: '#3674ae' },
    warning: { bg: 'bg-warning-50', border: 'border-warning-200', icon: 'bg-warning-500', text: 'text-warning-600', spark: '#f59e0b' },
    danger: { bg: 'bg-danger-50', border: 'border-danger-200', icon: 'bg-danger-500', text: 'text-danger-600', spark: '#D62612' },
    accent: { bg: 'bg-accent-50', border: 'border-accent-200', icon: 'bg-accent-500', text: 'text-accent-600', spark: '#00966E' },
  };

  const colors = colorMap[colorClass] || colorMap.gov;

  return (
    <div className="dashboard-metric-card group">
      {/* Header with icon and label */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${colors.icon} flex items-center justify-center text-white shadow-sm`}>
            <IconComponent />
          </div>
          <div>
            <span className="text-sm font-semibold text-slate-700">{label}</span>
            <div className="text-xs text-slate-400">{sublabel}</div>
          </div>
        </div>
        {/* Mini sparkline */}
        {trend && (
          <div className="opacity-60 group-hover:opacity-100 transition-opacity">
            <MiniSparkline data={trend} color={colors.spark} />
          </div>
        )}
      </div>

      {/* Value display */}
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-slate-900 tabular-nums tracking-tight">
              {value}
            </span>
            <span className="text-sm text-slate-500 font-medium">{unit}</span>
          </div>

          {/* Change indicator */}
          {change !== null && (
            <div className={`flex items-center gap-1.5 mt-2 text-sm font-semibold ${
              isNegativeForMetric ? 'text-danger-600' : 'text-accent-600'
            }`}>
              {isPositiveChange ? <Icons.ArrowUp /> : <Icons.ArrowDown />}
              <span>{isPositiveChange ? '+' : ''}{change.toFixed(2)}%</span>
              {previousValue && (
                <span className="text-slate-400 font-normal ml-1">
                  от {previousValue}
                </span>
              )}
            </div>
          )}

          {/* Threshold indicator for debt */}
          {threshold && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-500">Използване на лимита</span>
                <span className="font-semibold text-accent-600">{((parseFloat(value) / threshold) * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((parseFloat(value) / threshold) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Enhanced Finding Card with severity indicator and context
function EnhancedFindingCard({ finding, index }) {
  const colorStyles = {
    danger: {
      bg: 'bg-gradient-to-br from-danger-50 to-danger-100/50',
      border: 'border-danger-200',
      icon: 'bg-danger-500',
      text: 'text-danger-700',
      badge: 'bg-danger-100 text-danger-700',
      glow: 'shadow-danger-500/10',
    },
    warning: {
      bg: 'bg-gradient-to-br from-warning-50 to-warning-100/50',
      border: 'border-warning-200',
      icon: 'bg-warning-500',
      text: 'text-warning-700',
      badge: 'bg-warning-100 text-warning-700',
      glow: 'shadow-warning-500/10',
    },
    success: {
      bg: 'bg-gradient-to-br from-accent-50 to-accent-100/50',
      border: 'border-accent-200',
      icon: 'bg-accent-500',
      text: 'text-accent-700',
      badge: 'bg-accent-100 text-accent-700',
      glow: 'shadow-accent-500/10',
    },
    info: {
      bg: 'bg-gradient-to-br from-gov-50 to-gov-100/50',
      border: 'border-gov-200',
      icon: 'bg-gov-500',
      text: 'text-gov-700',
      badge: 'bg-gov-100 text-gov-700',
      glow: 'shadow-gov-500/10',
    },
  };

  const severityLabels = {
    high: { label: 'Висок риск', class: 'bg-danger-500 text-white' },
    medium: { label: 'Умерен риск', class: 'bg-warning-500 text-white' },
    ok: { label: 'В норма', class: 'bg-accent-500 text-white' },
  };

  const style = colorStyles[finding.type];
  const IconComponent = finding.icon;
  const severity = severityLabels[finding.severity];

  return (
    <div
      className={`finding-card ${style.bg} border ${style.border} rounded-xl p-5 relative overflow-hidden transition-all duration-300 hover:shadow-lg ${style.glow}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Severity badge */}
      {severity && (
        <div className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-semibold ${severity.class}`}>
          {severity.label}
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl ${style.icon} flex items-center justify-center text-white shadow-md flex-shrink-0`}>
          <IconComponent />
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="text-sm font-semibold text-slate-700 mb-1">{finding.title}</div>
          <div className={`text-2xl font-bold ${style.text} tabular-nums tracking-tight`}>
            {finding.value}
          </div>
          <div className="text-sm text-slate-500 mt-2 leading-relaxed">{finding.description}</div>
          {finding.context && (
            <div className={`mt-2 text-xs font-medium px-2 py-1 rounded-md inline-block ${style.badge}`}>
              {finding.context}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Historic Eurozone Banner - Celebratory design for this milestone
function EurozoneBanner() {
  return (
    <div className="eurozone-banner relative overflow-hidden rounded-2xl">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gov-600 via-gov-700 to-gov-800" />

      {/* Decorative EU stars pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="eu-stars" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 5l2.5 7.5H40l-6 4.5 2.5 7.5-6.5-5-6.5 5 2.5-7.5-6-4.5h7.5z" fill="white"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#eu-stars)" />
        </svg>
      </div>

      {/* Radial glow effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gov-400/30 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

      <div className="relative p-8 md:p-10">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
          <div className="flex items-start gap-4">
            {/* Euro symbol with golden glow */}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-gov-800">EUR</span>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent-400 rounded-full flex items-center justify-center shadow-md">
                <Icons.Check />
              </div>
            </div>

            <div className="text-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-yellow-400/20 rounded-full text-yellow-300 text-xs font-bold uppercase tracking-wider">
                  Историческо събитие
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                България в Еврозоната
              </h2>
              <p className="text-gov-100 text-sm md:text-base max-w-xl leading-relaxed">
                От 1 януари 2026 г. еврото става официална валута на България.
                Това е първият държавен бюджет, изцяло деноминиран в евро.
              </p>
            </div>
          </div>

          {/* Countdown/Date highlight */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-[140px]">
            <div className="text-yellow-300 text-xs font-semibold uppercase tracking-wider mb-1">
              Начало
            </div>
            <div className="text-white text-3xl font-bold">01.01</div>
            <div className="text-white text-xl font-bold">2026</div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="eurozone-stat-card">
            <div className="text-xs text-gov-200 font-medium mb-1 uppercase tracking-wider">Фиксиран курс</div>
            <div className="text-2xl font-bold text-white tabular-nums">1.9558</div>
            <div className="text-sm text-gov-200">BGN / EUR</div>
          </div>

          <div className="eurozone-stat-card">
            <div className="text-xs text-gov-200 font-medium mb-1 uppercase tracking-wider">БВП 2026</div>
            <div className="text-2xl font-bold text-white tabular-nums">120.1</div>
            <div className="text-sm text-gov-200">млрд. EUR</div>
          </div>

          <div className="eurozone-stat-card">
            <div className="text-xs text-gov-200 font-medium mb-1 uppercase tracking-wider">Маастрихт</div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-accent-400 tabular-nums">4</span>
              <span className="text-lg text-white">/</span>
              <span className="text-2xl font-bold text-white tabular-nums">5</span>
            </div>
            <div className="text-sm text-gov-200">критерии изпълнени</div>
          </div>

          <div className="eurozone-stat-card">
            <div className="text-xs text-gov-200 font-medium mb-1 uppercase tracking-wider">20-та държава</div>
            <div className="text-2xl font-bold text-yellow-300">EUR</div>
            <div className="text-sm text-gov-200">в Еврозоната</div>
          </div>
        </div>

        {/* Bulgaria + EU flags visual */}
        <div className="mt-6 flex items-center justify-center gap-3 opacity-80">
          <div className="flex flex-col w-12 h-8 rounded overflow-hidden shadow-md">
            <div className="bg-white h-1/3" />
            <div className="bg-[#00966E] h-1/3" />
            <div className="bg-[#D62612] h-1/3" />
          </div>
          <span className="text-white text-lg">+</span>
          <div className="w-12 h-8 bg-[#003399] rounded flex items-center justify-center overflow-hidden shadow-md">
            <svg viewBox="0 0 48 32" className="w-full h-full">
              <rect fill="#003399" width="48" height="32"/>
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30 - 90) * Math.PI / 180;
                const x = 24 + 10 * Math.cos(angle);
                const y = 16 + 10 * Math.sin(angle);
                return (
                  <path
                    key={i}
                    d={`M${x} ${y-2.5}l0.8 2.4h2.5l-2 1.5 0.8 2.4-2.1-1.5-2.1 1.5 0.8-2.4-2-1.5h2.5z`}
                    fill="#FFCC00"
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectorComparison() {
  const sectors = [
    {
      name: 'Отбрана',
      value: 2.05,
      target: 2.0,
      targetLabel: 'НАТО: 2.0%',
      status: 'success',
      maxScale: 3,
    },
    {
      name: 'Образование',
      value: 4.8,
      target: 5.0,
      targetLabel: 'ЕС средно: 5.0%',
      status: 'warning',
      maxScale: 7,
    },
    {
      name: 'Здравеопазване',
      value: 5.3,
      target: 7.5,
      targetLabel: 'ЕС средно: 7.5%',
      status: 'danger',
      maxScale: 10,
    },
  ];

  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-6">Секторни разходи (% от БВП)</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {sectors.map((sector, i) => (
          <div key={i} className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
                {/* Background circle */}
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="12"
                />
                {/* Progress circle */}
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke={
                    sector.status === 'success' ? '#00966E' :
                    sector.status === 'warning' ? '#f59e0b' : '#D62612'
                  }
                  strokeWidth="12"
                  strokeDasharray={`${(sector.value / sector.maxScale) * 352} 352`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-900 tabular-nums">{sector.value}%</span>
              </div>
            </div>
            <div className="font-semibold text-slate-900">{sector.name}</div>
            <div className={`text-sm flex items-center justify-center gap-1.5 mt-1 ${
              sector.status === 'success' ? 'text-accent-600' :
              sector.status === 'warning' ? 'text-warning-600' : 'text-danger-600'
            }`}>
              {sector.status === 'success' ? <Icons.Check /> : <Icons.Alert />}
              {sector.targetLabel}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MaastrichtCriteria() {
  const criteria = [
    { name: 'Бюджетен дефицит', threshold: '<= 3.0%', value: '3.0%', status: 'ok' },
    { name: 'Държавен дълг', threshold: '<= 60%', value: '31.3%', status: 'ok' },
    { name: 'Инфлация (ХИПЦ)', threshold: '<= референтна', value: '3.5%', status: 'warning' },
    { name: 'Валутен курс', threshold: 'ERM II стабилен', value: 'Фиксиран', status: 'ok' },
  ];

  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-6">Маастрихтски критерии</h2>
      <div className="space-y-3">
        {criteria.map((item, i) => (
          <div key={i} className="criteria-item">
            <div className="flex items-center gap-4">
              <div className={`criteria-status ${
                item.status === 'ok' ? 'criteria-status-ok' : 'criteria-status-warning'
              }`}>
                {item.status === 'ok' ? <Icons.Check /> : <Icons.Alert />}
              </div>
              <div>
                <div className="font-medium text-slate-900">{item.name}</div>
                <div className="text-sm text-slate-500">{item.threshold}</div>
              </div>
            </div>
            <div className={`text-lg font-bold tabular-nums ${
              item.status === 'ok' ? 'text-accent-600' : 'text-warning-600'
            }`}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Budget Health Score Gauge Component
function BudgetHealthGauge({ score, label }) {
  // Score from 0-100, where higher is better
  const getScoreColor = (s) => {
    if (s >= 70) return { color: '#00966E', label: 'Добро' };
    if (s >= 50) return { color: '#f59e0b', label: 'Умерено' };
    return { color: '#D62612', label: 'Рисково' };
  };

  const scoreInfo = getScoreColor(score);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference * 0.75; // 270 degree arc

  return (
    <div className="budget-health-gauge">
      <div className="relative w-36 h-36 mx-auto">
        <svg className="w-full h-full" viewBox="0 0 120 120">
          {/* Background arc */}
          <path
            d="M 15 85 A 45 45 0 1 1 105 85"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Score arc */}
          <path
            d="M 15 85 A 45 45 0 1 1 105 85"
            fill="none"
            stroke={scoreInfo.color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${(score / 100) * 212} 212`}
            className="transition-all duration-1000 ease-out"
          />
          {/* Score label */}
          <text
            x="60"
            y="55"
            textAnchor="middle"
            className="text-3xl font-bold fill-slate-900"
            style={{ fontFamily: 'Sofia Sans' }}
          >
            {score}
          </text>
          <text
            x="60"
            y="72"
            textAnchor="middle"
            className="text-xs fill-slate-500 uppercase tracking-wider"
            style={{ fontFamily: 'Sofia Sans' }}
          >
            от 100
          </text>
        </svg>
      </div>
      <div className="text-center mt-2">
        <div className="text-sm font-semibold" style={{ color: scoreInfo.color }}>
          {label}
        </div>
        <div className="text-xs text-slate-500">Фискална устойчивост</div>
      </div>
    </div>
  );
}

// Health Score Breakdown Component
function HealthScoreBreakdown({ components }) {
  return (
    <div className="space-y-3">
      {components.map((comp, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="flex-1">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-slate-600">{comp.name}</span>
              <span className="font-semibold text-slate-900">{comp.score}/100</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  comp.score >= 70 ? 'bg-accent-500' :
                  comp.score >= 50 ? 'bg-warning-500' : 'bg-danger-500'
                }`}
                style={{ width: `${comp.score}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Executive Dashboard Header
function DashboardHeader() {
  return (
    <div className="dashboard-header relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 md:p-10 mb-8">
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gov-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-accent-500/10 rounded-full blur-2xl" />

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex flex-col w-10 h-7 rounded overflow-hidden shadow-lg">
              <div className="bg-white h-1/3" />
              <div className="bg-[#00966E] h-1/3" />
              <div className="bg-[#D62612] h-1/3" />
            </div>
            <span className="px-3 py-1 bg-gov-500/20 rounded-full text-gov-300 text-xs font-semibold uppercase tracking-wider">
              Република България
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Държавен бюджет 2026
          </h1>
          <p className="text-slate-400 max-w-xl">
            Изпълнителен преглед на проекта за бюджет. Сравнение между версиите от ноември и декември 2025 г.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Версия</div>
            <div className="text-white font-semibold">Декември 2025</div>
          </div>
          <div className="w-px h-10 bg-slate-700" />
          <div className="text-right">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Последна актуализация</div>
            <div className="text-white font-semibold">08.12.2025</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryView() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Executive Dashboard Header */}
      <DashboardHeader />

      {/* Budget Health Score + Key Metrics Row */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Budget Health Score Card */}
        <div className="lg:col-span-3">
          <div className="card p-6 h-full flex flex-col">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Бюджетно здраве
            </h3>
            <BudgetHealthGauge
              score={budgetHealthScore.overall}
              label={budgetHealthScore.label}
            />
            <div className="mt-6 pt-4 border-t border-slate-100">
              <HealthScoreBreakdown components={budgetHealthScore.components} />
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="lg:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {summaryMetrics.map((metric, i) => (
              <EnhancedMetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </div>
      </div>

      {/* Eurozone Banner - Historic Event */}
      <EurozoneBanner />

      {/* Key Findings Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Ключови констатации</h2>
            <p className="text-sm text-slate-500 mt-1">Промени между ноемврийската и декемврийската версия</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-danger-100 text-danger-700">
              <span className="w-2 h-2 rounded-full bg-danger-500"></span>
              Висок риск
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-warning-100 text-warning-700">
              <span className="w-2 h-2 rounded-full bg-warning-500"></span>
              Умерен
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent-100 text-accent-700">
              <span className="w-2 h-2 rounded-full bg-accent-500"></span>
              В норма
            </span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {keyFindings.map((finding, i) => (
            <EnhancedFindingCard key={i} finding={finding} index={i} />
          ))}
        </div>
      </div>

      {/* Two-column layout for Sector and Maastricht */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sectoral Comparison */}
        <SectorComparison />

        {/* Maastricht Criteria */}
        <MaastrichtCriteria />
      </div>

      {/* Footer note */}
      <div className="bg-slate-100/50 rounded-xl p-6 text-center">
        <div className="flex items-center justify-center gap-2 text-slate-600 mb-2">
          <Icons.Shield />
          <span className="font-medium">Обективен анализ</span>
        </div>
        <p className="text-sm text-slate-500">
          Анализът е фактологичен и не съдържа политически оценки.
        </p>
        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-slate-400">
          <span>Източник: Министерство на финансите</span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span>Версия: 08.12.2025</span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span>Анализ: clearcharge.app</span>
        </div>
      </div>
    </div>
  );
}

// Bulgarian Flag Component
function BulgarianFlag({ className = "w-10 h-10" }) {
  return (
    <div className={`flag-bulgaria rounded-lg overflow-hidden shadow-sm ${className}`}>
      <div className="bg-white h-1/3"></div>
      <div className="bg-[#00966E] h-1/3 flex items-center justify-center">
        <span className="text-white font-bold text-xs">BG</span>
      </div>
      <div className="bg-[#D62612] h-1/3"></div>
    </div>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState('charts');

  const views = [
    { id: 'charts', label: 'Графики', icon: Icons.Chart },
    { id: 'summary', label: 'Резюме', icon: Icons.Document },
    { id: 'full', label: 'Пълен текст', icon: Icons.Book },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="site-header sticky top-0 z-sticky">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <BulgarianFlag className="w-10 h-10" />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-slate-900">Бюджет 2026</h1>
                <p className="text-xs text-slate-500">Сравнителен анализ</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="tab-group">
              {views.map((view) => {
                const IconComponent = view.icon;
                return (
                  <button
                    key={view.id}
                    onClick={() => setActiveView(view.id)}
                    className={`tab ${activeView === view.id ? 'tab-active' : 'tab-inactive'}`}
                  >
                    <IconComponent />
                    <span className="hidden sm:inline">{view.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Version badge */}
            <div className="hidden md:flex items-center">
              <span className="badge badge-neutral">
                Декември 2025
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'charts' && <BudgetVisualizations />}
        {activeView === 'summary' && <SummaryView />}
        {activeView === 'full' && <FullAnalysis />}
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BulgarianFlag className="w-8 h-8" />
              <div className="text-sm text-slate-600">
                Проект на Закон за държавния бюджет на Република България за 2026 г.
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <span>Данни: Министерство на финансите</span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span>Версия от 05.12.2025</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
