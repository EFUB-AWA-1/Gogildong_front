import type { SummaryLine } from '@/ReportView/types/reportSummary';

export type RestroomSummaryRaw = {
  entranceDoorWidth?: number;
  entranceDoorHeight?: number;
  innerDoorWidth?: number;
  innerDoorHeight?: number;
  toiletHeight?: number;
};

export type ElevatorSummaryRaw = {
  doorWidth?: number;
  innerDepth?: number;
  buttonHeight?: number;
};

export type ClassroomSummaryRaw = {
  maxDoorWidth?: number;
  handleHeight?: number;
  passableWidth?: number;
};

export function makeRestroomLines(raw: RestroomSummaryRaw): SummaryLine[] {
  return [
    {
      kind: 'size',
      label: '화장실 출입문',
      width: raw.entranceDoorWidth ?? null,
      height: raw.entranceDoorHeight ?? null,
      unit: 'cm'
    },
    {
      kind: 'size',
      label: '내부 문',
      width: raw.innerDoorWidth ?? null,
      height: raw.innerDoorHeight ?? null,
      unit: 'cm'
    },
    {
      kind: 'value',
      label: '변기 높이',
      value: raw.toiletHeight ?? null,
      unit: 'cm'
    }
  ];
}

export function makeElevatorLines(raw: ElevatorSummaryRaw): SummaryLine[] {
  return [
    {
      kind: 'value',
      label: '엘리베이터 문 폭',
      value: raw.doorWidth ?? null,
      unit: 'cm'
    },
    {
      kind: 'value',
      label: '엘리베이터 내부 깊이',
      value: raw.innerDepth ?? null,
      unit: 'cm'
    },
    {
      kind: 'value',
      label: '버튼 높이',
      value: raw.buttonHeight ?? null,
      unit: 'cm'
    }
  ];
}

export function makeClassroomLines(raw: ClassroomSummaryRaw): SummaryLine[] {
  return [
    {
      kind: 'value',
      label: '문 최대 가로 길이',
      value: raw.maxDoorWidth ?? null,
      unit: 'cm'
    },
    {
      kind: 'value',
      label: '문 손잡이 높이',
      value: raw.handleHeight ?? null,
      unit: 'cm'
    },
    {
      kind: 'value',
      label: '지나다닐 수 있는 문 폭',
      value: raw.passableWidth ?? null,
      unit: 'cm'
    }
  ];
}
