import React from 'react';
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
};

// Key findings data
const keyFindings = [
  {
    title: "Дефицитът се увеличава",
    value: "+18.5%",
    description: "от 3.86 на 4.58 млрд. EUR",
    type: "danger",
    icon: Icons.TrendUp,
  },
  {
    title: "Данъчни приходи",
    value: "-913 млн.",
    description: "намаление спрямо ноември",
    type: "warning",
    icon: Icons.TrendDown,
  },
  {
    title: "Капиталови разходи",
    value: "-16.3%",
    description: "-481 млн. EUR съкращение",
    type: "warning",
    icon: Icons.TrendDown,
  },
  {
    title: "Маастрихт дефицит",
    value: "3.0%",
    description: "на границата на допустимото",
    type: "success",
    icon: Icons.Check,
  },
];

// Summary metrics
const summaryMetrics = [
  { label: "Приходи", value: "30.4 млрд. EUR", change: -2.92, sublabel: "Декември 2025" },
  { label: "Разходи", value: "17.3 млрд. EUR", change: -2.38, sublabel: "Декември 2025" },
  { label: "Дефицит", value: "4.58 млрд. EUR", change: 18.70, sublabel: "3.81% от БВП" },
  { label: "Държавен дълг", value: "31.3%", change: null, sublabel: "от БВП (лимит 60%)" },
];

function MetricCard({ label, value, change, sublabel }) {
  const isDeficit = label === 'Дефицит';

  return (
    <div className="metric-card group">
      <div className="flex items-start justify-between mb-3">
        <span className="metric-label">{label}</span>
        {change !== null && (
          <span className={`badge ${
            isDeficit
              ? (change > 0 ? 'badge-danger' : 'badge-success')
              : (change > 0 ? 'badge-success' : 'badge-warning')
          }`}>
            {isDeficit
              ? (change > 0 ? <Icons.TrendUp /> : <Icons.TrendDown />)
              : (change > 0 ? <Icons.TrendUp /> : <Icons.TrendDown />)
            }
            {change > 0 ? '+' : ''}{change.toFixed(2)}%
          </span>
        )}
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-sublabel">{sublabel}</div>
    </div>
  );
}

function FindingCard({ finding }) {
  const colorStyles = {
    danger: {
      bg: 'bg-gradient-to-br from-danger-50 to-danger-100/50',
      border: 'border-danger-200/60',
      icon: 'bg-gradient-to-br from-danger-500 to-danger-600',
      text: 'text-danger-700',
      shadow: 'hover:shadow-[0_4px_12px_rgba(214,38,18,0.12)]',
    },
    warning: {
      bg: 'bg-gradient-to-br from-warning-50 to-warning-100/50',
      border: 'border-warning-200/60',
      icon: 'bg-gradient-to-br from-warning-500 to-warning-600',
      text: 'text-warning-700',
      shadow: 'hover:shadow-[0_4px_12px_rgba(245,158,11,0.12)]',
    },
    success: {
      bg: 'bg-gradient-to-br from-accent-50 to-accent-100/50',
      border: 'border-accent-200/60',
      icon: 'bg-gradient-to-br from-accent-500 to-accent-600',
      text: 'text-accent-700',
      shadow: 'hover:shadow-[0_4px_12px_rgba(0,150,110,0.12)]',
    },
    info: {
      bg: 'bg-gradient-to-br from-gov-50 to-gov-100/50',
      border: 'border-gov-200/60',
      icon: 'bg-gradient-to-br from-gov-500 to-gov-600',
      text: 'text-gov-700',
      shadow: 'hover:shadow-[0_4px_12px_rgba(54,116,174,0.12)]',
    },
  };

  const style = colorStyles[finding.type];
  const IconComponent = finding.icon;

  return (
    <div className={`finding-card ${style.bg} border ${style.border} ${style.shadow}`}>
      <div className="flex items-start gap-4">
        <div className={`finding-card-icon ${style.icon}`}>
          <IconComponent />
        </div>
        <div className="flex-1 min-w-0">
          <div className="finding-card-title">{finding.title}</div>
          <div className={`finding-card-value ${style.text}`}>{finding.value}</div>
          <div className="finding-card-description">{finding.description}</div>
        </div>
      </div>
    </div>
  );
}

