import React, { useState } from 'react';
import BudgetVisualizations from './components/BudgetVisualizations';
import FullAnalysis from './components/FullAnalysis';

// Modern Icons
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
  ArrowUp: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
    </svg>
  ),
  ArrowDown: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5H5.25m2.25 3H5.25m11.25-3h2.25m-2.25 3h2.25M12 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Sparkles: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
};

// Key findings data
const keyFindings = [
  {
    title: "Дефицитът се увеличава",
    value: "+18.5%",
    description: "от 3.86 на 4.58 млрд. €",
    type: "danger",
    icon: Icons.ArrowUp,
  },
  {
    title: "Данъчни приходи",
    value: "-913 млн.",
    description: "намаление спрямо ноември",
    type: "warning",
    icon: Icons.ArrowDown,
  },
  {
    title: "Капиталови разходи",
    value: "-16.3%",
    description: "-481 млн. € съкращение",
    type: "warning",
    icon: Icons.ArrowDown,
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
  { label: "Приходи", value: "30.4 млрд. €", change: -2.92, sublabel: "Декември 2025" },
  { label: "Разходи", value: "17.3 млрд. €", change: -2.38, sublabel: "Декември 2025" },
  { label: "Дефицит", value: "4.58 млрд. €", change: 18.70, sublabel: "3.81% от БВП" },
  { label: "Държавен дълг", value: "31.3%", change: null, sublabel: "от БВП (лимит 60%)" },
];

function MetricCard({ label, value, change, sublabel }) {
  return (
    <div className="card p-5 group hover:border-primary-200">
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        {change !== null && (
          <span className={`badge ${change > 0 ? (label === 'Дефицит' ? 'badge-danger' : 'badge-success') : 'badge-warning'}`}>
            {change > 0 ? '+' : ''}{change.toFixed(2)}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-slate-900 font-display tabular-nums">{value}</div>
      <div className="text-xs text-slate-400 mt-1">{sublabel}</div>
    </div>
  );
}

function FindingCard({ finding }) {
  const styles = {
    danger: 'from-danger-500 to-danger-600',
    warning: 'from-warning-500 to-warning-600',
    success: 'from-accent-500 to-accent-600',
    info: 'from-primary-500 to-primary-600',
  };

  const bgStyles = {
    danger: 'bg-danger-50 border-danger-100',
    warning: 'bg-warning-50 border-warning-100',
    success: 'bg-accent-50 border-accent-100',
    info: 'bg-primary-50 border-primary-100',
  };

  const IconComponent = finding.icon;

  return (
    <div className={`card p-5 ${bgStyles[finding.type]} border`}>
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${styles[finding.type]} flex items-center justify-center text-white shadow-lg`}>
          <IconComponent />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-slate-600">{finding.title}</div>
          <div className="text-xl font-bold text-slate-900 mt-0.5 font-display">{finding.value}</div>
          <div className="text-sm text-slate-500 mt-1">{finding.description}</div>
        </div>
      </div>
    </div>
  );
}

function EuroHighlight() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-8 text-white">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
            <Icons.Euro />
          </div>
          <div>
            <div className="text-primary-200 text-sm font-medium">Еврозона</div>
            <div className="text-xl font-bold font-display">1 януари 2026</div>
          </div>
        </div>

        <p className="text-primary-100 text-sm mb-6">
          България приема еврото като официална валута. Първият бюджет, изцяло деноминиран в евро.
        </p>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
            <div className="text-2xl font-bold font-display">1.9558</div>
            <div className="text-xs text-primary-200 mt-1">BGN/EUR курс</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
            <div className="text-2xl font-bold font-display">120.1</div>
            <div className="text-xs text-primary-200 mt-1">млрд. € БВП</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
            <div className="text-2xl font-bold font-display">4/5</div>
            <div className="text-xs text-primary-200 mt-1">критерии ✓</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryView() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
          <Icons.Sparkles />
          Сравнителен анализ
        </div>
        <h1 className="text-4xl font-bold text-slate-900 font-display mb-3">
          Бюджет 2026
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Сравнение на версиите от ноември и декември 2025 г. на проекта за държавен бюджет на Република България
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryMetrics.map((metric, i) => (
          <MetricCard key={i} {...metric} />
        ))}
      </div>

      {/* Euro Highlight */}
      <EuroHighlight />

      {/* Key Findings */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 font-display mb-4">Ключови констатации</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {keyFindings.map((finding, i) => (
            <FindingCard key={i} finding={finding} />
          ))}
        </div>
      </div>

      {/* Sectoral Comparison */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-slate-900 font-display mb-6">Секторни разходи (% от БВП)</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                <circle cx="64" cy="64" r="56" fill="none" stroke="#10b981" strokeWidth="12"
                  strokeDasharray={`${(2.05/3) * 352} 352`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-900 font-display">2.05%</span>
              </div>
            </div>
            <div className="font-semibold text-slate-900">Отбрана</div>
            <div className="text-sm text-accent-600 flex items-center justify-center gap-1 mt-1">
              <Icons.Check /> НАТО: 2.0%
            </div>
          </div>

          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                <circle cx="64" cy="64" r="56" fill="none" stroke="#f59e0b" strokeWidth="12"
                  strokeDasharray={`${(4.8/7) * 352} 352`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-900 font-display">4.8%</span>
              </div>
            </div>
            <div className="font-semibold text-slate-900">Образование</div>
            <div className="text-sm text-warning-600 flex items-center justify-center gap-1 mt-1">
              <Icons.Alert /> ЕС: 5.0%
            </div>
          </div>

          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                <circle cx="64" cy="64" r="56" fill="none" stroke="#f43f5e" strokeWidth="12"
                  strokeDasharray={`${(5.3/10) * 352} 352`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-900 font-display">5.3%</span>
              </div>
            </div>
            <div className="font-semibold text-slate-900">Здравеопазване</div>
            <div className="text-sm text-danger-600 flex items-center justify-center gap-1 mt-1">
              <Icons.Alert /> ЕС: 7.5%
            </div>
          </div>
        </div>
      </div>

      {/* Maastricht Criteria */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-slate-900 font-display mb-6">Маастрихтски критерии</h2>
        <div className="space-y-4">
          {[
            { name: 'Бюджетен дефицит', threshold: '≤ 3.0%', value: '3.0%', status: 'ok' },
            { name: 'Държавен дълг', threshold: '≤ 60%', value: '31.3%', status: 'ok' },
            { name: 'Инфлация (ХИПЦ)', threshold: '≤ референтна', value: '3.5%', status: 'warning' },
            { name: 'Валутен курс', threshold: 'ERM II стабилен', value: 'Фиксиран', status: 'ok' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  item.status === 'ok'
                    ? 'bg-accent-100 text-accent-600'
                    : 'bg-warning-100 text-warning-600'
                }`}>
                  {item.status === 'ok' ? <Icons.Check /> : <Icons.Alert />}
                </div>
                <div>
                  <div className="font-medium text-slate-900">{item.name}</div>
                  <div className="text-sm text-slate-500">{item.threshold}</div>
                </div>
              </div>
              <div className={`text-lg font-bold font-display ${
                item.status === 'ok' ? 'text-accent-600' : 'text-warning-600'
              }`}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div className="text-center text-sm text-slate-500 py-4">
        Анализът е фактологичен и не съдържа политически оценки.
        <br />
        Данни: Министерство на финансите | Дата: 08.12.2025
      </div>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20">
                <span className="text-white font-bold text-sm font-display">BG</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-slate-900 font-display">Бюджет 2026</h1>
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
              <span className="badge badge-info">
                v. Декември 2025
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'charts' && <BudgetVisualizations />}
        {activeView === 'summary' && <SummaryView />}
        {activeView === 'full' && <FullAnalysis />}
      </main>

      {/* Footer */}
      <footer className="relative border-t border-slate-200/50 bg-white/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                <span className="text-slate-600 font-bold text-xs font-display">BG</span>
              </div>
              <div className="text-sm text-slate-600">
                Проект на Закон за държавния бюджет на Република България за 2026 г.
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <span>Данни: Министерство на финансите</span>
              <span className="hidden sm:inline">|</span>
              <span>Версия от 05.12.2025</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
