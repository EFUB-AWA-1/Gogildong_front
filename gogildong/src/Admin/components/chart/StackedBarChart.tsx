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
  selectedMonths: MonthKey[];
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
  // diff: +/-
  const sign = diff > 0 ? '+' : diff < 0 ? '' : '';
  const diffText = `${sign}${formatNumber(diff)}`;
  // rate: "19%" or "-%" etc.
  const rateText = rate && rate !== '-%' ? ` (${rate})` : '';
  return `${diffText}${rateText}`;
}

/** ✅ 최대 1년치(12개) 색상 */
const MONTH_COLOR_POOL_12 = [
  '#AAEB2F', // 1
  '#7BD300', // 2
  '#A6E800', // 3
  '#CFF56A', // 4
  '#EAF9C7', // 5
  '#B7F14B', // 6
  '#D9FF8A', // 7
  '#6CC400', // 8
  '#9BEA2F', // 9
  '#E8FFD1', // 10
  '#84D800', // 11
  '#C7F75A' // 12
];

const stackedTotalLabelPlugin = {
  id: 'stackedTotalLabel',
  afterDatasetsDraw(chart: any) {
    const { ctx } = chart;
    const datasets = chart.data.datasets ?? [];
    if (!datasets.length) return;

    const lastDatasetIndex = datasets.length - 1;
    const meta = chart.getDatasetMeta(lastDatasetIndex);
    if (!meta?.data?.length) return;

    ctx.save();
    ctx.font = '700 14px Inter';
    ctx.fillStyle = '#000';
    ctx.textBaseline = 'middle';

    // 각 "장소" 막대(카테고리)별로 스택 합계를 계산해서 마지막 스택 끝에 표시
    meta.data.forEach((bar: any, dataIndex: number) => {
      const total = datasets.reduce((sum: number, ds: any) => {
        const v = Number(ds.data?.[dataIndex] ?? 0);
        return sum + (Number.isFinite(v) ? v : 0);
      }, 0);

      // 마지막 스택(bar)의 끝 좌표
      const x = bar.x;
      const y = bar.y;

      // 막대 끝에서 살짝 오른쪽으로
      ctx.fillText(total.toLocaleString(), x + 8, y);
    });

    ctx.restore();
  }
};

export default function StackedBarChart({ monthly, selectedMonths }: Props) {
  // 0) 선택 월 정렬
  const sortedSelected = [...selectedMonths].sort((a, b) =>
    toKey(a).localeCompare(toKey(b))
  );

  // 1) 월별 summary 맵
  const map = new Map<string, Summary>();
  monthly.forEach((m) => {
    map.set(toKey({ year: m.year, month: m.month }), m.placeSummary);
  });

  // 2) 선택월 summary 목록 (없으면 0으로)
  const selectedSummaries = sortedSelected.map((m) => ({
    key: toKey(m),
    label: MONTH_EN[m.month - 1],
    summary: map.get(toKey(m)) ?? emptySummary()
  }));

  // 3) 차트 labels = 장소
  const labels = PLACE_ORDER.map((p) => PLACE_META[p].label);

  return (
    <div className="flex w-full flex-col items-start gap-2">
      {/* 범례: 선택된 월 (월별 색) */}
      <div className="flex flex-wrap items-center gap-4">
        {selectedSummaries.map((m, idx) => (
          <div key={m.key} className="flex items-center gap-1">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: MONTH_COLOR_POOL_12[idx % 12]
              }}
            />
            <span className="text-xs font-medium text-black/70">{m.label}</span>
          </div>
        ))}
      </div>

      <div className="h-[12.5rem] w-full">
        <Bar
          plugins={[stackedTotalLabelPlugin]}
          data={{
            labels,
            datasets: selectedSummaries.map((m, idx) => ({
              label: m.label,
              data: PLACE_ORDER.map((p) => m.summary[p].current),
              backgroundColor: MONTH_COLOR_POOL_12[idx % 12],
              borderWidth: 0,
              borderRadius: 6,
              barPercentage: 0.65,
              categoryPercentage: 0.7
            }))
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,

            // 가로 막대
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
                  // tooltip title = 장소명
                  title: (items) => items[0]?.label ?? '',

                  //각 월 row: "Oct  건수: 10 | 증감: +2 (20%)"
                  label: (ctx) => {
                    const placeKey = PLACE_ORDER[ctx.dataIndex];
                    const monthLabel = String(ctx.dataset.label ?? '');
                    const s =
                      selectedSummaries[ctx.datasetIndex]?.summary ??
                      emptySummary();

                    const current = s[placeKey].current;
                    const diff = s[placeKey].diff;
                    const rate = s[placeKey].rate;

                    return `${monthLabel}  건수:  ${formatNumber(current)}   |   전월 대비 증감:  ${formatMoM(diff, rate)}`;
                  },
                  footer: (items) => {
                    const placeKey = PLACE_ORDER[items[0]?.dataIndex ?? 0];

                    const total = selectedSummaries.reduce((sum, m) => {
                      return sum + (m.summary[placeKey]?.current ?? 0);
                    }, 0);

                    return `선택 월 합계: ${total.toLocaleString()}`;
                  }
                },

                titleFont: { family: 'Inter', size: 14, weight: 700 },
                bodyFont: { family: 'Inter', size: 14, weight: 400 },
                titleMarginBottom: 15,
                footerMarginTop: 8,
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
