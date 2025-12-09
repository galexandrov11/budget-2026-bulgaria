import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, RadialBarChart, RadialBar } from 'recharts';

// Modern color palette matching the design system
export const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#14b8a6', '#eab308', '#ef4444', '#22c55e'];

// Macroeconomic forecasts 2026-2028
export const macroForecast = [
  { year: '2026', gdp: 2.7, inflation: 3.5, unemployment: 3.6 },
  { year: '2027', gdp: 2.5, inflation: 2.9, unemployment: 3.7 },
  { year: '2028', gdp: 2.4, inflation: 2.5, unemployment: 3.8 },
];

// Debt dynamics 2024-2028
export const debtData = [
  { year: '2024', debt: 23.8, amount: 28.5, limit: 60 },
  { year: '2025', debt: 28.5, amount: 34.2, limit: 60 },
  { year: '2026', debt: 31.3, amount: 37.6, limit: 60 },
  { year: '2027', debt: 34.2, amount: 43.5, limit: 60 },
  { year: '2028', debt: 36.6, amount: 49.0, limit: 60 },
];

// Maastricht criteria compliance
export const maastrichtData = [
  { criterion: 'Бюджетен дефицит', threshold: 3.0, bulgaria: 3.0, unit: '% от БВП', status: 'ok' },
  { criterion: 'Държавен дълг', threshold: 60.0, bulgaria: 31.3, unit: '% от БВП', status: 'ok' },
  { criterion: 'Инфлация (ХИПЦ)', threshold: 2.5, bulgaria: 3.5, unit: '%', status: 'warning' },
  { criterion: 'Дългоср. лихви', threshold: 4.0, bulgaria: 3.8, unit: '%', status: 'ok' },
  { criterion: 'Валутен курс', threshold: 0, bulgaria: 0, unit: 'ERM II', status: 'ok' },
];

// Revenue structure data (December 2025)
export const revenueData = [
  { name: 'ДДС', value: 14985.2, percent: '47.8%' },
  { name: 'ДДФЛ', value: 4914.7, percent: '15.7%' },
  { name: 'Корпоративен данък', value: 3873.3, percent: '12.4%' },
  { name: 'Акцизи', value: 4167.0, percent: '13.3%' },
  { name: 'Мита', value: 154.4, percent: '0.5%' },
  { name: 'Други данъчни', value: 331.8, percent: '1.0%' },
  { name: 'Неданъчни приходи', value: 2861.8, percent: '9.1%' },
];

// Expenditure structure data (December 2025)
export const expenditureData = [
  { name: 'Персонал', value: 7449.7, percent: '42.1%' },
  { name: 'Субсидии', value: 1191.6, percent: '6.7%' },
  { name: 'Капиталови разходи', value: 3051.9, percent: '17.3%' },
  { name: 'Лихви', value: 701.9, percent: '4.0%' },
  { name: 'Други текущи', value: 5301.4, percent: '30.0%' },
];

// Ministry changes data (December vs November)
export const ministryChanges = [
  { name: 'Здравеопазване', change: 70.6, percent: '+10.0%', type: 'increase' },
  { name: 'МВР', change: 13.9, percent: '+0.8%', type: 'increase' },
  { name: 'Труд и соц. политика', change: 5.9, percent: '+0.3%', type: 'increase' },
  { name: 'Народно събрание', change: -0.5, percent: '-0.8%', type: 'decrease' },
  { name: 'МОН', change: -7.2, percent: '-0.9%', type: 'decrease' },
  { name: 'Министерски съвет', change: -8.3, percent: '-5.8%', type: 'decrease' },
  { name: 'МРРБ', change: -155.8, percent: '-12.5%', type: 'decrease' },
];

// Deficit trend data
export const deficitData = [
  { year: '2024 (отчет)', deficit: 2.8, limit: 3.0 },
  { year: '2025 (очакв.)', deficit: 3.0, limit: 3.0 },
  { year: '2026 (план)', deficit: 3.0, limit: 3.0 },
  { year: '2027 (прогн.)', deficit: 4.3, limit: 3.0 },
  { year: '2028 (прогн.)', deficit: 3.0, limit: 3.0 },
];

// Sectoral comparison with EU
export const sectoralData = [
  { sector: 'Отбрана', bulgaria: 2.05, eu: 1.7, nato: 2.0 },
  { sector: 'Образование', bulgaria: 4.8, eu: 5.0, nato: null },
  { sector: 'Здравеопазване', bulgaria: 5.3, eu: 7.5, nato: null },
];

// Version comparison summary
export const versionComparison = [
  { category: 'Приходи', november: 31288.4, december: 31543.5, change: 255.1 },
  { category: 'Разходи', november: 17496.4, december: 17676.7, change: 180.2 },
  { category: 'Трансфери', november: 17651.4, december: 18442.2, change: 790.8 },
  { category: 'Дефицит', november: -3859.4, december: -4575.4, change: -716.0 },
];

