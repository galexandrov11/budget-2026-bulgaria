import React, { useState } from 'react';
import {
  RevenuePieChart,
  ExpenditurePieChart,
  MinistryChangesBarChart,
  DeficitLineChart,
  DebtBarChart,
  MacroIndicatorsBarChart,
  MaastrichtCriteriaVisualization,
  SectorsComparisonBarChart
} from './BudgetVisualizations';

// Data Tables
const mainIndicators = [
  { name: "Приходи общо", november: "31 283 276,7", december: "30 369 776,7", change: "-913 500,0", percent: "-2,92%" },
  { name: "Данъчни приходи", november: "28 426 351,6", december: "27 512 851,6", change: "-913 500,0", percent: "-3,21%" },
  { name: "Неданъчни приходи", november: "2 856 669,5", december: "2 856 669,5", change: "0,0", percent: "0,00%" },
  { name: "Разходи общо", november: "17 676 667,1", december: "17 256 463,0", change: "-420 204,1", percent: "-2,38%" },
  { name: "Текущи разходи", november: "14 624 760,6", december: "14 685 556,5", change: "+60 795,9", percent: "+0,42%" },
  { name: "Капиталови разходи", november: "2 954 568,3", december: "2 473 568,3", change: "-481 000,0", percent: "-16,28%" },
  { name: "Трансфери (нето)", november: "16 254 588,8", december: "16 482 766,7", change: "+228 177,9", percent: "+1,40%" },
  { name: "Вноска в бюджета на ЕС", november: "1 209 056,4", december: "1 209 056,4", change: "0,0", percent: "0,00%" },
  { name: "Бюджетен дефицит", november: "-3 857 035,6", december: "-4 578 509,4", change: "-721 473,8", percent: "+18,70%", highlight: true }
];

const taxRevenues = [
  { name: "Корпоративен данък", november: "3 873 304,7", december: "3 653 304,7", change: "-220 000,0", percent: "-5,68%" },
  { name: "Дивиденти и ликв. дялове", november: "86 254,0", december: "76 254,0", change: "-10 000,0", percent: "-11,59%" },
  { name: "ДДФЛ", november: "4 914 744,3", december: "4 731 244,3", change: "-183 500,0", percent: "-3,73%" },
  { name: "ДДС", november: "14 985 215,2", december: "14 385 215,2", change: "-600 000,0", percent: "-4,00%" },
  { name: "Акцизи", november: "4 167 028,8", december: "4 242 028,8", change: "+75 000,0", percent: "+1,80%" },
  { name: "Застрахователни премии", november: "43 459,8", december: "43 459,8", change: "0,0", percent: "0,00%" },
  { name: "Мита", november: "201 934,7", december: "201 934,7", change: "0,0", percent: "0,00%" },
  { name: "Други данъци", november: "154 410,1", december: "179 410,1", change: "+25 000,0", percent: "+16,19%" },
  { name: "ОБЩО", november: "28 426 351,6", december: "27 512 851,6", change: "-913 500,0", percent: "-3,21%", isTotal: true }
];

const expenditures = [
  { name: "Текущи разходи общо", november: "14 624 760,6", december: "14 685 556,5", change: "+60 795,9", percent: "+0,42%" },
  { name: "  - Персонал", november: "7 449 736,5", december: "7 433 107,4", change: "-16 629,1", percent: "-0,22%", indent: true },
  { name: "  - Субсидии и трансфери", november: "1 191 589,5", december: "1 221 589,5", change: "+30 000,0", percent: "+2,52%", indent: true },
  { name: "  - Лихви", november: "1 069 520,3", december: "1 069 520,3", change: "0,0", percent: "0,00%", indent: true },
  { name: "  - Обезщетения за домакинства", november: "2 161 342,9", december: "2 161 342,9", change: "0,0", percent: "0,00%", indent: true },
  { name: "Капиталови разходи общо", november: "2 954 568,3", december: "2 473 568,3", change: "-481 000,0", percent: "-16,28%" },
  { name: "  - Дълготрайни активи", november: "2 503 126,4", december: "2 111 126,4", change: "-392 000,0", percent: "-15,66%", indent: true },
  { name: "  - Капиталови трансфери", november: "451 441,9", december: "362 441,9", change: "-89 000,0", percent: "-19,72%", indent: true },
  { name: "Резерв непредвидени разходи", november: "67 183,5", december: "67 183,5", change: "0,0", percent: "0,00%" }
];

const transfers = [
  { name: "Общини", november: "5 107 617,6", december: "5 077 824,5", change: "-29 793,1", percent: "-0,58%" },
  { name: "ДОО", november: "6 329 771,3", december: "6 832 090,2", change: "+502 318,9", percent: "+7,94%" },
  { name: "НЗОК", november: "2 378 107,5", december: "2 118 107,5", change: "-260 000,0", percent: "-10,93%" },
  { name: "НФ (ЕС средства)", november: "670 371,4", december: "670 371,4", change: "0,0", percent: "0,00%" },
  { name: "ДФ Земеделие", november: "473 134,6", december: "473 134,6", change: "0,0", percent: "0,00%" },
  { name: "ОБЩО предоставени", november: "16 261 440,2", december: "16 489 618,1", change: "+228 177,9", percent: "+1,40%", isTotal: true }
];

const ministries = [
  { name: "Министерство на здравеопазването", change: "+70 627,1", percent: "+10,04%", type: "increase", note: "Включени 30 000 хил. € за програма за лекари специализанти" },
  { name: "Министерство на финансите", change: "+13 920,1", percent: "+2,98%", type: "increase", note: "Увеличение изцяло от разходи за персонал" },
  { name: "Министерство на труда и соц. политика", change: "+5 922,5", percent: "+0,26%", type: "increase", note: "Увеличение за администрацията; социални плащания непроменени" },
  { name: "Министерство на образованието", change: "-7 177,8", percent: "-0,86%", type: "decrease", note: "Трансфери за БАН и ВУЗ нарастват с +17,2 млн. €" },
  { name: "Министерски съвет", change: "-8 343,2", percent: "-5,82%", type: "decrease", note: "Намаление на капиталови разходи -30,22%" },
  { name: "Министерство на регионалното развитие", change: "-155 842,5", percent: "-12,47%", type: "decrease", note: "Най-голямо намаление: -159 млн. € за инфраструктура" }
];

