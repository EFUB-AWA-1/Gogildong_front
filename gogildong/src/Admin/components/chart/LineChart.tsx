import { Line } from 'react-chartjs-2';
import './chartConfig';

type Props = {
  labels: string[];
  values: number[];
  datasetLabel?: string;
};

export default function LineChart({
  labels,
  values,
  datasetLabel = ''
}: Props) {
  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: datasetLabel,
            data: values,
            borderColor: '#AAEB2F',
            borderWidth: 1.5,
            tension: 0,

            // 점 스타일
            pointRadius: 5,
            pointHoverRadius: 5,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#000000',
            pointBorderWidth: 3,
            pointHitRadius: 8,

            // 라인 아래 채우기 없애기
            fill: false
          }
        ]
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            intersect: false,
            displayColors: false,
            caretPadding: 10,
            cornerRadius: 6,
            mode: 'index',
            yAlign: 'bottom',

            callbacks: {
              label: (ctx) =>
                `${ctx.dataset.label} 건수:  ${ctx.formattedValue}`
            },
            titleFont: { family: 'Inter', size: 14, weight: 700 },
            bodyFont: { family: 'Inter', size: 14, weight: 400 },
            titleSpacing: 6,
            bodySpacing: 8,
            titleMarginBottom: 12,
            padding: 15
          }
        },

        interaction: {
          intersect: false,
          mode: 'index'
        },

        // 축
        scales: {
          x: {
            border: { display: false },
            ticks: {
              color: 'var(--black-100, #000)',
              align: 'center',
              font: {
                family: 'Inter',
                size: 18,
                weight: 400,
                style: 'normal'
              },
              callback: (__, index) => {
                const raw = labels[index]; // 원본 date
                return raw.slice(8); // 일만 표시
              }
            },
            grid: { display: true, color: 'rgba(170, 235, 47, 0.2)' }
          },
          y: {
            display: false,
            beginAtZero: true
          }
        }
      }}
    />
  );
}