// Enhanced Maastricht Criteria data with additional metadata
export const maastrichtCriteriaEnhanced = [
  {
    id: 'deficit',
    name: 'Бюджетен дефицит',
    shortName: 'Дефицит',
    value: 3.0,
    threshold: 3.0,
    unit: '%',
    unitLabel: '% от БВП',
    status: 'ok',
    description: 'Бюджетният дефицит не трябва да надвишава 3% от БВП',
    icon: 'chart-pie',
    compliance: 100, // percentage of how close to threshold (100 = at limit, 50 = at half)
  },
  {
    id: 'debt',
    name: 'Държавен дълг',
    shortName: 'Дълг',
    value: 31.3,
    threshold: 60.0,
    unit: '%',
    unitLabel: '% от БВП',
    status: 'ok',
    description: 'Държавният дълг не трябва да надвишава 60% от БВП',
    icon: 'banknotes',
    compliance: 52.2, // 31.3/60 * 100
  },
  {
    id: 'inflation',
    name: 'Инфлация (ХИПЦ)',
    shortName: 'Инфлация',
    value: 3.5,
    threshold: 2.5,
    unit: '%',
    unitLabel: '%',
    status: 'warning',
    description: 'Инфлацията не трябва да надвишава референтната стойност с повече от 1.5 пр.п.',
    icon: 'arrow-trending-up',
    compliance: 140, // exceeds threshold
  },
  {
    id: 'interest',
    name: 'Дългосрочни лихви',
    shortName: 'Лихви',
    value: 3.8,
    threshold: 4.0,
    unit: '%',
    unitLabel: '%',
    status: 'ok',
    description: 'Дългосрочните лихвени проценти не трябва да надвишават референтната стойност с повече от 2 пр.п.',
    icon: 'percent-badge',
    compliance: 95, // 3.8/4 * 100
  },
  {
    id: 'exchange',
    name: 'Валутен курс',
    shortName: 'Валута',
    value: 0,
    threshold: 0,
    unit: 'ERM II',
    unitLabel: 'ERM II',
    status: 'ok',
    description: 'Участие в ERM II без девалвация за минимум 2 години',
    icon: 'currency-euro',
    compliance: 100,
    isFixed: true,
  },
];

// Radar chart data for criteria overview
export const radarData = [
  { criterion: 'Дефицит', fullMark: 100, score: 100, threshold: 100 },
  { criterion: 'Дълг', fullMark: 100, score: 100, threshold: 100 },
  { criterion: 'Инфлация', fullMark: 100, score: 71, threshold: 100 }, // 2.5/3.5 * 100
  { criterion: 'Лихви', fullMark: 100, score: 100, threshold: 100 },
  { criterion: 'Валута', fullMark: 100, score: 100, threshold: 100 },
];

// Circular gauge component for individual criteria
const CircularGauge = ({ value, threshold, status, isFixed, size = 120 }) => {
  const percentage = isFixed ? 100 : Math.min((value / threshold) * 100, 150);
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (Math.min(percentage, 100) / 100) * circumference;

  const getColor = () => {
    if (isFixed) return '#00966E'; // accent-500
    if (status === 'ok') return '#00966E'; // accent-500
    if (status === 'warning') return '#f59e0b'; // warning-500
    return '#D62612'; // danger-500
  };

  const getBgColor = () => {
    if (status === 'ok') return '#d1fae5'; // accent-100
    if (status === 'warning') return '#fef3c7'; // warning-100
    return '#fee2e2'; // danger-100
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getBgColor()}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
        {/* Threshold marker for non-fixed criteria */}
        {!isFixed && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#64748b"
            strokeWidth={2}
            strokeDasharray={`2 ${circumference - 2}`}
            strokeDashoffset={0}
            opacity={0.4}
          />
        )}
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {isFixed ? (
          <div className="text-center">
            <svg className="w-6 h-6 text-accent-600 mx-auto" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-medium text-slate-600 mt-1">ERM II</span>
          </div>
        ) : (
          <>
            <span className={`text-lg font-bold tabular-nums ${status === 'ok' ? 'text-slate-900' : 'text-warning-700'}`}>
              {value}%
            </span>
            <span className="text-xs text-slate-500">/ {threshold}%</span>
          </>
        )}
      </div>
    </div>
  );
};

