import type {
  FacilityType,
  ReportSummaryViewData
} from '@/ReportView/types/reportSummary';
import {
  makeRestroomLines,
  makeElevatorLines,
  makeClassroomLines
} from '@/ReportView/utils/reportSummaryTemplates';

const otherDescription =
  '학교 정문 앞 보도블럭이\n깨져 있어서 조심해야 할 것 같아요';

export function getReportSummaryMock(
  facilityType: FacilityType
): ReportSummaryViewData {
  switch (facilityType) {
    case 'restroom': {
      const raw = {
        entranceDoorWidth: 108,
        entranceDoorHeight: 120,
        innerDoorWidth: 108,
        innerDoorHeight: 120,
        toiletHeight: 50
      };
      return { kind: 'lines', lines: makeRestroomLines(raw) };
    }

    case 'elevator': {
      const raw = {
        doorWidth: 120,
        innerDepth: 120,
        buttonHeight: 50
      };
      return { kind: 'lines', lines: makeElevatorLines(raw) };
    }

    case 'classroom': {
      const raw = {
        maxDoorWidth: 120,
        handleHeight: 120,
        passableWidth: 50
      };
      return { kind: 'lines', lines: makeClassroomLines(raw) };
    }

    case 'other':
      return { kind: 'description', description: otherDescription };

    default:
      return { kind: 'empty' };
  }
}