const universities = [
  { name: "БАН", november: "133 037,6", december: "137 928,4", change: "+4 890,8", percent: "+3,68%" },
  { name: "Софийски университет", november: "107 628,1", december: "109 788,5", change: "+2 160,4", percent: "+2,01%" },
  { name: "Технически у-т София", november: "81 974,5", december: "83 378,2", change: "+1 403,7", percent: "+1,71%" },
  { name: "МУ София", november: "47 083,3", december: "47 978,9", change: "+895,6", percent: "+1,90%" },
  { name: "УНСС", november: "33 122,1", december: "33 688,0", change: "+565,9", percent: "+1,71%" },
  { name: "ПУ Пловдив", november: "39 507,2", december: "40 188,6", change: "+681,4", percent: "+1,72%" },
  { name: "Тракийски у-т Ст. Загора", november: "30 877,1", december: "31 457,0", change: "+579,9", percent: "+1,88%" },
  { name: "МУ Варна", november: "31 233,1", december: "31 803,0", change: "+569,9", percent: "+1,82%" },
  { name: "МУ Пловдив", november: "30 349,5", december: "30 912,4", change: "+562,9", percent: "+1,86%" },
  { name: "Всички ВУЗ общо", november: "681 687,7", december: "694 030,1", change: "+12 342,4", percent: "+1,81%", isTotal: true }
];

const macroIndicators = [
  { indicator: "Реален растеж на БВП", y2026: "2,7%", y2027: "2,5%", y2028: "2,4%" },
  { indicator: "Номинален БВП (млрд. €)", y2026: "~120,1", y2027: "~127,2", y2028: "~133,9" },
  { indicator: "Средногодишна инфлация (ХИПЦ)", y2026: "3,5%", y2027: "2,9%", y2028: "2,5%" },
  { indicator: "Безработица", y2026: "3,5-3,7%", y2027: "3,7%", y2028: "3,8%" },
  { indicator: "Минимална работна заплата", y2026: "620,20 €", y2027: "n/a", y2028: "n/a" },
  { indicator: "Средна пенсия", y2026: "541,20 €", y2027: "n/a", y2028: "n/a" }
];

const maastrichtCriteria = [
  { criterion: "Бюджетен дефицит (% от БВП)", threshold: "≤ 3,0%", bulgaria: "3,0% (КФП)", status: "ok" },
  { criterion: "Държавен дълг (% от БВП)", threshold: "≤ 60,0%", bulgaria: "31,3%", status: "ok" },
  { criterion: "Инфлация (ХИПЦ)", threshold: "≤ 1,5 пр.п. над средната", bulgaria: "3,5%", status: "warning" },
  { criterion: "Валутен курс", threshold: "ERM II ± 15%", bulgaria: "Фиксиран", status: "ok" }
];

const debtDynamics = [
  { year: "2026", debt: "37,6", percent: "31,3%", newDebt: "до 10,44 млрд. €", safe: "до 3,2 млрд. €", reserve: "2,4 млрд. €" },
  { year: "2027", debt: "43,5", percent: "34,2%", newDebt: "n/a", safe: "n/a", reserve: "n/a" },
  { year: "2028", debt: "49,0", percent: "36,6%", newDebt: "n/a", safe: "n/a", reserve: "n/a" }
];

const sectorComparison = [
  { sector: "Отбрана", bulgaria: "2,05%", eu: "~1,7%", diff: "+0,35 пр.п." },
  { sector: "Образование", bulgaria: "4,8%", eu: "~5,0%", diff: "-0,2 пр.п." },
  { sector: "Здравеопазване (публ.)", bulgaria: "~5,3%", eu: "~7,5%", diff: "-2,2 пр.п." },
  { sector: "Общо публ. разходи", bulgaria: "45,8%", eu: "~49%", diff: "-3,2 пр.п." }
];

const taxChanges = [
  { area: "Хазартен данък", november: "25%", december: "22%", effect: "По-нисък данък" },
  { area: "ЗКПО – R&D облекчение", november: "Няма", december: "25%", effect: "Стимул за иновации" },
  { area: "ЗКПО – данък при източника", november: "5%→10%", december: "без промяна", effect: "Запазва статуквото" },
  { area: "Заплати МВР/армия", november: "Автоматично", december: "до +10%", effect: "Ограничава разходи" },
  { area: "GPS контрол на превози", november: "Няма", december: "задължително", effect: "Нова фискална мярка" }
];

const abbreviations = [
  { abbr: "БВП", full: "Брутен вътрешен продукт" },
  { abbr: "ЗДБРБ", full: "Закон за държавния бюджет на Република България" },
  { abbr: "КФП", full: "Консолидирана фискална програма" },
  { abbr: "ДОО/НОИ", full: "Държавно обществено осигуряване / Национален осигурителен институт" },
  { abbr: "НЗОК", full: "Национална здравноосигурителна каса" },
  { abbr: "МОН", full: "Министерство на образованието и науката" },
  { abbr: "МРРБ", full: "Министерство на регионалното развитие и благоустройството" },
  { abbr: "МВР", full: "Министерство на вътрешните работи" },
  { abbr: "МО", full: "Министерство на отбраната" },
  { abbr: "ДАНС", full: "Държавна агенция \"Национална сигурност\"" },
  { abbr: "БАН", full: "Българска академия на науките" },
  { abbr: "ВУЗ", full: "Висши учебни заведения" },
  { abbr: "ЗКПО", full: "Закон за корпоративното подоходно облагане" },
  { abbr: "ЗДДФЛ", full: "Закон за данъците върху доходите на физическите лица" },
  { abbr: "R&D", full: "Научноизследователска и развойна дейност" },
  { abbr: "НПВУ", full: "Национален план за възстановяване и устойчивост" },
  { abbr: "SAFE", full: "Security Action for Europe (Механизъм за отбранителна индустрия)" },
  { abbr: "ХИПЦ", full: "Хармонизиран индекс на потребителските цени" }
];

