import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// Modern color palette matching the design system
const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#14b8a6', '#eab308', '#ef4444', '#22c55e'];

// Macroeconomic forecasts 2026-2028
const macroForecast = [
  { year: '2026', gdp: 2.7, inflation: 3.5, unemployment: 3.6 },
  { year: '2027', gdp: 2.5, inflation: 2.9, unemployment: 3.7 },
  { year: '2028', gdp: 2.4, inflation: 2.5, unemployment: 3.8 },
];

// Debt dynamics 2024-2028
const debtData = [
  { year: '2024', debt: 23.8, amount: 28.5, limit: 60 },
  { year: '2025', debt: 28.5, amount: 34.2, limit: 60 },
  { year: '2026', debt: 31.3, amount: 37.6, limit: 60 },
  { year: '2027', debt: 34.2, amount: 43.5, limit: 60 },
  { year: '2028', debt: 36.6, amount: 49.0, limit: 60 },
];

// Maastricht criteria compliance
const maastrichtData = [
  { criterion: 'Бюджетен дефицит', threshold: 3.0, bulgaria: 3.0, unit: '% от БВП', status: 'ok' },
  { criterion: 'Държавен дълг', threshold: 60.0, bulgaria: 31.3, unit: '% от БВП', status: 'ok' },
  { criterion: 'Инфлация (ХИПЦ)', threshold: 2.5, bulgaria: 3.5, unit: '%', status: 'warning' },
  { criterion: 'Дългоср. лихви', threshold: 4.0, bulgaria: 3.8, unit: '%', status: 'ok' },
  { criterion: 'Валутен курс', threshold: 0, bulgaria: 0, unit: 'ERM II', status: 'ok' },
];

// Revenue structure data (December 2025)
const revenueData = [
  { name: 'ДДС', value: 14985.2, percent: '47.8%' },
  { name: 'ДДФЛ', value: 4914.7, percent: '15.7%' },
  { name: 'Корпоративен данък', value: 3873.3, percent: '12.4%' },
  { name: 'Акцизи', value: 4167.0, percent: '13.3%' },
  { name: 'Мита', value: 154.4, percent: '0.5%' },
  { name: 'Други данъчни', value: 331.8, percent: '1.0%' },
  { name: 'Неданъчни приходи', value: 2861.8, percent: '9.1%' },
];

// Expenditure structure data (December 2025)
const expenditureData = [
  { name: 'Персонал', value: 7449.7, percent: '42.1%' },
  { name: 'Субсидии', value: 1191.6, percent: '6.7%' },
  { name: 'Капиталови разходи', value: 3051.9, percent: '17.3%' },
  { name: 'Лихви', value: 701.9, percent: '4.0%' },
  { name: 'Други текущи', value: 5301.4, percent: '30.0%' },
];

// Ministry changes data (December vs November)
const ministryChanges = [
  { name: 'Здравеопазване', change: 70.6, percent: '+10.0%', type: 'increase' },
  { name: 'МВР', change: 13.9, percent: '+0.8%', type: 'increase' },
  { name: 'Труд и соц. политика', change: 5.9, percent: '+0.3%', type: 'increase' },
  { name: 'Народно събрание', change: -0.5, percent: '-0.8%', type: 'decrease' },
  { name: 'МОН', change: -7.2, percent: '-0.9%', type: 'decrease' },
  { name: 'Министерски съвет', change: -8.3, percent: '-5.8%', type: 'decrease' },
  { name: 'МРРБ', change: -155.8, percent: '-12.5%', type: 'decrease' },
];

// Deficit trend data
const deficitData = [
  { year: '2024 (отчет)', deficit: 2.8, limit: 3.0 },
  { year: '2025 (очакв.)', deficit: 3.0, limit: 3.0 },
  { year: '2026 (план)', deficit: 3.0, limit: 3.0 },
  { year: '2027 (прогн.)', deficit: 4.3, limit: 3.0 },
  { year: '2028 (прогн.)', deficit: 3.0, limit: 3.0 },
];