function EuroHighlight() {
  return (
    <div className="euro-highlight relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.03] rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/[0.03] rounded-full translate-y-1/2 -translate-x-1/3" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gov-400/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10 shadow-lg">
            <Icons.Euro />
          </div>
          <div>
            <div className="text-gov-200 text-sm font-semibold uppercase tracking-wider">Присъединяване към Еврозоната</div>
            <div className="text-2xl md:text-3xl font-bold tracking-tight">1 януари 2026</div>
          </div>
        </div>

        <p className="text-gov-100 text-base mb-8 max-w-xl leading-relaxed">
          България приема еврото като официална валута. Това е първият държавен бюджет, изцяло деноминиран в евро.
        </p>

        <div className="grid grid-cols-3 gap-4 md:gap-6">
          <div className="euro-stat">
            <div className="euro-stat-value">1.9558</div>
            <div className="euro-stat-label">BGN/EUR курс</div>
          </div>
          <div className="euro-stat">
            <div className="euro-stat-value">120.1</div>
            <div className="euro-stat-label">млрд. EUR БВП</div>
          </div>
          <div className="euro-stat">
            <div className="euro-stat-value">4/5</div>
            <div className="euro-stat-label">Маастрихт критерии</div>
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
    <div className="card p-8">
      <h2 className="section-title mb-8">Секторни разходи (% от БВП)</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {sectors.map((sector, i) => (
          <div key={i} className="text-center group">
            <div className="relative w-36 h-36 mx-auto mb-5 transition-transform duration-300 ease-out group-hover:scale-105">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
                {/* Background circle */}
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="14"
                />
                {/* Progress circle */}
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  fill="none"
                  stroke={
                    sector.status === 'success' ? '#00966E' :
                    sector.status === 'warning' ? '#f59e0b' : '#D62612'
                  }
                  strokeWidth="14"
                  strokeDasharray={`${(sector.value / sector.maxScale) * 339} 339`}
                  strokeLinecap="round"
                  style={{
                    filter: `drop-shadow(0 2px 4px ${
                      sector.status === 'success' ? 'rgba(0,150,110,0.3)' :
                      sector.status === 'warning' ? 'rgba(245,158,11,0.3)' : 'rgba(214,38,18,0.3)'
                    })`
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-bold text-slate-900 tabular-nums tracking-tight">{sector.value}%</span>
              </div>
            </div>
            <div className="font-bold text-slate-900 text-lg">{sector.name}</div>
            <div className={`text-sm flex items-center justify-center gap-2 mt-2 font-medium ${
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
    <div className="card p-8">
      <h2 className="section-title mb-6">Маастрихтски критерии</h2>
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
                <div className="font-semibold text-slate-900">{item.name}</div>
                <div className="text-sm text-slate-500 mt-0.5">{item.threshold}</div>
              </div>
            </div>
            <div className={`text-xl font-bold tabular-nums tracking-tight ${
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

function SummaryView() {
  return (
    <div className="space-y-10 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="badge badge-info badge-lg mb-5 shadow-sm">
          <Icons.Info />
          Сравнителен анализ
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          Бюджет 2026
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Сравнение на версиите от ноември и декември 2025 г. на проекта за държавен бюджет на Република България
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 animate-stagger">
        {summaryMetrics.map((metric, i) => (
          <MetricCard key={i} {...metric} />
        ))}
      </div>

      {/* Euro Highlight */}
      <EuroHighlight />

      {/* Key Findings */}
      <div>
        <h2 className="section-title mb-5">Ключови констатации</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {keyFindings.map((finding, i) => (
            <FindingCard key={i} finding={finding} />
          ))}
        </div>
      </div>

      {/* Sectoral Comparison */}
      <SectorComparison />

      {/* Maastricht Criteria */}
      <MaastrichtCriteria />

      {/* Footer note */}
      <div className="text-center text-sm text-slate-500 py-8 border-t border-slate-200/80">
        <p className="font-medium">Анализът е фактологичен и не съдържа политически оценки.</p>
        <p className="mt-2 text-slate-400">Данни: Министерство на финансите | Дата: 08.12.2025</p>
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

            {/* Version badge */}
            <div className="flex items-center">
              <span className="badge badge-neutral">
                Декември 2025
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FullAnalysis />
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