const glossary = [
  { term: "Бюджетно салдо", def: "Разлика между приходи и разходи; отрицателно = дефицит, положително = излишък" },
  { term: "Консолидирана фискална програма", def: "Обобщен бюджет, включващ държавен бюджет, общини, ДОО, НЗОК и др." },
  { term: "Делегирани дейности", def: "Дейности, финансирани от държавата, но изпълнявани от общините (напр. образование)" },
  { term: "Изравнителна субсидия", def: "Трансфер към общини с по-ниски данъчни приходи за изравняване" },
  { term: "Капиталови разходи", def: "Разходи за придобиване на дълготрайни активи (сгради, машини, инфраструктура)" },
  { term: "Текущи разходи", def: "Разходи за издръжка (заплати, материали, услуги)" },
  { term: "Фискален резерв", def: "Буфер от ликвидни средства за непредвидени нужди" },
  { term: "Дерогация", def: "Временно изключение от правило (напр. надхвърляне на лимит за отбрана)" },
  { term: "Маастрихтски критерии", def: "Изисквания за членство в еврозоната: дефицит ≤3%, дълг ≤60% от БВП" }
];

// Municipality data - summarized by region
const municipalityRegions = [
  { region: "БЛАГОЕВГРАД", count: 14, november: "259 534,6", december: "257 941,6", change: "-1 593,0", percent: "-0.61%" },
  { region: "БУРГАС", count: 13, november: "310 639,9", december: "308 662,0", change: "-1 977,9", percent: "-0.64%" },
  { region: "ВАРНА", count: 12, november: "308 787,2", december: "306 837,5", change: "-1 949,7", percent: "-0.63%" },
  { region: "ВЕЛИКО ТЪРНОВО", count: 10, november: "183 142,9", december: "182 155,9", change: "-987,0", percent: "-0.54%" },
  { region: "ВИДИН", count: 11, november: "79 808,4", december: "79 339,5", change: "-468,9", percent: "-0.59%" },
  { region: "ВРАЦА", count: 10, november: "144 754,5", december: "143 885,0", change: "-869,5", percent: "-0.60%" },
  { region: "ГАБРОВО", count: 4, november: "85 741,5", december: "85 389,5", change: "-352,0", percent: "-0.41%" },
  { region: "ДОБРИЧ", count: 8, november: "126 188,6", december: "125 443,1", change: "-745,5", percent: "-0.59%" },
  { region: "КЪРДЖАЛИ", count: 7, november: "129 682,6", december: "128 898,5", change: "-784,1", percent: "-0.60%" },
  { region: "КЮСТЕНДИЛ", count: 9, november: "91 827,0", december: "91 296,6", change: "-530,4", percent: "-0.58%" },
  { region: "ЛОВЕЧ", count: 8, november: "106 683,0", december: "106 089,8", change: "-593,2", percent: "-0.56%" },
  { region: "МОНТАНА", count: 11, november: "109 393,6", december: "108 753,6", change: "-640,0", percent: "-0.59%" },
  { region: "ПАЗАРДЖИК", count: 12, november: "186 510,5", december: "185 386,0", change: "-1 124,5", percent: "-0.60%" },
  { region: "ПЕРНИК", count: 6, november: "89 455,8", december: "88 967,0", change: "-488,8", percent: "-0.55%" },
  { region: "ПЛЕВЕН", count: 11, november: "168 972,7", december: "167 981,8", change: "-990,9", percent: "-0.59%" },
  { region: "ПЛОВДИВ", count: 16, november: "419 788,0", december: "417 245,1", change: "-2 542,9", percent: "-0.61%" },
  { region: "РАЗГРАД", count: 7, november: "99 252,1", december: "98 665,2", change: "-586,9", percent: "-0.59%" },
  { region: "РУСЕ", count: 8, november: "136 243,0", december: "135 454,3", change: "-788,7", percent: "-0.58%" },
  { region: "СИЛИСТРА", count: 7, november: "96 424,4", december: "95 886,4", change: "-538,0", percent: "-0.56%" },
  { region: "СЛИВЕН", count: 4, november: "139 426,6", december: "138 646,7", change: "-779,9", percent: "-0.56%" },
  { region: "СМОЛЯН", count: 10, november: "95 802,0", december: "95 166,7", change: "-635,3", percent: "-0.66%" },
  { region: "СОФИЙСКА", count: 22, november: "197 699,3", december: "196 467,6", change: "-1 231,7", percent: "-0.62%" },
  { region: "СТОЛИЧНА ОБЩИНА", count: 1, november: "742 177,4", december: "738 017,7", change: "-4 159,7", percent: "-0.56%" },
  { region: "СТАРА ЗАГОРА", count: 11, november: "235 012,5", december: "233 685,8", change: "-1 326,7", percent: "-0.56%" },
  { region: "ТЪРГОВИЩЕ", count: 5, november: "87 238,2", december: "86 765,7", change: "-472,5", percent: "-0.54%" },
  { region: "ХАСКОВО", count: 11, november: "166 438,2", december: "165 428,5", change: "-1 009,7", percent: "-0.61%" },
  { region: "ШУМЕН", count: 10, november: "138 456,9", december: "137 631,6", change: "-825,3", percent: "-0.60%" },
  { region: "ЯМБОЛ", count: 4, november: "77 865,9", december: "77 426,6", change: "-439,3", percent: "-0.56%" }
];

// Utility functions for number formatting
function formatBulgarianNumber(value) {
  // Bulgarian format uses space as thousand separator and comma as decimal
  // The data already comes in Bulgarian format, but we ensure proper spacing
  if (typeof value !== 'string') return value;

  // If it's already formatted, clean it up for consistent spacing
  // Handle negative numbers with proper minus sign placement
  const cleaned = value.trim();

  // Check if it's a number-like string
  if (/^[+-]?[\d\s,\.]+[%]?$/.test(cleaned)) {
    return cleaned;
  }

  return value;
}