// Status indicator with traffic light styling
const StatusIndicator = ({ status }) => {
  const config = {
    ok: {
      bg: 'bg-accent-500',
      ring: 'ring-accent-200',
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      ),
      label: 'Изпълнен',
    },
    warning: {
      bg: 'bg-warning-500',
      ring: 'ring-warning-200',
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      ),
      label: 'Внимание',
    },
    danger: {
      bg: 'bg-danger-500',
      ring: 'ring-danger-200',
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      label: 'Неизпълнен',
    },
  };

  const { bg, ring, icon, label } = config[status] || config.ok;

  return (
    <div className="flex items-center gap-2">
      <div className={`w-6 h-6 rounded-full ${bg} ring-4 ${ring} flex items-center justify-center shadow-sm`}>
        {icon}
      </div>
      <span className={`text-sm font-medium ${status === 'ok' ? 'text-accent-700' : status === 'warning' ? 'text-warning-700' : 'text-danger-700'}`}>
        {label}
      </span>
    </div>
  );
};

// Criterion card component
const CriterionCard = ({ criterion, index }) => {
  const { name, value, threshold, unit, unitLabel, status, description, isFixed } = criterion;

  return (
    <div
      className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
        status === 'ok'
          ? 'border-accent-200 bg-gradient-to-br from-white to-accent-50/30'
          : 'border-warning-200 bg-gradient-to-br from-white to-warning-50/30'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Top accent bar */}
      <div className={`h-1 ${status === 'ok' ? 'bg-accent-500' : 'bg-warning-500'}`} />

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          {/* Left side - Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 text-lg mb-1">{name}</h3>
            <p className="text-sm text-slate-500 mb-3 line-clamp-2">{description}</p>

            {/* Comparison bar for non-fixed criteria */}
            {!isFixed && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Актуална стойност</span>
                  <span className={`font-bold tabular-nums ${status === 'ok' ? 'text-accent-700' : 'text-warning-700'}`}>
                    {value}{unit}
                  </span>
                </div>
                <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
                  {/* Threshold marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-slate-400 z-10"
                    style={{ left: `${Math.min(100, 100)}%` }}
                  />
                  {/* Value bar */}
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      status === 'ok' ? 'bg-accent-500' : 'bg-warning-500'
                    }`}
                    style={{ width: `${Math.min((value / threshold) * 100, 100)}%` }}
                  />
                  {/* Overflow indicator for warning */}
                  {value > threshold && (
                    <div
                      className="absolute top-0 h-full bg-warning-500/30 rounded-r-full"
                      style={{
                        left: '100%',
                        width: `${Math.min(((value - threshold) / threshold) * 100, 40)}%`
                      }}
                    />
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>0</span>
                  <span className="font-medium">Праг: {threshold}{unit}</span>
                </div>
              </div>
            )}

            {/* Fixed criteria display */}
            {isFixed && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-accent-100 rounded-lg">
                  <svg className="w-4 h-4 text-accent-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  <span className="text-sm font-semibold text-accent-700">Фиксиран курс</span>
                </div>
                <span className="text-sm text-slate-500">от юли 2020 г.</span>
              </div>
            )}
          </div>

          {/* Right side - Gauge */}
          <div className="flex-shrink-0">
            <CircularGauge
              value={value}
              threshold={threshold}
              status={status}
              isFixed={isFixed}
              size={100}
            />
          </div>
        </div>

        {/* Status badge */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <StatusIndicator status={status} />
          {!isFixed && (
            <span className="text-xs text-slate-400">
              {status === 'ok'
                ? `Буфер: ${(threshold - value).toFixed(1)} пр.п.`
                : `Превишение: +${(value - threshold).toFixed(1)} пр.п.`
              }
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Maastricht Criteria Visualization Component
const MaastrichtCriteriaVisualization = () => {
  const criteriaCount = maastrichtCriteriaEnhanced.length;
  const passedCount = maastrichtCriteriaEnhanced.filter(c => c.status === 'ok').length;
  const warningCount = maastrichtCriteriaEnhanced.filter(c => c.status === 'warning').length;
  const failedCount = maastrichtCriteriaEnhanced.filter(c => c.status === 'danger').length;
  const passPercentage = (passedCount / criteriaCount) * 100;

  // Data for the central radial chart
  const scoreData = [
    { name: 'Изпълнени', value: passPercentage, fill: '#00966E' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 font-display mb-2">
          Съответствие с Маастрихтските критерии
        </h2>
        <p className="text-slate-500">
          Изисквания за членство в еврозоната | Към 01.01.2026
        </p>
      </div>

      {/* Score Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Central Score Card */}
        <div className="lg:col-span-1 bg-gradient-to-br from-gov-600 to-gov-800 rounded-2xl p-6 text-white shadow-elevated">
          <div className="text-center">
            <div className="relative w-40 h-40 mx-auto mb-4">
              {/* Background ring */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="12"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="#00966E"
                  strokeWidth="12"
                  strokeDasharray={`${passPercentage * 4.4} 440`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold font-display">{passedCount}</span>
                <span className="text-sm text-gov-100">от {criteriaCount}</span>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-2">Критерии изпълнени</h3>
            <p className="text-sm text-gov-100 mb-4">
              България е готова за членство в еврозоната с изключение на инфлационния критерий
            </p>

            {/* Traffic light summary */}
            <div className="flex justify-center gap-4 pt-4 border-t border-white/20">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-accent-400 ring-2 ring-accent-300" />
                <span className="text-sm">{passedCount} изпълнени</span>
              </div>
              {warningCount > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-warning-400 ring-2 ring-warning-300" />
                  <span className="text-sm">{warningCount} внимание</span>
                </div>
              )}
              {failedCount > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-danger-400 ring-2 ring-danger-300" />
                  <span className="text-sm">{failedCount} неизпълнени</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-card">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 text-center">
            Обща оценка по критерии
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis
                dataKey="criterion"
                tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: '#94a3b8', fontSize: 10 }}
                tickCount={5}
              />
              {/* Threshold line at 100% */}
              <Radar
                name="Праг"
                dataKey="threshold"
                stroke="#94a3b8"
                fill="none"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              {/* Actual values */}
              <Radar
                name="България"
                dataKey="score"
                stroke="#3674ae"
                fill="#3674ae"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value) => <span className="text-sm text-slate-600">{value}</span>}
              />
            </RadarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-400 text-center mt-2">
            Стойности под 100% показват изпълнение на критерия. Инфлацията (71%) е под прага поради превишаване.
          </p>
        </div>
      </div>

      {/* Criteria Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {maastrichtCriteriaEnhanced.map((criterion, index) => (
          <CriterionCard key={criterion.id} criterion={criterion} index={index} />
        ))}
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-semibold text-slate-900">Сравнение: Актуални стойности vs Прагове</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Критерий</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Праг</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">България</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Разлика</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {maastrichtCriteriaEnhanced.map((item) => {
                const diff = item.isFixed ? null : item.threshold - item.value;
                return (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{item.name}</div>
                      <div className="text-xs text-slate-400">{item.unitLabel}</div>
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-sm text-slate-600">
                      {item.isFixed ? '—' : `≤ ${item.threshold}${item.unit}`}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-mono text-sm font-semibold ${
                        item.status === 'ok' ? 'text-accent-700' : 'text-warning-700'
                      }`}>
                        {item.isFixed ? 'Фиксиран' : `${item.value}${item.unit}`}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {diff !== null && (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                          diff >= 0
                            ? 'bg-accent-100 text-accent-800'
                            : 'bg-warning-100 text-warning-800'
                        }`}>
                          {diff >= 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1)} пр.п.
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === 'ok'
                            ? 'bg-accent-100 text-accent-700'
                            : 'bg-warning-100 text-warning-700'
                        }`}>
                          {item.status === 'ok' ? (
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          ) : (
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
                            </svg>
                          )}
                          {item.status === 'ok' ? 'Изпълнен' : 'Внимание'}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-warning-50 to-warning-100/50 rounded-xl border border-warning-200 p-5">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-warning-200 flex items-center justify-center">
              <svg className="w-5 h-5 text-warning-700" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-warning-800 mb-1">Относно инфлационния критерий</h4>
            <p className="text-sm text-warning-700">
              Инфлацията в България (3.5% ХИПЦ) надвишава референтната стойност от 2.5%,
              но се очаква да се понижи до 2.5% до 2028 г. съгласно прогнозата на МФ.
              Това превишение не възпрепятства членството в еврозоната, а сигнализира
              за необходимост от допълнително наблюдение.
            </p>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="text-center text-sm text-slate-400">
        Данни: Министерство на финансите | Референтна дата: 01.01.2026 |
        Прагове съгласно Договора от Маастрихт
      </div>
    </div>
  );
};