// Sectoral comparison with EU
const sectoralData = [
  { sector: 'Отбрана', bulgaria: 2.05, eu: 1.7, nato: 2.0 },
  { sector: 'Образование', bulgaria: 4.8, eu: 5.0, nato: null },
  { sector: 'Здравеопазване', bulgaria: 5.3, eu: 7.5, nato: null },
];

// Version comparison summary
const versionComparison = [
  { category: 'Приходи', november: 31288.4, december: 31543.5, change: 255.1 },
  { category: 'Разходи', november: 17496.4, december: 17676.7, change: 180.2 },
  { category: 'Трансфери', november: 17651.4, december: 18442.2, change: 790.8 },
  { category: 'Дефицит', november: -3859.4, december: -4575.4, change: -716.0 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm p-3 border border-slate-200 rounded-xl shadow-lg">
        <p className="font-semibold text-slate-900">{label || payload[0].name}</p>
        <p className="text-sm text-primary-600 font-medium">{`${payload[0].value.toLocaleString()} млн. €`}</p>
        {payload[0].payload.percent && <p className="text-xs text-slate-500">{payload[0].payload.percent}</p>}
      </div>
    );
  }
  return null;
};

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
              <div className="bg-primary-50 p-4 rounded-xl border border-primary-100">
                <div className="text-2xl font-bold text-primary-600 font-display">2,7%</div>
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
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-center text-slate-900 font-display">Съответствие с Маастрихтските критерии</h2>
            <p className="text-center text-slate-500">Изисквания за членство в еврозоната (към 01.01.2026)</p>
            <div className="space-y-3">
              {maastrichtData.map((item, idx) => (
                <div key={idx} className={`p-4 rounded-xl border-2 transition-all ${
                  item.status === 'ok' ? 'border-accent-200 bg-accent-50' : 'border-warning-200 bg-warning-50'
                }`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-lg text-slate-900">{item.criterion}</div>
                      <div className="text-sm text-slate-500">
                        {item.threshold > 0 ? `Праг: ≤ ${item.threshold}${item.unit}` : 'Стабилен валутен курс в ERM II'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold font-display ${
                        item.status === 'ok' ? 'text-accent-600' : 'text-warning-600'
                      }`}>
                        {item.criterion === 'Валутен курс' ? 'Фиксиран' : `${item.bulgaria}${item.unit}`}
                      </div>
                      <span className={`badge mt-1 ${item.status === 'ok' ? 'badge-success' : 'badge-warning'}`}>
                        {item.status === 'ok' ? 'Изпълнен' : 'Внимание'}
                      </span>
                    </div>
                  </div>
                  {item.threshold > 0 && item.criterion !== 'Валутен курс' && (
                    <div className="mt-3">
                      <div className="w-full bg-slate-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full transition-all ${item.status === 'ok' ? 'bg-accent-500' : 'bg-warning-500'}`}
                          style={{ width: `${Math.min((item.bulgaria / item.threshold) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>0</span>
                        <span>{item.threshold}{item.unit} (лимит)</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-accent-100 p-4 rounded-xl text-center border border-accent-200">
                <div className="text-3xl font-bold text-accent-700 font-display">4/5</div>
                <div className="text-sm text-accent-600">Критерии изпълнени</div>
              </div>
              <div className="bg-warning-100 p-4 rounded-xl text-center border border-warning-200">
                <div className="text-3xl font-bold text-warning-700 font-display">1</div>
                <div className="text-sm text-warning-600">Критерий с повишен риск</div>
              </div>
            </div>
            <div className="text-sm text-slate-500 text-center">
              Инфлацията е над референтната стойност, но това е допустимо за страна, влизаща в еврозоната
            </div>
          </div>
        );

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
                ? 'bg-white text-primary-600 shadow-sm'
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
