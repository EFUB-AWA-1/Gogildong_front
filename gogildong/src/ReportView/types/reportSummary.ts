export const FACILITY_TYPES = [
  'restroom',
  'elevator',
  'classroom',
  'other'
] as const;

export type FacilityType = (typeof FACILITY_TYPES)[number];

// 한 줄(라인) 타입
export type SummaryLine =
  | {
      kind: 'size'; // "W x H cm"
      label: string;
      width: number | null;
      height: number | null;
      unit?: 'cm'; // 기본 cm
    }
  | {
      kind: 'value'; // "N cm"
      label: string;
      value: number | null;
      unit?: 'cm'; // 기본 cm
    };

export type ReportSummaryViewData =
  | { kind: 'lines'; lines: SummaryLine[] }
  | { kind: 'description'; description: string }
  | { kind: 'empty' };
