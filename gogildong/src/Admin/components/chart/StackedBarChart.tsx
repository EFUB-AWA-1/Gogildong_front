// StackedBarChart.tsx
import { Bar } from 'react-chartjs-2';
import './chartConfig';

type PlaceKey = 'CLASSROOM' | 'RESTROOM' | 'ELEVATOR' | 'ETC';

type PlaceStat = {
  current: number;
  previous: number;
  diff: number;
  rate: string;
};

type Summary = Record<PlaceKey, PlaceStat>;

export type MonthlyStatistics = {
  year: number;
  month: number; // 1~12
  placeSummary: Summary;
};

type MonthKey = { year: number; month: number };

type Props = {
  monthly: MonthlyStatistics[];
  selectedMonth: MonthKey; // ✅ 단수로
};

const PLACE_META: Record<PlaceKey, { label: string; color: string }> = {
  CLASSROOM: { label: '교실', color: '#7BD300' },
  RESTROOM: { label: '화장실', color: '#A6E800' },
  ELEVATOR: { label: '엘리베이터', color: '#CFF56A' },
  ETC: { label: '기타', color: '#EAF9C7' }
};

const PLACE_ORDER: PlaceKey[] = ['CLASSROOM', 'RESTROOM', 'ELEVATOR', 'ETC'];

const MONTH_EN = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

function pad2(n: number) {
  return String(n).padStart(2, '0');
}
function toKey({ year, month }: MonthKey) {
  return `${year}-${pad2(month)}`;
}
function emptySummary(): Summary {
  return {
    CLASSROOM: { current: 0, previous: 0, diff: 0, rate: '0%' },
    RESTROOM: { current: 0, previous: 0, diff: 0, rate: '0%' },
    ELEVATOR: { current: 0, previous: 0, diff: 0, rate: '0%' },
    ETC: { current: 0, previous: 0, diff: 0, rate: '0%' }
  };
}
function formatNumber(n: number) {
  return n.toLocaleString();
}
function formatMoM(diff: number, rate: string) {
  const sign = diff > 0 ? '+' : diff < 0 ? '' : '';
  const diffText = `${sign}${formatNumber(diff)}`;
  const rateText = rate && rate !== '-%' ? ` (${rate})` : '';
  return `${diffText}${rateText}`;
}

export default function StackedBarChart({ monthly, selectedMonth }: Props) {
  const map = new Map<string, Summary>();
  monthly.forEach((m) => {
    map.set(toKey({ year: m.year, month: m.month }), m.placeSummary);
  });

  const selectedKey = toKey(selectedMonth);
  const selectedSummary = map.get(selectedKey) ?? emptySummary();
  const monthLabel = MONTH_EN[selectedMonth.month - 1];

  const labels = PLACE_ORDER.map((p) => PLACE_META[p].label);

  return (
    <div className="flex w-full flex-col items-start gap-2">
      <div className="h-60 w-full">
        <Bar
          data={{
            labels,
            datasets: [
              {
                label: monthLabel,
                data: PLACE_ORDER.map((p) => selectedSummary[p].current),
                backgroundColor: '#AAEB2F',
                borderWidth: 0,
                borderRadius: 6,
                barPercentage: 0.65,
                categoryPercentage: 0.7
              }
            ]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
              legend: { display: false },
              tooltip: {
                enabled: true,
                intersect: false,
                displayColors: false,
                caretPadding: 10,
                cornerRadius: 6,
                mode: 'nearest',
                xAlign: 'left',
                callbacks: {
                  title: (items) => items[0]?.label ?? '',
                  label: (ctx) => {
                    const placeKey = PLACE_ORDER[ctx.dataIndex];
                    const current = selectedSummary[placeKey].current;
                    const diff = selectedSummary[placeKey].diff;
                    const rate = selectedSummary[placeKey].rate;

                    return `${monthLabel}  건수:  ${formatNumber(current)}   |   전월 대비 증감:  ${formatMoM(diff, rate)}`;
                  }
                },
                titleFont: { family: 'Inter', size: 14, weight: 700 },
                bodyFont: { family: 'Inter', size: 14, weight: 400 },
                titleMarginBottom: 12,
                padding: 14
              }
            },
            interaction: { intersect: false, mode: 'nearest' },
            scales: {
              x: {
                stacked: true,
                display: false,
                beginAtZero: true,
                grid: { display: false },
                border: { display: false }
              },
              y: {
                stacked: true,
                border: { display: false },
                ticks: {
                  color: 'var(--black-100, #000)',
                  font: { family: 'Inter', size: 16, weight: 600 }
                },
                grid: { display: false }
              }
            }
          }}
        />
      </div>
    </div>
  );
}