export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm p-3 border border-slate-200 rounded-xl shadow-lg">
        <p className="font-semibold text-slate-900">{label || payload[0].name}</p>
        <p className="text-sm text-gov-600 font-medium">{`${payload[0].value.toLocaleString()} млн. €`}</p>
        {payload[0].payload.percent && <p className="text-xs text-slate-500">{payload[0].payload.percent}</p>}
      </div>
    );
  }
  return null;
};

// ============================================================================
// EXPORTED CHART COMPONENTS
// These can be imported and used in other components like FullAnalysis
// ============================================================================

// Revenue Pie Chart Component
export const RevenuePieChart = ({ showTitle = true, height = 400 }) => (
  <div className="space-y-4">
    {showTitle && (
      <>
        <h3 className="text-lg font-bold text-center text-slate-900 font-display">Структура на данъчните приходи (Декември 2025)</h3>
        <p className="text-center text-slate-500 text-sm">Общо: 28 426,4 млн. € данъчни приходи</p>
      </>
    )}
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={revenueData}
          cx="50%"
          cy="50%"
          labelLine={true}
          label={({ name, percent }) => `${name}: ${percent}`}
          outerRadius={height > 300 ? 150 : 100}
          fill="#8884d8"
          dataKey="value"
        >
          {revenueData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
    <div className="text-sm text-slate-500 text-center">
      ДДС е основният източник на приходи (47,8%), следван от ДДФЛ (15,7%) и акцизите (13,3%)
    </div>
  </div>
);

// Expenditure Pie Chart Component
export const ExpenditurePieChart = ({ showTitle = true, height = 400 }) => (
  <div className="space-y-4">
    {showTitle && (
      <>
        <h3 className="text-lg font-bold text-center text-slate-900 font-display">Структура на разходите (Декември 2025)</h3>
        <p className="text-center text-slate-500 text-sm">Общо: 17 676,7 млн. € разходи</p>
      </>
    )}
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={expenditureData}
          cx="50%"
          cy="50%"
          labelLine={true}
          label={({ name, percent }) => `${name}: ${percent}`}
          outerRadius={height > 300 ? 150 : 100}
          fill="#8884d8"
          dataKey="value"
        >
          {expenditureData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
    <div className="text-sm text-slate-500 text-center">
      Персоналът съставлява 42,1% от разходите. Капиталовите разходи са 17,3%.
    </div>
  </div>
);

// Ministry Changes Bar Chart Component
export const MinistryChangesBarChart = ({ showTitle = true, height = 400 }) => (
  <div className="space-y-4">
    {showTitle && (
      <>
        <h3 className="text-lg font-bold text-center text-slate-900 font-display">Промени по министерства (Декември vs Ноември)</h3>
        <p className="text-center text-slate-500 text-sm">Промяна в млн. €</p>
      </>
    )}
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={ministryChanges} layout="vertical" margin={{ left: 120 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[-200, 100]} />
        <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value) => [`${value.toFixed(1)} млн. €`, 'Промяна']} />
        <Bar dataKey="change" fill={(entry) => entry.change >= 0 ? '#10b981' : '#f43f5e'}>
          {ministryChanges.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.change >= 0 ? '#10b981' : '#f43f5e'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
    <div className="text-sm text-slate-500 text-center">
      Здравеопазването получава най-голямо увеличение (+70,6 млн. €), МРРБ - най-голямо намаление (-155,8 млн. €)
    </div>
  </div>
);

// Deficit Line Chart Component
export const DeficitLineChart = ({ showTitle = true, height = 400 }) => (
  <div className="space-y-4">
    {showTitle && (
      <>
        <h3 className="text-lg font-bold text-center text-slate-900 font-display">Динамика на бюджетния дефицит (% от БВП)</h3>
        <p className="text-center text-slate-500 text-sm">Маастрихтски критерий: ≤ 3,0%</p>
      </>
    )}
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={deficitData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" tick={{ fontSize: 11 }} />
        <YAxis domain={[0, 5]} tickFormatter={(value) => `${value}%`} />
        <Tooltip formatter={(value) => [`${value}%`, '']} />
        <Legend />
        <Line type="monotone" dataKey="deficit" stroke="#f43f5e" strokeWidth={3} name="Дефицит" dot={{ r: 6 }} />
        <Line type="monotone" dataKey="limit" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Лимит 3%" dot={false} />
      </LineChart>
    </ResponsiveContainer>
    <div className="p-3 bg-warning-50 rounded-xl text-sm text-warning-700 text-center">
      През 2027 г. дефицитът се очаква да достигне 4,3% поради доставки на отбранително оборудване (F-16, Stryker)
    </div>
  </div>
);

// Debt Bar Chart Component
export const DebtBarChart = ({ showTitle = true, height = 350 }) => (
  <div className="space-y-4">
    {showTitle && (
      <>
        <h3 className="text-lg font-bold text-center text-slate-900 font-display">Динамика на държавния дълг (2024-2028)</h3>
        <p className="text-center text-slate-500 text-sm">Маастрихтски лимит: ≤ 60% от БВП</p>
      </>
    )}
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={debtData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis yAxisId="left" domain={[0, 70]} tickFormatter={(value) => `${value}%`} />
        <YAxis yAxisId="right" orientation="right" domain={[0, 60]} tickFormatter={(value) => `${value} млрд`} />
        <Tooltip formatter={(value, name) => {
          if (name === 'debt') return [`${value}%`, 'Дълг (% БВП)'];
          if (name === 'amount') return [`${value} млрд. €`, 'Дълг (абс.)'];
          return [`${value}%`, 'Лимит'];
        }} />
        <Legend />
        <Bar yAxisId="left" dataKey="debt" fill="#6366f1" name="Дълг (% от БВП)" />
        <Line yAxisId="left" type="monotone" dataKey="limit" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Лимит 60%" dot={false} />
      </BarChart>
    </ResponsiveContainer>
    <div className="p-3 bg-accent-50 rounded-xl text-sm text-accent-700 text-center font-medium">
      Държавният дълг остава значително под лимита от 60%, с буфер от ~28 пр.п. през 2026 г.
    </div>
  </div>
);

// Macro Indicators Bar Chart Component
export const MacroIndicatorsBarChart = ({ showTitle = true, height = 350 }) => (
  <div className="space-y-4">
    {showTitle && (
      <>
        <h3 className="text-lg font-bold text-center text-slate-900 font-display">Макроикономическа прогноза 2026-2028</h3>
        <p className="text-center text-slate-500 text-sm">Източник: Министерство на финансите, есен 2025</p>
      </>
    )}
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={macroForecast} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="year" />
        <YAxis domain={[0, 5]} tickFormatter={(value) => `${value}%`} />
        <Tooltip formatter={(value) => [`${value}%`, '']} />
        <Legend />
        <Bar dataKey="gdp" fill="#6366f1" name="БВП растеж" />
        <Bar dataKey="inflation" fill="#f59e0b" name="Инфлация (ХИПЦ)" />
        <Bar dataKey="unemployment" fill="#10b981" name="Безработица" />
      </BarChart>
    </ResponsiveContainer>
    <div className="grid grid-cols-3 gap-4 text-center">
      <div className="bg-gov-50 p-4 rounded-xl border border-gov-100">
        <div className="text-2xl font-bold text-gov-600 font-display">2,7%</div>
        <div className="text-sm text-slate-600">БВП растеж 2026</div>
        <div className="text-xs text-slate-400">↓ 2,4% до 2028</div>
      </div>
      <div className="bg-warning-50 p-4 rounded-xl border border-warning-100">
        <div className="text-2xl font-bold text-warning-600 font-display">3,5%</div>
        <div className="text-sm text-slate-600">Инфлация 2026</div>
        <div className="text-xs text-slate-400">↓ 2,5% до 2028</div>
      </div>
      <div className="bg-accent-50 p-4 rounded-xl border border-accent-100">
        <div className="text-2xl font-bold text-accent-600 font-display">3,6%</div>
        <div className="text-sm text-slate-600">Безработица 2026</div>
        <div className="text-xs text-slate-400">↑ 3,8% до 2028</div>
      </div>
    </div>
    <div className="text-sm text-slate-500 text-center">
      Прогнозата е потвърдена от Фискалния съвет и е близка до очакванията на ЕК и ОИСР
    </div>
  </div>
);

// Sectors Comparison Bar Chart Component
export const SectorsComparisonBarChart = ({ showTitle = true, height = 400 }) => (
  <div className="space-y-4">
    {showTitle && (
      <h3 className="text-lg font-bold text-center text-slate-900 font-display">Секторни разходи: България vs ЕС (% от БВП)</h3>
    )}
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={sectoralData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="sector" />
        <YAxis domain={[0, 10]} tickFormatter={(value) => `${value}%`} />
        <Tooltip formatter={(value) => value ? [`${value}%`, ''] : ['N/A', '']} />
        <Legend />
        <Bar dataKey="bulgaria" fill="#6366f1" name="България 2026" />
        <Bar dataKey="eu" fill="#10b981" name="Средно ЕС" />
        <Bar dataKey="nato" fill="#f59e0b" name="НАТО цел" />
      </BarChart>
    </ResponsiveContainer>
    <div className="grid grid-cols-3 gap-4 text-center text-sm mt-4">
      <div className="bg-accent-50 p-3 rounded-xl border border-accent-200">
        <span className="badge badge-success mb-2">Изпълнено</span>
        <div className="font-bold text-accent-700">Отбрана</div>
        <div className="text-slate-600">2,05% &gt; 2,0% НАТО</div>
      </div>
      <div className="bg-warning-50 p-3 rounded-xl border border-warning-200">
        <span className="badge badge-warning mb-2">Под целта</span>
        <div className="font-bold text-warning-700">Образование</div>
        <div className="text-slate-600">4,8% &lt; 5,0% ЕС</div>
      </div>
      <div className="bg-danger-50 p-3 rounded-xl border border-danger-200">
        <span className="badge badge-danger mb-2">Критично</span>
        <div className="font-bold text-danger-700">Здравеопазване</div>
        <div className="text-slate-600">5,3% &lt;&lt; 7,5% ЕС</div>
      </div>
    </div>
  </div>
);

// Export the full Maastricht visualization component
export { MaastrichtCriteriaVisualization };

export default function BudgetVisualizations() {
  const [activeTab, setActiveTab] = useState('revenue');

  const tabs = [
    { id: 'revenue', label: 'Приходи' },
    { id: 'expenditure', label: 'Разходи' },
    { id: 'changes', label: 'Промени' },
    { id: 'deficit', label: 'Дефицит' },
    { id: 'debt', label: 'Дълг' },
    { id: 'macro', label: 'Макро' },
    { id: 'maastricht', label: 'Маастрихт' },
    { id: 'sectors', label: 'Сектори' },
    { id: 'comparison', label: 'Сравнение' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'revenue':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-center text-slate-900 font-display">Структура на данъчните приходи (Декември 2025)</h2>
            <p className="text-center text-slate-500">Общо: 28 426,4 млн. € данъчни приходи</p>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${percent}`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-sm text-slate-500 text-center">
              ДДС е основният източник на приходи (47,8%), следван от ДДФЛ (15,7%) и акцизите (13,3%)
            </div>
          </div>
        );

      case 'expenditure':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-center text-slate-900 font-display">Структура на разходите (Декември 2025)</h2>
            <p className="text-center text-slate-500">Общо: 17 676,7 млн. € разходи</p>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={expenditureData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${percent}`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenditureData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-sm text-slate-500 text-center">
              Персоналът съставлява 42,1% от разходите. Капиталовите разходи са 17,3%.
            </div>
          </div>
        );

      case 'changes':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-center text-slate-900 font-display">Промени по министерства (Декември vs Ноември)</h2>
            <p className="text-center text-slate-500">Промяна в млн. €</p>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={ministryChanges} layout="vertical" margin={{ left: 120 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[-200, 100]} />
                <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => [`${value.toFixed(1)} млн. €`, 'Промяна']} />
                <Bar dataKey="change" fill={(entry) => entry.change >= 0 ? '#10b981' : '#f43f5e'}>
                  {ministryChanges.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.change >= 0 ? '#10b981' : '#f43f5e'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="text-sm text-slate-500 text-center">
              Здравеопазването получава най-голямо увеличение (+70,6 млн. €), МРРБ - най-голямо намаление (-155,8 млн. €)
            </div>
          </div>
        );

      case 'deficit':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-center text-slate-900 font-display">Динамика на бюджетния дефицит (% от БВП)</h2>
            <p className="text-center text-slate-500">Маастрихтски критерий: ≤ 3,0%</p>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={deficitData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 5]} tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, '']} />
                <Legend />
                <Line type="monotone" dataKey="deficit" stroke="#f43f5e" strokeWidth={3} name="Дефицит" dot={{ r: 6 }} />
                <Line type="monotone" dataKey="limit" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Лимит 3%" dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <div className="p-3 bg-warning-50 rounded-xl text-sm text-warning-700 text-center">
              През 2027 г. дефицитът се очаква да достигне 4,3% поради доставки на отбранително оборудване (F-16, Stryker)
            </div>
          </div>
        );

      case 'debt':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-center text-slate-900 font-display">Динамика на държавния дълг (2024-2028)</h2>
            <p className="text-center text-slate-500">Маастрихтски лимит: ≤ 60% от БВП</p>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={debtData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" domain={[0, 70]} tickFormatter={(value) => `${value}%`} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 60]} tickFormatter={(value) => `${value} млрд`} />
                <Tooltip formatter={(value, name) => {
                  if (name === 'debt') return [`${value}%`, 'Дълг (% БВП)'];
                  if (name === 'amount') return [`${value} млрд. €`, 'Дълг (абс.)'];
                  return [`${value}%`, 'Лимит'];
                }} />
                <Legend />
                <Bar yAxisId="left" dataKey="debt" fill="#6366f1" name="Дълг (% от БВП)" />
                <Line yAxisId="left" type="monotone" dataKey="limit" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Лимит 60%" dot={false} />
              </BarChart>
            </ResponsiveContainer>
            <div className="overflow-x-auto">
              <table className="table-modern">
                <thead>
                  <tr>
                    <th>Година</th>
                    <th className="text-right">Дълг (млрд. €)</th>
                    <th className="text-right">% от БВП</th>
                    <th className="text-right">Буфер до 60%</th>
                  </tr>
                </thead>
                <tbody>
                  {debtData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="font-medium text-slate-900">{row.year}</td>
                      <td className="text-right tabular-nums">{row.amount} млрд.</td>
                      <td className="text-right tabular-nums">{row.debt}%</td>
                      <td className="text-right text-accent-600 font-medium tabular-nums">{(60 - row.debt).toFixed(1)} пр.п.</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-accent-50 rounded-xl text-sm text-accent-700 text-center font-medium">
              Държавният дълг остава значително под лимита от 60%, с буфер от ~28 пр.п. през 2026 г.
            </div>
          </div>
        );

      case 'macro':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-center text-slate-900 font-display">Макроикономическа прогноза 2026-2028</h2>
            <p className="text-center text-slate-500">Източник: Министерство на финансите, есен 2025</p>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={macroForecast} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" />
                <YAxis domain={[0, 5]} tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, '']} />
                <Legend />
                <Bar dataKey="gdp" fill="#6366f1" name="БВП растеж" />
                <Bar dataKey="inflation" fill="#f59e0b" name="Инфлация (ХИПЦ)" />
                <Bar dataKey="unemployment" fill="#10b981" name="Безработица" />
              </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gov-50 p-4 rounded-xl border border-gov-100">
                <div className="text-2xl font-bold text-gov-600 font-display">2,7%</div>
                <div className="text-sm text-slate-600">БВП растеж 2026</div>
                <div className="text-xs text-slate-400">↓ 2,4% до 2028</div>
              </div>
              <div className="bg-warning-50 p-4 rounded-xl border border-warning-100">
                <div className="text-2xl font-bold text-warning-600 font-display">3,5%</div>
                <div className="text-sm text-slate-600">Инфлация 2026</div>
                <div className="text-xs text-slate-400">↓ 2,5% до 2028</div>
              </div>
              <div className="bg-accent-50 p-4 rounded-xl border border-accent-100">
                <div className="text-2xl font-bold text-accent-600 font-display">3,6%</div>
                <div className="text-sm text-slate-600">Безработица 2026</div>
                <div className="text-xs text-slate-400">↑ 3,8% до 2028</div>
              </div>
            </div>
            <div className="text-sm text-slate-500 text-center">
              Прогнозата е потвърдена от Фискалния съвет и е близка до очакванията на ЕК и ОИСР
            </div>
          </div>
        );

      case 'maastricht':
        return <MaastrichtCriteriaVisualization />;

      case 'sectors':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-center text-slate-900 font-display">Секторни разходи: България vs ЕС (% от БВП)</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={sectoralData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="sector" />
                <YAxis domain={[0, 10]} tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => value ? [`${value}%`, ''] : ['N/A', '']} />
                <Legend />
                <Bar dataKey="bulgaria" fill="#6366f1" name="България 2026" />
                <Bar dataKey="eu" fill="#10b981" name="Средно ЕС" />
                <Bar dataKey="nato" fill="#f59e0b" name="НАТО цел" />
              </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-4 text-center text-sm mt-4">
              <div className="bg-accent-50 p-3 rounded-xl border border-accent-200">
                <span className="badge badge-success mb-2">Изпълнено</span>
                <div className="font-bold text-accent-700">Отбрана</div>
                <div className="text-slate-600">2,05% &gt; 2,0% НАТО</div>
              </div>
              <div className="bg-warning-50 p-3 rounded-xl border border-warning-200">
                <span className="badge badge-warning mb-2">Под целта</span>
                <div className="font-bold text-warning-700">Образование</div>
                <div className="text-slate-600">4,8% &lt; 5,0% ЕС</div>
              </div>
              <div className="bg-danger-50 p-3 rounded-xl border border-danger-200">
                <span className="badge badge-danger mb-2">Критично</span>
                <div className="font-bold text-danger-700">Здравеопазване</div>
                <div className="text-slate-600">5,3% &lt;&lt; 7,5% ЕС</div>
              </div>
            </div>
          </div>
        );

      case 'comparison':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-center text-slate-900 font-display">Сравнение: Ноември vs Декември 2025</h2>
            <p className="text-center text-slate-500">Основни бюджетни параметри (млн. €)</p>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={versionComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="category" />
                <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value) => [`${value.toLocaleString()} млн. €`, '']} />
                <Legend />
                <Bar dataKey="november" fill="#6366f1" name="Ноември 2025" />
                <Bar dataKey="december" fill="#10b981" name="Декември 2025" />
              </BarChart>
            </ResponsiveContainer>
            <div className="overflow-x-auto">
              <table className="table-modern">
                <thead>
                  <tr>
                    <th>Показател</th>
                    <th className="text-right">Ноември</th>
                    <th className="text-right">Декември</th>
                    <th className="text-right">Промяна</th>
                  </tr>
                </thead>
                <tbody>
                  {versionComparison.map((row, idx) => (
                    <tr key={idx} className={row.change < 0 && row.category === 'Дефицит' ? 'bg-danger-50/50' : ''}>
                      <td className="font-medium text-slate-900">{row.category}</td>
                      <td className="text-right tabular-nums">{row.november.toLocaleString()}</td>
                      <td className="text-right tabular-nums">{row.december.toLocaleString()}</td>
                      <td className={`text-right font-bold tabular-nums ${row.change > 0 ? 'text-accent-600' : 'text-danger-600'}`}>
                        {row.change > 0 ? '+' : ''}{row.change.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-danger-50 rounded-xl text-sm text-danger-700 text-center font-medium">
              Дефицитът се увеличава с 716 млн. € (+18,5%) между двете версии
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900 font-display mb-2">
          Бюджет 2026: Визуализации
        </h1>
        <p className="text-slate-500 text-sm">
          Проект на ЗДБРБ за 2026 г. | Сравнение Ноември vs Декември 2025
        </p>
      </div>

      {/* Tab navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 p-1.5 bg-slate-100 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white text-gov-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="card p-6 min-h-[500px]">
        {renderContent()}
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-xs text-slate-400">
        Данни: Министерство на финансите | Анализ: 08.12.2025
      </div>
    </div>
  );
}
