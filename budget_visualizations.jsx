import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a4de6c'];

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
      <div className="bg-white p-2 border border-gray-300 rounded shadow">
        <p className="font-bold">{label || payload[0].name}</p>
        <p className="text-sm">{`${payload[0].value.toLocaleString()} млн. €`}</p>
        {payload[0].payload.percent && <p className="text-xs text-gray-600">{payload[0].payload.percent}</p>}
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
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">Структура на данъчните приходи (Декември 2025)</h2>
            <p className="text-center text-gray-600">Общо: 28 426,4 млн. € данъчни приходи</p>
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
            <div className="text-sm text-gray-500 text-center">
              ДДС е основният източник на приходи (47,8%), следван от ДДФЛ (15,7%) и акцизите (13,3%)
            </div>
          </div>
        );

      case 'expenditure':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">Структура на разходите (Декември 2025)</h2>
            <p className="text-center text-gray-600">Общо: 17 676,7 млн. € разходи</p>
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
            <div className="text-sm text-gray-500 text-center">
              Персоналът съставлява 42,1% от разходите. Капиталовите разходи са 17,3%.
            </div>
          </div>
        );

      case 'changes':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">Промени по министерства (Декември vs Ноември)</h2>
            <p className="text-center text-gray-600">Промяна в млн. €</p>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={ministryChanges} layout="vertical" margin={{ left: 120 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[-200, 100]} />
                <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => [`${value.toFixed(1)} млн. €`, 'Промяна']} />
                <Bar dataKey="change" fill={(entry) => entry.change >= 0 ? '#00C49F' : '#FF8042'}>
                  {ministryChanges.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.change >= 0 ? '#00C49F' : '#FF8042'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="text-sm text-gray-500 text-center">
              Здравеопазването получава най-голямо увеличение (+70,6 млн. €), МРРБ - най-голямо намаление (-155,8 млн. €)
            </div>
          </div>
        );

      case 'deficit':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">Динамика на бюджетния дефицит (% от БВП)</h2>
            <p className="text-center text-gray-600">Маастрихтски критерий: ≤ 3,0%</p>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={deficitData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 5]} tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, '']} />
                <Legend />
                <Line type="monotone" dataKey="deficit" stroke="#FF8042" strokeWidth={3} name="Дефицит" dot={{ r: 6 }} />
                <Line type="monotone" dataKey="limit" stroke="#00C49F" strokeWidth={2} strokeDasharray="5 5" name="Лимит 3%" dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <div className="text-sm text-gray-500 text-center">
              ⚠️ През 2027 г. дефицитът се очаква да достигне 4,3% поради доставки на отбранително оборудване (F-16, Stryker)
            </div>
          </div>
        );

      case 'debt':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">Динамика на държавния дълг (2024-2028)</h2>
            <p className="text-center text-gray-600">Маастрихтски лимит: ≤ 60% от БВП</p>
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
                <Bar yAxisId="left" dataKey="debt" fill="#8884d8" name="Дълг (% от БВП)" />
                <Line yAxisId="left" type="monotone" dataKey="limit" stroke="#00C49F" strokeWidth={2} strokeDasharray="5 5" name="Лимит 60%" dot={false} />
              </BarChart>
            </ResponsiveContainer>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Година</th>
                    <th className="border p-2 text-right">Дълг (млрд. €)</th>
                    <th className="border p-2 text-right">% от БВП</th>
                    <th className="border p-2 text-right">Буфер до 60%</th>
                  </tr>
                </thead>
                <tbody>
                  {debtData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="border p-2 font-medium">{row.year}</td>
                      <td className="border p-2 text-right">{row.amount} млрд.</td>
                      <td className="border p-2 text-right">{row.debt}%</td>
                      <td className="border p-2 text-right text-green-600">{(60 - row.debt).toFixed(1)} пр.п.</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-sm text-green-600 text-center font-bold">
              ✓ Държавният дълг остава значително под лимита от 60%, с буфер от ~28 пр.п. през 2026 г.
            </div>
          </div>
        );

      case 'macro':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">Макроикономическа прогноза 2026-2028</h2>
            <p className="text-center text-gray-600">Източник: Министерство на финансите, есен 2025</p>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={macroForecast} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis domain={[0, 5]} tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, '']} />
                <Legend />
                <Bar dataKey="gdp" fill="#0088FE" name="БВП растеж" />
                <Bar dataKey="inflation" fill="#FF8042" name="Инфлация (ХИПЦ)" />
                <Bar dataKey="unemployment" fill="#00C49F" name="Безработица" />
              </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">2,7%</div>
                <div className="text-sm text-gray-600">БВП растеж 2026</div>
                <div className="text-xs text-gray-400">↓ 2,4% до 2028</div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">3,5%</div>
                <div className="text-sm text-gray-600">Инфлация 2026</div>
                <div className="text-xs text-gray-400">↓ 2,5% до 2028</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-green-600">3,6%</div>
                <div className="text-sm text-gray-600">Безработица 2026</div>
                <div className="text-xs text-gray-400">↑ 3,8% до 2028</div>
              </div>
            </div>
            <div className="text-sm text-gray-500 text-center">
              Прогнозата е потвърдена от Фискалния съвет и е близка до очакванията на ЕК и ОИСР
            </div>
          </div>
        );

      case 'maastricht':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">Съответствие с Маастрихтските критерии</h2>
            <p className="text-center text-gray-600">Изисквания за членство в еврозоната (към 01.01.2026)</p>
            <div className="space-y-3">
              {maastrichtData.map((item, idx) => (
                <div key={idx} className={`p-4 rounded-lg border-2 ${
                  item.status === 'ok' ? 'border-green-300 bg-green-50' : 'border-yellow-300 bg-yellow-50'
                }`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-lg">{item.criterion}</div>
                      <div className="text-sm text-gray-600">
                        {item.threshold > 0 ? `Праг: ≤ ${item.threshold}${item.unit}` : 'Стабилен валутен курс в ERM II'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        item.status === 'ok' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {item.criterion === 'Валутен курс' ? 'Фиксиран' : `${item.bulgaria}${item.unit}`}
                      </div>
                      <div className="text-2xl">
                        {item.status === 'ok' ? '✓' : '⚠️'}
                      </div>
                    </div>
                  </div>
                  {item.threshold > 0 && item.criterion !== 'Валутен курс' && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${item.status === 'ok' ? 'bg-green-500' : 'bg-yellow-500'}`}
                          style={{ width: `${Math.min((item.bulgaria / item.threshold) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0</span>
                        <span>{item.threshold}{item.unit} (лимит)</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-green-100 p-3 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-700">4/5</div>
                <div className="text-sm">Критерии изпълнени</div>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg text-center">
                <div className="text-3xl font-bold text-yellow-700">1</div>
                <div className="text-sm">Критерий с повишен риск</div>
              </div>
            </div>
            <div className="text-sm text-gray-500 text-center">
              Инфлацията е над референтната стойност, но това е допустимо за страна, влизаща в еврозоната
            </div>
          </div>
        );

      case 'sectors':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">Секторни разходи: България vs ЕС (% от БВП)</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={sectoralData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sector" />
                <YAxis domain={[0, 10]} tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => value ? [`${value}%`, ''] : ['N/A', '']} />
                <Legend />
                <Bar dataKey="bulgaria" fill="#0088FE" name="България 2026" />
                <Bar dataKey="eu" fill="#00C49F" name="Средно ЕС" />
                <Bar dataKey="nato" fill="#FFBB28" name="НАТО цел" />
              </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-4 text-center text-sm mt-4">
              <div className="bg-green-100 p-2 rounded">
                <div className="font-bold text-green-700">✓ Отбрана</div>
                <div>2,05% &gt; 2,0% НАТО</div>
              </div>
              <div className="bg-yellow-100 p-2 rounded">
                <div className="font-bold text-yellow-700">⚠ Образование</div>
                <div>4,8% &lt; 5,0% ЕС</div>
              </div>
              <div className="bg-red-100 p-2 rounded">
                <div className="font-bold text-red-700">⚠ Здравеопазване</div>
                <div>5,3% &lt;&lt; 7,5% ЕС</div>
              </div>
            </div>
          </div>
        );

      case 'comparison':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">Сравнение: Ноември vs Декември 2025</h2>
            <p className="text-center text-gray-600">Основни бюджетни параметри (млн. €)</p>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={versionComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value) => [`${value.toLocaleString()} млн. €`, '']} />
                <Legend />
                <Bar dataKey="november" fill="#8884d8" name="Ноември 2025" />
                <Bar dataKey="december" fill="#82ca9d" name="Декември 2025" />
              </BarChart>
            </ResponsiveContainer>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Показател</th>
                    <th className="border p-2 text-right">Ноември</th>
                    <th className="border p-2 text-right">Декември</th>
                    <th className="border p-2 text-right">Промяна</th>
                  </tr>
                </thead>
                <tbody>
                  {versionComparison.map((row, idx) => (
                    <tr key={idx} className={row.change < 0 && row.category === 'Дефицит' ? 'bg-red-50' : ''}>
                      <td className="border p-2">{row.category}</td>
                      <td className="border p-2 text-right">{row.november.toLocaleString()}</td>
                      <td className="border p-2 text-right">{row.december.toLocaleString()}</td>
                      <td className={`border p-2 text-right font-bold ${row.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {row.change > 0 ? '+' : ''}{row.change.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-sm text-red-600 text-center font-bold">
              ⚠️ Дефицитът се увеличава с 716 млн. € (+18,5%) между двете версии
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white">
      <h1 className="text-2xl font-bold text-center mb-2">
        📊 Бюджет 2026: Визуализации
      </h1>
      <p className="text-center text-gray-500 text-sm mb-4">
        Проект на ЗДБРБ за 2026 г. | Сравнение Ноември vs Декември 2025
      </p>
      
      {/* Tab navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="bg-gray-50 rounded-lg p-4 min-h-[500px]">
        {renderContent()}
      </div>

      {/* Footer */}
      <div className="mt-4 text-center text-xs text-gray-400">
        Данни: Министерство на финансите | Анализ: 08.12.2025
      </div>
    </div>
  );
}