function getValueType(value) {
  // Determine if value is positive, negative, or neutral
  if (typeof value !== 'string') return 'neutral';

  const cleaned = value.trim();

  // Check for explicit positive/negative indicators
  if (cleaned.startsWith('+')) return 'positive';
  if (cleaned.startsWith('-')) return 'negative';

  // Check for zero values
  if (/^0[,.]?0*%?$/.test(cleaned) || cleaned === '0,0' || cleaned === '0,00%') {
    return 'neutral';
  }

  return 'neutral';
}

function isChangeColumn(header) {
  // Detect if this column contains change values
  const changeKeywords = ['Промяна', 'Change', 'промяна', 'Разлика', 'diff'];
  return changeKeywords.some(kw => header.toLowerCase().includes(kw.toLowerCase()));
}

function isPercentColumn(header) {
  // Detect if this column contains percentage values
  return header.includes('%') || header.toLowerCase().includes('percent');
}

// Arrow indicators for changes
function ChangeIndicator({ value, showArrow = true }) {
  const type = getValueType(value);

  if (type === 'neutral') {
    return <span className="value-neutral">{value}</span>;
  }

  const isPositive = type === 'positive';
  const colorClass = isPositive ? 'value-positive' : 'value-negative';

  return (
    <span className={`change-indicator ${colorClass}`}>
      {showArrow && (
        <span className="inline-block w-4" aria-hidden="true">
          {isPositive ? '\u25B2' : '\u25BC'}
        </span>
      )}
      <span>{value}</span>
    </span>
  );
}

// Percent badge component
function PercentBadge({ value }) {
  const type = getValueType(value);

  let badgeClass = 'percent-badge-neutral';
  if (type === 'positive') badgeClass = 'percent-badge-positive';
  if (type === 'negative') badgeClass = 'percent-badge-negative';

  return (
    <span className={`percent-badge ${badgeClass}`}>
      {value}
    </span>
  );
}

// Components
function DataTable({ headers, data, className = "" }) {
  // Identify which columns are change or percent columns
  const changeColumnIndices = headers.map((h, i) => ({ index: i, isChange: isChangeColumn(h), isPercent: isPercentColumn(h) }));

  return (
    <div className={`table-modern-container ${className}`}>
      <table className="table-modern">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            // Get row classes based on row properties
            const rowClasses = [
              row.isTotal ? 'row-total' : '',
              row.highlight ? 'row-highlight' : '',
              row.indent ? 'row-indent' : ''
            ].filter(Boolean).join(' ');

            // Get the values to display (filter out metadata properties)
            const displayKeys = Object.keys(row).filter(k =>
              !['isTotal', 'highlight', 'indent', 'type', 'note'].includes(k)
            );

            return (
              <tr key={rowIndex} className={rowClasses}>
                {displayKeys.map((key, colIndex) => {
                  const value = row[key];
                  const columnInfo = changeColumnIndices[colIndex];
                  const isChangeCol = columnInfo?.isChange;
                  const isPercentCol = columnInfo?.isPercent;

                  // First column is always the label
                  if (colIndex === 0) {
                    return (
                      <td key={colIndex}>
                        {value}
                      </td>
                    );
                  }

                  // Percent columns get badges
                  if (isPercentCol) {
                    return (
                      <td key={colIndex} className="cell-number">
                        <PercentBadge value={value} />
                      </td>
                    );
                  }

                  // Change columns get colored indicators
                  if (isChangeCol) {
                    return (
                      <td key={colIndex} className="cell-number">
                        <ChangeIndicator value={value} showArrow={true} />
                      </td>
                    );
                  }

                  // Regular numeric columns
                  return (
                    <td key={colIndex} className="cell-number">
                      {formatBulgarianNumber(value)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="mb-12 scroll-mt-20">
      <h2 className="text-xl font-bold text-slate-900 font-display mb-4 pb-2 border-b-2 border-primary-500">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SubSection({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-slate-800 font-display mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Comment({ children }) {
  return (
    <div className="mt-4 p-4 bg-primary-50 border-l-4 border-primary-500 rounded-r-xl text-sm text-primary-900">
      <strong className="text-primary-700">Коментар:</strong> {children}
    </div>
  );
}

function KeyFinding({ type, title, children }) {
  const styles = {
    warning: 'bg-warning-50 border-warning-500 text-warning-900',
    info: 'bg-primary-50 border-primary-500 text-primary-900',
    success: 'bg-accent-50 border-accent-500 text-accent-900'
  };
  return (
    <div className={`p-4 border-l-4 rounded-r-xl ${styles[type] || styles.info}`}>
      <div className="font-semibold">{title}</div>
      <div className="text-sm mt-1 opacity-90">{children}</div>
    </div>
  );
}

function TableOfContents({ activeSection, onNavigate }) {
  const sections = [
    { id: "intro", label: "Увод" },
    { id: "main", label: "I. Основни показатели" },
    { id: "tax", label: "II. Данъчни приходи" },
    { id: "exp", label: "III. Разходи" },
    { id: "transfers", label: "IV. Трансфери" },
    { id: "deficit", label: "V. Дефицит и макро" },
    { id: "ministries", label: "VI. Ведомства" },
    { id: "universities", label: "VII. ВУЗ и БАН" },
    { id: "conclusions", label: "VIII. Изводи" },
    { id: "macro", label: "X. Макроикономика" },
    { id: "eu", label: "XI. ЕС изисквания" },
    { id: "sectors", label: "XII. Сектори" },
    { id: "taxlaw", label: "XIII. Данъчно законодателство" },
    { id: "municipalities", label: "XIV. Общини" },
    { id: "appendix", label: "Приложения" }
  ];

  return (
    <nav className="hidden lg:block w-56 flex-shrink-0">
      <div className="sticky top-20 card p-4 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Съдържание</h3>
        <ul className="space-y-1">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => { e.preventDefault(); onNavigate(s.id); }}
                className={`block px-3 py-2 text-xs rounded-lg transition-all duration-200 ${
                  activeSection === s.id
                    ? 'bg-primary-100 text-primary-700 font-medium'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default function FullAnalysis() {
  const [activeSection, setActiveSection] = useState('intro');

  const handleNavigate = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex gap-8">
      <TableOfContents activeSection={activeSection} onNavigate={handleNavigate} />

      <div className="flex-1 max-w-4xl animate-fade-in">
        {/* Header */}
        <div className="text-center mb-10 pb-8 border-b border-slate-200">
          <h1 className="text-3xl font-bold text-slate-900 font-display">СРАВНИТЕЛЕН АНАЛИЗ</h1>
          <p className="text-lg text-slate-700 mt-3">
            Проект на Закон за държавния бюджет на Република България за 2026 г.
          </p>
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className="badge badge-info">Ноември 2025</span>
            <span className="text-slate-400">vs</span>
            <span className="badge badge-success">Декември 2025</span>
          </div>
          <p className="text-xs text-slate-400 mt-4 italic">
            Всички стойности са в хиляди евро (хил. €). Маркирани са значителни промени (над 5% или над 50 000 хил. евро).
          </p>
        </div>

        {/* УВОД */}
        <Section id="intro" title="УВОД">
          <div className="prose prose-slate max-w-none mb-6 text-slate-600 leading-relaxed">
            <p className="mb-4">
              Настоящият анализ разглежда проекта на Закон за държавния бюджет на Република България за 2026 г. —
              първият бюджет на страната, изцяло деноминиран в евро след планираното присъединяване към еврозоната на 1 януари 2026 г.
            </p>
            <p>
              Анализът съпоставя две версии на законопроекта: първоначалната от 2 ноември 2025 г., която беше оттеглена
              след протести и критики от страна на бизнеса и синдикатите, и преработената версия от 5 декември 2025 г.,
              съгласувана с работодателски организации и синдикати в рамките на тристранния диалог.
            </p>
          </div>

          <SubSection title="Обхват на анализа">
            <ul className="space-y-2 text-slate-600">
              {[
                "Сравнение на приходната и разходната част между двете версии",
                "Детайлен преглед по министерства и ведомства",
                "Трансфери към висши учебни заведения и общини",
                "Макроикономически предпоставки и съответствие с ЕС изисквания",
                "Секторен анализ (отбрана, образование, здравеопазване)",
                "Промени в данъчното и осигурителното законодателство"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </SubSection>

          <SubSection title="Ключови констатации">
            <div className="space-y-3">
              <KeyFinding type="warning" title="Дефицитът се увеличава">
                от 3 859 млн. € (ноември) на 4 575 млн. € (декември), което е ръст от 18,5%.
              </KeyFinding>
              <KeyFinding type="info" title="Данъчни отстъпки">
                Отпада увеличението на данъка върху дивидентите (остава 5%), въвежда се 25% данъчно облекчение за R&D разходи.
              </KeyFinding>
              <KeyFinding type="info" title="Осигурителна тежест">
                Запазва се увеличението на осигурителната вноска с 2 пр.п. от 01.01.2026 г.
              </KeyFinding>
              <KeyFinding type="info" title="Публични заплати">
                Замразяване на базата за силовите ведомства с възможност за до 10% увеличение.
              </KeyFinding>
              <KeyFinding type="warning" title="Маастрихтски критерии">
                Дефицитът от 3% от БВП е на границата на допустимото; очаква се влошаване до 4,3% през 2027 г. поради отбранителни разходи.
              </KeyFinding>
            </div>
          </SubSection>

          <div className="mt-6 p-4 bg-slate-100 rounded-xl text-sm text-slate-600 italic">
            <strong className="text-slate-700">Бележка:</strong> Анализът е фактологичен и не съдържа политически оценки.
            Бюджетите на ДОО (НОИ) и НЗОК се приемат с отделни закони и не са предмет на настоящия документ,
            макар да са отразени в консолидираните показатели.
          </div>
        </Section>

        {/* I. ОБОБЩЕНИЕ НА ОСНОВНИ ПОКАЗАТЕЛИ */}
        <Section id="main" title="I. ОБОБЩЕНИЕ НА ОСНОВНИ ПОКАЗАТЕЛИ">
          <DataTable
            headers={["Показател", "Ноември", "Декември", "Промяна (хил. €)", "Промяна (%)"]}
            data={mainIndicators}
          />
        </Section>

        {/* II. ДАНЪЧНИ ПРИХОДИ */}
        <Section id="tax" title="II. ДАНЪЧНИ ПРИХОДИ ПО ВИДОВЕ">
          <DataTable
            headers={["Показател", "Ноември", "Декември", "Промяна (хил. €)", "Промяна (%)"]}
            data={taxRevenues}
          />
          <Comment>
            Най-съществените намаления са при ДДС (-600 млн., -4,00%), корпоративен данък (-220 млн., -5,68%)
            и ДДФЛ (-183,5 млн., -3,73%). Единственото значително увеличение е при акцизите (+75 млн., +1,80%).
          </Comment>

          {/* Revenue Pie Chart */}
          <div className="mt-8 card p-6">
            <RevenuePieChart height={350} />
          </div>
        </Section>

        {/* III. РАЗХОДИ */}
        <Section id="exp" title="III. РАЗХОДИ ПО ВИДОВЕ">
          <DataTable
            headers={["Показател", "Ноември", "Декември", "Промяна (хил. €)", "Промяна (%)"]}
            data={expenditures}
          />
          <Comment>
            Капиталовите разходи са намалени значително (-481 млн. евро, -16,28%).
            Резервът за непредвидени разходи остава непроменен.
          </Comment>

          {/* Expenditure Pie Chart */}
          <div className="mt-8 card p-6">
            <ExpenditurePieChart height={350} />
          </div>
        </Section>

        {/* IV. ТРАНСФЕРИ */}
        <Section id="transfers" title="IV. ТРАНСФЕРИ КЪМ ОСНОВНИ ПОЛУЧАТЕЛИ">
          <DataTable
            headers={["Показател", "Ноември", "Декември", "Промяна (хил. €)", "Промяна (%)"]}
            data={transfers}
          />
          <Comment>
            Трансферът към ДОО се увеличава с над 500 млн. евро (+7,94%),
            докато този към НЗОК намалява с 260 млн. (-10,93%).
          </Comment>
        </Section>

        {/* V. ДЕФИЦИТ */}
        <Section id="deficit" title="V. БЮДЖЕТЕН ДЕФИЦИТ И МАКРОИКОНОМИЧЕСКИ ПОКАЗАТЕЛИ">
          <SubSection title="5.1. Прогнозен БВП за 2026 г.">
            <p className="text-sm text-slate-600 mb-4">
              Изчисление на БВП: От прогнозата на МФ за държавен дълг 2026 г. (37,6 млрд. евро = 31,3% от БВП) се извежда:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="card bg-primary-50 border-primary-100 p-4 text-center">
                <div className="text-2xl font-bold text-primary-700 font-display">≈ 120,1 млрд. €</div>
                <div className="text-sm text-slate-600">Прогнозен БВП 2026</div>
              </div>
              <div className="card bg-slate-50 p-4 text-center">
                <div className="text-2xl font-bold text-slate-700 font-display">37,6 млрд. €</div>
                <div className="text-sm text-slate-600">Държавен дълг 2026</div>
              </div>
              <div className="card bg-accent-50 border-accent-100 p-4 text-center">
                <div className="text-2xl font-bold text-accent-700 font-display">31,3%</div>
                <div className="text-sm text-slate-600">Дълг като % от БВП</div>
              </div>
            </div>
          </SubSection>

          <SubSection title="5.2. Дефицит като процент от БВП">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="card bg-warning-50 border-warning-100 p-4 text-center">
                <div className="text-sm text-slate-600">Ноември</div>
                <div className="text-2xl font-bold text-warning-700 font-display">3,21%</div>
                <div className="text-sm text-slate-500">3,86 млрд. €</div>
              </div>
              <div className="card bg-danger-50 border-danger-100 p-4 text-center">
                <div className="text-sm text-slate-600">Декември</div>
                <div className="text-2xl font-bold text-danger-700 font-display">3,81%</div>
                <div className="text-sm text-slate-500">4,58 млрд. € (+18,70%)</div>
              </div>
            </div>
          </SubSection>

          <SubSection title="5.3. Сравнение с целевия дефицит по КФП">
            <div className="table-modern-container">
              <table className="table-modern">
                <thead>
                  <tr>
                    <th>Показател</th>
                    <th>Цел (КФП)</th>
                    <th>ДБ Ноември</th>
                    <th>ДБ Декември</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Дефицит (% от БВП)</td>
                    <td className="cell-number">
                      <span className="percent-badge percent-badge-positive">3,00%</span>
                    </td>
                    <td className="cell-number">
                      <span className="percent-badge percent-badge-warning">3,21%</span>
                    </td>
                    <td className="cell-number">
                      <span className="percent-badge percent-badge-negative">3,81%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Отклонение от целта</td>
                    <td className="cell-number value-neutral">---</td>
                    <td className="cell-number">
                      <ChangeIndicator value="+0,21 пр.п." showArrow={false} />
                    </td>
                    <td className="cell-number">
                      <ChangeIndicator value="+0,81 пр.п." showArrow={false} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-slate-600 italic">
              <strong className="text-slate-700">Забележка:</strong> Държавният бюджет е само част от Консолидираната фискална програма (КФП).
              Целта от 3,0% от БВП се отнася за КФП като цяло, която включва и други бюджети (общини, ДОО, НЗОК и др.).
            </p>
          </SubSection>

          {/* Deficit Line Chart */}
          <div className="mt-8 card p-6">
            <DeficitLineChart height={350} />
          </div>
        </Section>

        {/* VI. ВЕДОМСТВА */}
        <Section id="ministries" title="VI. ДЕТАЙЛЕН АНАЛИЗ ПО ВЕДОМСТВА">
          <div className="space-y-3">
            {ministries.map((m, i) => (
              <div key={i} className={`card p-4 ${m.type === 'increase' ? 'bg-accent-50 border-accent-200' : 'bg-danger-50 border-danger-200'}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{m.name}</h4>
                    <p className="text-sm text-slate-600 mt-1">{m.note}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className={`text-lg font-bold font-display tabular-nums ${m.type === 'increase' ? 'text-accent-700' : 'text-danger-700'}`}>
                      {m.change} хил. €
                    </div>
                    <span className={`badge ${m.type === 'increase' ? 'badge-success' : 'badge-danger'}`}>
                      {m.percent}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ministry Changes Bar Chart */}
          <div className="mt-8 card p-6">
            <MinistryChangesBarChart height={350} />
          </div>
        </Section>

        {/* VII. ВУЗ И БАН */}
        <Section id="universities" title="VII. ТРАНСФЕРИ ЗА ВИСШЕ ОБРАЗОВАНИЕ И БАН">
          <DataTable
            headers={["Показател", "Ноември", "Декември", "Промяна (хил. €)", "Промяна (%)"]}
            data={universities}
          />
        </Section>

        {/* VIII. ИЗВОДИ */}
        <Section id="conclusions" title="VIII. КЛЮЧОВИ ИЗВОДИ">
          <ul className="space-y-3">
            {[
              "Персоналът се увеличава при повечето ведомства — общо с около +66 млн. евро (+3-12% в зависимост от ведомството).",
              "Капиталовите разходи се съкращават с общо ~174 млн. евро, като основният дял е при МРРБ (-159 млн., -21,39%).",
              "Нова програма за лекари специализанти — 30 млн. евро, добавена в декемврийската версия.",
              "Висшето образование е защитено — въпреки съкращения в МОН, трансферите за ВУЗ и БАН нарастват с +17,2 млн. евро.",
              "Социалните плащания са замразени — обезщетенията за домакинства остават непроменени (2,1 млрд. евро).",
              "Дефицитът се задълбочава от 3,21% на 3,81% от БВП (+0,60 пр.п.), надхвърляйки целта от 3,0% по КФП."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 card bg-slate-50/50 p-4">
                <span className="w-7 h-7 bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-lg flex items-center justify-center text-sm font-medium flex-shrink-0 shadow-sm">
                  {i + 1}
                </span>
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* X. МАКРОИКОНОМИКА */}
        <Section id="macro" title="X. МАКРОИКОНОМИЧЕСКИ ПРЕДПОСТАВКИ">
          <p className="text-slate-600 mb-6">
            Бюджет 2026 е изготвен на база средносрочната макроикономическа прогноза на Министерството на финансите (есен 2025),
            потвърдена от Фискалния съвет.
          </p>

          <SubSection title="10.1. Въвеждане на еврото">
            <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white rounded-2xl p-6 mb-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <p className="text-center text-lg mb-5 relative">От 1 януари 2026 г. България приема еврото като официална валута.</p>
              <div className="grid md:grid-cols-3 gap-4 text-center relative">
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <div className="text-2xl font-bold font-display">1.95583</div>
                  <div className="text-primary-200 text-sm">BGN за 1 EUR</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <div className="text-2xl font-bold font-display">100%</div>
                  <div className="text-primary-200 text-sm">Бюджет в евро</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <div className="text-2xl font-bold font-display">ERM II</div>
                  <div className="text-primary-200 text-sm">→ Еврозонов режим</div>
                </div>
              </div>
            </div>
          </SubSection>

          <SubSection title="10.2. Ключови макроикономически показатели">
            <DataTable
              headers={["Показател", "2026", "2027", "2028"]}
              data={macroIndicators.map(m => ({ indicator: m.indicator, y2026: m.y2026, y2027: m.y2027, y2028: m.y2028 }))}
            />
            <p className="mt-3 text-xs text-slate-400">
              Източник: Министерство на финансите, Средносрочна бюджетна прогноза 2026-2028, декември 2025
            </p>
          </SubSection>

          {/* Macro Indicators Bar Chart */}
          <div className="mt-8 card p-6">
            <MacroIndicatorsBarChart height={300} />
          </div>
        </Section>

        {/* XI. ЕС ИЗИСКВАНИЯ */}
        <Section id="eu" title="XI. СЪОТВЕТСТВИЕ С ИЗИСКВАНИЯТА НА ЕС">
          <SubSection title="11.1. Маастрихтски критерии">
            <div className="space-y-3 mb-4">
              {maastrichtCriteria.map((c, i) => (
                <div key={i} className={`card p-4 flex justify-between items-center ${
                  c.status === 'ok' ? 'bg-accent-50 border-accent-200' : 'bg-warning-50 border-warning-200'
                }`}>
                  <div>
                    <div className="font-semibold text-slate-900">{c.criterion}</div>
                    <div className="text-sm text-slate-500">Праг: {c.threshold}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold font-display ${c.status === 'ok' ? 'text-accent-700' : 'text-warning-700'}`}>
                      {c.bulgaria}
                    </div>
                    <span className={`badge ${c.status === 'ok' ? 'badge-success' : 'badge-warning'}`}>
                      {c.status === 'ok' ? 'Изпълнен' : 'Внимание'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-600 italic">
              <strong className="text-slate-700">Бележка:</strong> Инфлационният критерий е повишен, но е в рамките на допустимото за страна, приемаща еврото.
            </p>
          </SubSection>

          <SubSection title="11.2. Динамика на държавния дълг">
            <DataTable
              headers={["Показател", "2026", "2027", "2028"]}
              data={debtDynamics.map(d => ({
                indicator: "Държавен дълг",
                y2026: `${d.debt} млрд. € (${d.percent})`,
                y2027: `${d.debt} млрд. €`,
                y2028: d.debt + " млрд. €"
              }))}
            />
            <p className="mt-3 text-xs text-slate-400">
              SAFE: Security Action for Europe — механизъм на ЕС за укрепване на европейската отбранителна индустрия.
            </p>
          </SubSection>

          <SubSection title="11.3. Съответствие с препоръките на ЕК">
            <ul className="space-y-2 text-slate-600 text-sm mb-4">
              {[
                "Фискална консолидация — поддържане на дефицита в рамките на 3%",
                "Подобряване на събираемостта на данъците (ДДС, акцизи)",
                "Изпълнение на Националния план за възстановяване и устойчивост (НПВУ)",
                "Увеличаване на разходите за отбрана съгласно НАТО ангажименти",
                "Дерогация за отбранителни разходи — позволява временно надхвърляне на лимити"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="p-4 bg-warning-50 border border-warning-200 rounded-xl">
              <h4 className="font-semibold text-warning-900 mb-2">Прогноза на ЕК (ноември 2025)</h4>
              <p className="text-sm text-warning-800">
                Дефицитът за 2026 г. ще бъде 2,7% от БВП (по-добър от националния план),
                но се очаква влошаване до 4,3% през 2027 г. поради доставки на отбранително оборудване на стойност 1,2% от БВП.
              </p>
            </div>
          </SubSection>

          {/* Maastricht Criteria Visualization */}
          <div className="mt-8 card p-6">
            <MaastrichtCriteriaVisualization />
          </div>

          {/* Debt Bar Chart */}
          <div className="mt-8 card p-6">
            <DebtBarChart height={300} />
          </div>
        </Section>

        {/* XII. СЕКТОРИ */}
        <Section id="sectors" title="XII. СЕКТОРЕН АНАЛИЗ">
          <p className="text-slate-600 mb-6">
            Разходи по ключови сектори като дял от прогнозния БВП (~120,1 млрд. €):
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="card bg-accent-50 border-accent-200 p-5 text-center">
              <div className="text-3xl font-bold text-accent-700 font-display">2.05%</div>
              <div className="font-semibold mt-2 text-slate-900">Отбрана</div>
              <div className="text-sm text-slate-500">~4 446 млн. €</div>
              <span className="badge badge-success mt-2">НАТО цел: 2.0%</span>
            </div>
            <div className="card bg-warning-50 border-warning-200 p-5 text-center">
              <div className="text-3xl font-bold text-warning-700 font-display">4.8%</div>
              <div className="font-semibold mt-2 text-slate-900">Образование</div>
              <div className="text-sm text-slate-500">5 813 млн. €</div>
              <span className="badge badge-warning mt-2">ЕС средно: 5.0%</span>
            </div>
            <div className="card bg-danger-50 border-danger-200 p-5 text-center">
              <div className="text-3xl font-bold text-danger-700 font-display">5.3%</div>
              <div className="font-semibold mt-2 text-slate-900">Здравеопазване</div>
              <div className="text-sm text-slate-500">~6 344 млн. €</div>
              <span className="badge badge-danger mt-2">ЕС средно: 7.5%</span>
            </div>
          </div>

          <SubSection title="12.4. Сравнителна таблица по сектори">
            <DataTable
              headers={["Сектор", "България 2026", "Средно ЕС", "Разлика"]}
              data={sectorComparison}
            />
          </SubSection>

          {/* Sectors Comparison Bar Chart */}
          <div className="mt-8 card p-6">
            <SectorsComparisonBarChart height={350} />
          </div>
        </Section>

        {/* XIII. ДАНЪЧНО ЗАКОНОДАТЕЛСТВО */}
        <Section id="taxlaw" title="XIII. ПРОМЕНИ В ДАНЪЧНОТО И ОСИГУРИТЕЛНО ЗАКОНОДАТЕЛСТВО">
          <SubSection title="13.8. Обобщение на ключовите разлики">
            <DataTable
              headers={["Област", "Ноември → Декември", "Ефект"]}
              data={taxChanges.map(t => ({ area: t.area, change: `${t.november} → ${t.december}`, effect: t.effect }))}
            />
          </SubSection>

          <div className="mt-6 p-4 bg-slate-100 rounded-xl text-sm text-slate-600">
            <strong className="text-slate-700">Забележка:</strong> Основните данъчни ставки (ДДС 20%, корпоративен данък 10%, плосък данък 10%)
            не се променят и в двете версии. Осигурителните вноски също остават непроменени в рамките на ЗДБРБ.
          </div>
        </Section>

        {/* XIV. ОБЩИНИ */}
        <Section id="municipalities" title="XIV. ТРАНСФЕРИ КЪМ ОБЩИНИ">
          <p className="text-slate-600 mb-4">
            Сравнение на проектобюджет 2026: Ноември vs Декември 2025. Основни бюджетни взаимоотношения по области (хил. евро).
          </p>
          <p className="text-sm text-slate-500 mb-6 italic">
            Промените засягат само Общата субсидия за делегирани от държавата дейности.
            Останалите компоненти (изравнителна субсидия, капиталови разходи, зимно поддържане) остават непроменени.
          </p>

          <DataTable
            headers={["Област", "Общини", "Ноември (хил. €)", "Декември (хил. €)", "Промяна (%)"]}
            data={municipalityRegions.map(r => ({
              region: r.region,
              count: r.count,
              november: r.november,
              december: r.december,
              percent: r.percent
            }))}
          />

          <div className="mt-6 card bg-primary-50 border-primary-200 p-5">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-700 font-display">262 общини</div>
              <div className="text-sm text-slate-600 mt-2">Общо намаление: -29 434,4 хил. € (-0,59%)</div>
            </div>
          </div>
        </Section>

        {/* ПРИЛОЖЕНИЯ */}
        <Section id="appendix" title="ПРИЛОЖЕНИЯ">
          <SubSection title="А. Методологични бележки">
            <ul className="space-y-2 text-slate-600 text-sm">
              {[
                { label: "Валута", text: "Всички стойности са в хил. евро (хил. €), освен ако не е посочено друго." },
                { label: "Конверсия", text: "Фиксиран курс 1 EUR = 1,95583 BGN съгласно Закона за въвеждане на еврото." },
                { label: "Сравнение", text: "Ноемврийска версия (02.11.2025) vs. Декемврийска версия (05.12.2025)." },
                { label: "Значителна промяна", text: "Над ±5% или над ±50 000 хил. €." },
                { label: "БВП", text: "Прогнозен номинален БВП за 2026 г. ~120,1 млрд. € (≈234,9 млрд. лв.)." }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                  <span><strong className="text-slate-700">{item.label}:</strong> {item.text}</span>
                </li>
              ))}
            </ul>
          </SubSection>

          <SubSection title="Б. Списък на съкращенията">
            <div className="grid md:grid-cols-2 gap-2">
              {abbreviations.map((a, i) => (
                <div key={i} className="text-sm p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="font-mono font-bold text-primary-600">{a.abbr}</span>
                  <span className="text-slate-600"> — {a.full}</span>
                </div>
              ))}
            </div>
          </SubSection>

          <SubSection title="В. Източници на данни">
            <ul className="space-y-2 text-slate-600 text-sm">
              {[
                "Проект на ЗДБРБ 2026 — версия от 02.11.2025 (оттеглена)",
                "Проект на ЗДБРБ 2026 — версия от 05.12.2025 (актуална)",
                "Актуализирана средносрочна бюджетна прогноза 2026-2028, МФ",
                "Есенна макроикономическа прогноза на ЕК (ноември 2025)",
                "OECD Economic Outlook — Bulgaria (юни 2025)",
                "Закон за въвеждане на еврото в Република България"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </SubSection>

          <SubSection title="Г. Глосар на бюджетни термини">
            <div className="space-y-2">
              {glossary.map((g, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <span className="font-semibold text-slate-900">{g.term}:</span>
                  <span className="text-slate-600 text-sm"> {g.def}</span>
                </div>
              ))}
            </div>
          </SubSection>
        </Section>

        {/* Footer */}
        <div className="text-center py-10 border-t border-slate-200 mt-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-3">
            КРАЙ НА ДОКУМЕНТА
          </div>
          <p className="text-sm text-slate-400">Дата на анализа: 08.12.2025</p>
        </div>
      </div>
    </div>
  );
}
